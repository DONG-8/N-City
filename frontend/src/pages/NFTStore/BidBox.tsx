import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';
import 'moment/locale/ko';
import { useMutation } from 'react-query';
import { getPastHistory, postAuctionConfirm, postCancelAuction, postCancelPurchase } from '../../store/apis/deal';
import { createSaleContract, SaleFactoryContract } from '../../web3Config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface IState {
  history: {
    dealCreatedAt: number[];
    dealFrom: number;
    dealFromNickName: string;
    dealPrice: number;
    dealTo: number;
    dealToNickName: string;
    dealType: number;
  };
}
interface Iprops{
  item :{
    favoriteCount: Number,
    productAuctionEndTime: string|null,
    productCode: Number,
    productDesc: string,
    productFileUrl: string,
    productId: Number,
    productPrice: Number,
    productRegDt: string,
    productState:Number,
    productThumbnailUrl: string,
    productTitle: string,
    productView: Boolean,
    productXCoordinate: Number,
    productYCoordinate: Number,
    tokenId:Number,
    userId:Number,
  },
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
// interface ITime {
//   time:{days:any,hours:any,minutes:any,seconds:any}
// }

const Wrapper = styled.div`
  .notsale {
    margin-left: 2vw;
    font-size: 20px;
    font-weight: 500;
  }
  .loading {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 160px;
      height: 160px;
      margin-left: 2vw;
    }
    p {
      font-size: 24px;
      font-weight: 500;
    }
  }
`

const ING = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  h3 {
    margin-left: 2vw;
    margin-bottom: 1vh;
    color: #6225e6;
  }
  .contentBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content{
      margin-left: 2vw;
      font-size: 18px;
    }
  }
  .boxleft {
    .sellprice {
      font-size: 24px;
    }
  }
  .boxcenter {
  }
  .boxright {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2vw;
    button {
      height: 6vh;
      width: 10vw;
      font-size: 24px;
    }
    .sellBtn {
      margin-left: 30px;
      height: 50px;
      font-size: 24px;
    }
  }
  .color {
    color: #6225e6;
  }
`;

const END = styled.div`
  h3 {
    margin-left: 2vw;
    color: #6225e6;
  }
  span {
    color: #6225e6;
  }
  .confirmbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 2vw;
  }
  .boxleft {
    .content {
      margin: 1vh 0 1vh 2vw;
    }
  }
  button {
      height: 6vh;
      width: 200px;
      font-size: 24px;
    }
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  button {
    font-family: "Noto Sans KR", sans-serif;
    /* position: absolute; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6225E6;
    color: #fff;
    font-weight: 500;
    font-size: 25px;
    padding: 10px 0;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      background-color: rgb(86, 43, 177);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }
  }
`;

const BidBox:React.FC<Iprops> = ({item,setOpen}) => {
  const moment = require('moment')
  const [RESTTIME,setRESTTIME] = useState({days:0,hours:0,minutes:0,seconds:0}) 
  // const [history, setHistory] = useState<IState["history"][]>([])
  const [lastBidder, setLastBidder] = useState("")
  const [lastBidderId, setLastBidderId] = useState(0)
  const [isBidderExist, setIsBidderExist] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate();
  const {ethereum} = window;

  const getHistory = useMutation<any>( // 추가 // 추천 데이터
  "getPastHistory",
  async () => {
    if (item.productId === -1) return ;
    return await getPastHistory(Number(item.productId));
  },
  {
    onSuccess: (res) => {
      if (res) {
        const bidArray = res.content.filter((item) => item.dealType === 3);
        if (bidArray.length > 0) {
          setLastBidder(bidArray[0].dealFromNickName);
          setLastBidderId(bidArray[0].dealFrom)
          setIsBidderExist(true)
        } else {
          setLastBidder("입찰자가 없습니다.");
          setIsBidderExist(false)
        }
      }
    },
    onError: (err: any) => {
    },
  }
);

  const confirmProduct = useMutation<any, Error>(
    "confirmProduct",
    async () => {
      return await postAuctionConfirm(Number(item.productId));
    },
    {
      onSuccess: (res) => {
        setIsloading(false);
        navigate(`/mypage/${sessionStorage.getItem("userId")}`);
      },
      onError: (err:any) => {
        setIsloading(false);
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  );

  const cancelAuction = useMutation<any, Error>(
    "cancelAuction",
    async () => {
      return await postCancelAuction(Number(item.productId));
    },
    {
      onSuccess: (res) => {
        setIsloading(false)
        window.location.reload()
      },
      onError: (err:any) => {
        setIsloading(false)
        
        if (err.response.status === 401) { 
          navigate("/login")
        }
      }
    }
  );

  const cancelSale = useMutation<any, Error>(
    "postCancelPurchase",
    async () => {
      if (!item.productId) return;
      return await postCancelPurchase(Number(item.productId));
    },
    {
      onSuccess: async (res) => {
        
        setIsloading(false)
        window.location.reload()
      },
      onError: (err: any) => {
        
        setIsloading(false)
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  );

  const onclickCancelSale = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (!accounts) {
        alert("지갑을 연결해주세요")
        return
      }
      setIsloading(true)
      // sale컨트랙트 주소 받아서 생성
      const saleContractAddress = await SaleFactoryContract.methods
      .getSaleContractAddress(item.tokenId)
      .call();

      const saleContract = await createSaleContract(saleContractAddress)

      // 판매 취소
      await saleContract.methods.cancelSales().send({ from: accounts[0] });
      cancelSale.mutate()
    } catch (error) {
      setIsloading(false)
    }
  };
  
  const onClickConfirm = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" })
      setIsloading(true)
      //salecontract address
      const saleContractAddress = await SaleFactoryContract.methods.getSaleContractAddress(item.tokenId).call()
      const saleContract = await createSaleContract(saleContractAddress)
      if (isBidderExist) {
        const response = await saleContract.methods.confirmItem().send({ from: accounts[0] });
        const temp = (response.events.SaleEnded.returnValues.winner);
        const temp2 = (response.events.SaleEnded.returnValues.amount);
        
        confirmProduct.mutate()
      } else {
        const response = await saleContract.methods.cancelAuction().send({ from: accounts[0] });
        cancelAuction.mutate()  
      }
    } catch (error) {
    
      setIsloading(false)
    }
  }

  useEffect(()=>{
    const timer = setInterval(() => {
      const endtime = moment(item.productAuctionEndTime)
      setRESTTIME ({
        days:moment.duration(endtime.diff(moment())).days(),
        hours:moment.duration(endtime.diff(moment())).hours(),
        minutes:moment.duration(endtime.diff(moment())).minutes(),
        seconds:moment.duration(endtime.diff(moment())).seconds(),
      })
    },1000)
    return()=> clearInterval(timer)
  },[item])

  useEffect(() => {
    getHistory.mutate()
  }, [item])

  
  return (
    <Wrapper>
      {isLoading ? (
        <div className="loading">
          <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
          <p>진행중입니다...</p>
        </div>
      ) : (
        <>
          {item.productState === 1 &&
            moment(item.productAuctionEndTime).isBefore(moment()) && (
              <END>
                <h3>경매 종료</h3>
                <div className="confirmbox">
                  <div>
                    {isBidderExist ? (
                      <div className="boxleft">
                        <div className="content">
                          최종 입찰가 : {item.productPrice}{" "}
                        </div>
                        <div className="content">
                          최종 입찰자 : <span>{lastBidder}</span>{" "}
                        </div>
                      </div>
                    ) : (
                      <div className="boxleft">
                        <div className="content">입찰자가 없습니다</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {
                      // 경매끝, 내가 최종구매자거나 경매등록한 사람이면 confirm버튼 보이기
                      sessionStorage.getItem("userId") &&
                        (Number(sessionStorage.getItem("userId")) ===
                          item.userId ||
                          Number(sessionStorage.getItem("userId")) ===
                            lastBidderId) && ( /// 나중에 담겨져오는 하이스트비더아이디로 바꾸기
                          <ButtonBox>
                            <Button onClick={onClickConfirm}>
                              {isBidderExist ? "Confirm" : "경매닫기"}
                            </Button>
                          </ButtonBox>
                        )
                    }
                  </div>
                </div>
              </END>
            )}
          {item.productState === 1 &&
            !moment(item.productAuctionEndTime).isBefore(moment()) && (
              <ING>
                <h3>경매 진행중</h3>
                <div className="contentBox">
                  <div className="boxleft">
                    <div className="content">
                      경매 종료 시간 :{" "}
                      {moment(item.productAuctionEndTime).calendar()}{" "}
                    </div>
                    <div className="content">
                      현재가 :{" "}
                      <span className="color">{item.productPrice}</span> nct{" "}
                    </div>
                  </div>
                  <div className="boxcenter">
                    {isBidderExist ? (
                      <div className="content">
                        현재 최종 입찰자 :
                        <span className="color"> {lastBidder}</span>{" "}
                      </div>
                    ) : (
                      <div className="content">현재 입찰자가 없습니다</div>
                    )}
                    <div className="content">
                      {RESTTIME.days}일 {RESTTIME.hours}시간 {RESTTIME.minutes}
                      분 {RESTTIME.seconds}초 남았습니다
                    </div>
                  </div>
                  <div className="boxright">
                    {Number(sessionStorage.getItem("userId")) !==
                      item.userId && (
                      <ButtonBox>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          입찰하기
                        </Button>
                      </ButtonBox>
                    )}
                  </div>
                </div>
              </ING>
            )}
          {item.productState === 2 && (
            <ING>
              <h3>판매 진행중</h3>
              <div className="contentBox">
                <div className="boxleft">
                  <div className="content sellprice">
                    현재가 : <span className="color">{item.productPrice}</span>{" "}
                    NCT{" "}
                  </div>
                </div>
                <div className="boxright">
                  {sessionStorage.getItem("userId") &&
                    (Number(sessionStorage.getItem("userId")) !==
                    item.userId ? (
                      <ButtonBox>
                        <Button
                          className="sellBtn"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setOpen(true);
                          }}
                        >
                          구매하기
                        </Button>
                      </ButtonBox>
                    ) : (
                      <ButtonBox>
                        <Button
                          className="sellBtn"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            onclickCancelSale();
                          }}
                        >
                          판매취소
                        </Button>
                      </ButtonBox>
                    ))}
                </div>
              </div>
            </ING>
          )}
          {item.productState === 3 && (
            <p className="notsale">작품이 판매중이 아닙니다.</p>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default BidBox