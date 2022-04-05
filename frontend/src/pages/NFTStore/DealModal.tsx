import { Button, Input, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from 'react-query';
import { getPastHistory, postAuctionBid, postPurchase } from '../../store/apis/deal';
import { createSaleContract, NFTcreatorContract, SaleFactoryContract, SSFTokenContract } from '../../web3Config';
import { Event } from '../Mypage/Mypage';
import SellIcon from "@mui/icons-material/Sell";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import IsLoading2 from './IsLoading2';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 800px;
  height: 560px;
  border-radius: 10px;
  .title {
    color: #35357a;
    text-align: center;
    font-size:5vh;
    width: 80%;
    border-bottom: 2px solid #35357a;
    margin: auto;
    margin-top: 2vh;
  }
`;
const Exit = styled.div`
  position: absolute;
  right:20px;
  top:20px;
  cursor: pointer;
`

const Title = styled.h1`
  margin: 40px 0 10px;
  font-size: 30px;
  text-align: center;
`;

const Divider = styled.hr`
  border: solid 1px #35357a;
  width: 65%;
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto 20px;
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
    width: 300px;
    height: 50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      background-color: rgb(86, 43, 177);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  .left {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    img {
      max-width: 90%;
      max-height: 90%;
    }
  }
  .right {
    width: 320px;
    height: 300px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }
`

const Content = styled.div`
  margin-top: 10px;
  font-weight: 500;
  .itemname {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .date {
    text-align: center;
  }
  .price{
    font-size: 18px;
    margin-left: 5px;
    span {
      color: #6225e6;
    }
  }
  .buttonbox {
    display: flex;
    justify-content: center;
    button {

    }
  }
  .desc {
    width: 300px;
    height: 120px;
    background-color: #f3f2f2;
    overflow-y: auto;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
  }
  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
    }
  }
  input {
    margin: 10px 10px 0 0;
    background-color: #edecec;
    height: 20px;
    border-radius: 10px;
    padding: 5px;
    outline: none;
    font-size: 15px;
    :focus {
      outline: none;
    }
  }
  #true{
    background-color: #def3bf;
  }
  #false{
    background-color: #f8ced5;
  }
`


interface Iprops{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  status:string,
  item:{
    productId: Number,
    userId: Number,
    productTitle: string,
    productDesc: string,
    productCode: Number,
    productXCoordinate: Number,
    productYCoordinate: Number,
    productView: Boolean,
    productState: Number,
    productPrice: Number,
    productRegDt: string,
    productFileUrl: string,
    productThumbnailUrl: string,
    favoriteCount: Number
  }, // 작가, 작가 정보, 거래 관련.. 
}

interface Istate {
  item: {
    productId: number;
    userId: number;
    tokenId: number;
    productTitle: string;
    productDesc: string;
    productCode: number;
    productXCoordinate: number;
    productYCoordinate: number;
    productView: boolean;
    productState: number;
    productPrice: number;
    productRegDt: string;
    productFileUrl: string;
    productThumbnailUrl: string;
    productAuctionEndTime: string;
    favoriteCount: number;
  };
  
}

const DealModal:React.FC<Iprops> = ({item,open,setOpen,status}) => {
  const handleClose = () => setOpen(false);
  const [localitem,setLocalitem] = useState<any>(item)
  const [priceValue,setPriceValue] = useState('')
  const [check,setCheck] = useState('')
  const [price,setPrice] = useState(Number(item.productPrice))
  const [afterBuy,setAfterBuy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {ethereum} = window


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(e.target.value);
    console.log(priceValue)
  }; // 인풋창 수정



  const postgetBid = useMutation<any, Error>(
    "postAuctionBid",
    async () => {
      return await postAuctionBid(Number(priceValue), Number(item.productId));
    },
    {
      onSuccess: (res) => {
        console.log("bid요청성공", res);
        setAfterBuy(true);
        setPrice(Number(priceValue));
        setPriceValue("")
        setIsLoading(false)
        navigate("/store")
      },
      onError: (err: any) => {
        setIsLoading(false)
        console.log(err, "경매 오류");
      },
    }
  );

  const postgetBuy = useMutation<any, Error>(
    "postPurchase",
    async () => {
      return await postPurchase(Number(item.productId));
    },
    {
      onSuccess: (res) => {
        setAfterBuy(true) // 나중에 위에서 처리 예정
        setIsLoading(false)
        console.log("buy요청성공", res);
        navigate("/mypage/" + sessionStorage.getItem("userId"))
      },
      onError: (err: any) => {
        setIsLoading(false)
        console.log("buy요청 실패", err);
      },
    }
  );

  const isOkay = ()=>{
    if(Number(priceValue)-price>=1){setCheck('true')} 
    else if (priceValue===''){setCheck('null')}
    else {setCheck('false')}
  }

  useEffect(()=>{
    setAfterBuy(false)
    isOkay()
  },[priceValue])

  const getBid = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (!accounts) {
        alert("지갑을 연결해주세요")
        return
      }

      // sale컨트랙트 주소 받아서 생성
      setIsLoading(true)
      const response = await SaleFactoryContract.methods
      .getSaleContractAddress(localitem.tokenId)
      .call();
      const saleContract = await createSaleContract(response)
      
      // sale컨트랙트로 erc20토큰 전송권한 허용
      await SSFTokenContract.methods
      .approve(response, Number(priceValue))
      .send({ from: accounts[0] });

      // bid 요청
      const response2 = await saleContract.methods.bid(Number(priceValue)).send({ from: accounts[0] });
      const bidder = (response2.events.HighestBidIncereased.returnValues.bidder);
      const amount = (response2.events.HighestBidIncereased.returnValues.amount);
      console.log("bidder", bidder)
      console.log("bid가격", amount);
      postgetBid.mutate()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return
    }
  }
  const getBuy = async () => {
    console.log(price)
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" })
      if (!accounts) {
        alert("지갑을 연결해주세요")
        return
      }
      console.log(accounts[0])
      console.log(localitem)
      setIsLoading(true)
      // sale컨트랙트 주소 받아서 생성
      const response = await SaleFactoryContract.methods
      .getSaleContractAddress(localitem.tokenId)
      .call();
      console.log(response)
      const saleContract = await createSaleContract(response)
      
      // sale컨트랙트로 erc20토큰 전송권한 허용
      await SSFTokenContract.methods
      .approve(response, price)
      .send({ from: accounts[0] });

      //purchase 요청
      const response2 = await saleContract.methods.purchase(price).send({ from: accounts[0] });
      const winner = (response2.events.SaleEnded.returnValues.winner);
      const amount = (response2.events.SaleEnded.returnValues.amount);
      console.log("구매자", winner)
      console.log("구매가격", amount);
      postgetBuy.mutate()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return
    }
  }

  const getTitle = () => {
    switch (status) {
      case "sell":
        return "Purchase"
      case "bid":
        return "Bid"
      default:
        return ""
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Title>{getTitle()}</Title>
        <Divider />
        <Exit>
          <CloseIcon
            fontSize="small"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Exit>
        <ContentBox>
          <div className="left">
            <img src={item.productThumbnailUrl} alt="pic" />
          </div>
          <div className="right">
            {status === "bid" &&
              (isLoading ? (
                <Content>
                  <div className="loading">
                    <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
                    <p>경매가 제시중...</p>
                    <p>잠시만 기다려주세요</p>
                  </div>
                </Content>
              ) : (
                <Content>
                  <div className="itemname">{item.productTitle}</div>
                  <div className="date">
                    작품 생성일 : {item.productRegDt.replaceAll("-", "/")}
                  </div>
                  <div className="desc">{item.productDesc}</div>
                  <div className="price">
                    현재 최고 경매제안가 : <span>{price}</span> NCT
                  </div>
                  <div className="price">
                    최소 {price + 1}NCT 이상의 입찰가를 입력하세요
                  </div>
                  <div>
                    <input
                      id={
                        check === "true"
                          ? "true"
                          : check === "false"
                          ? "false"
                          : "null"
                      }
                      value={priceValue}
                      onChange={handleChange}
                    />
                    NCT
                  </div>
                  {check === "true" && (
                    <div>
                      <ButtonBox>
                        <Button
                          onClick={() => {
                            getBid();
                          }}
                          variant="contained"
                        >
                          입찰하기
                        </Button>
                      </ButtonBox>
                    </div>
                  )}
                </Content>
              ))}
            {status === "sell" &&
              (isLoading ? (
                <Content>
                  <div className="loading">
                    <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
                    <p>작품 구매중...</p>
                    <p>잠시만 기다려주세요</p>
                  </div>
                </Content>
              ) : (
                <Content>
                  <div className="itemname">{item.productTitle}</div>
                  <div className="date">
                    작품 생성일 : {item.productRegDt.replaceAll("-", "/")}
                  </div>
                  <div className="desc">{item.productDesc}</div>
                  <div className="price">
                    즉시 구매가 : <span>{price}</span>NCT
                  </div>
                  <ButtonBox>
                    <Button
                      onClick={() => {
                        getBuy();
                      }}
                      variant="contained"
                    >
                      구매하기
                    </Button>
                  </ButtonBox>
                </Content>
              ))}
          </div>
        </ContentBox>
      </Wrapper>
    </Modal>
  );
}

export default DealModal