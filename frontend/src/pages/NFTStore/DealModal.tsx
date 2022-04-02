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

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 60vw;
  height: 60vh;
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
const Content = styled.div`
  margin-left: 5vw;
  margin-top: 3vh;
  .price{
    font-size: 3vh;
  }
  #true{
    background-color: #def3bf;
  }
  #false{
    background-color: #f8ced5;
  }
`
const List = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  margin-bottom: 3px;
  width: 80%;
  padding: 10px;
  .id {
    width: 12%;
    margin-left: 20px;
  }
  .name {
    width: 12%;
  }
  .email {
    width: 30%;
  }
`;

const ListCategory = styled.div`
  border: 1px solid teal;
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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

const DealModal:React.FC<Iprops> = ({item,open,setOpen,status}) => {
  const handleClose = () => setOpen(false);
  const [localitem,setLocalitem] = useState<any>(item)
  const [productId,setProductId] = useState(Number(localitem.productId))
  const [priceValue,setPriceValue] = useState('')
  const [check,setCheck] = useState('')
  const [price,setPrice] = useState(Number(item.productPrice))
  const [afterBuy,setAfterBuy] = useState(false)
  const [history, setHistory] = useState<Istate["history"][]>([])
  const {ethereum} = window

  const getHistory = useMutation<any>( // 추가 // 추천 데이터
    "getPastHistory",
    async () => {
      return await getPastHistory(localitem.productId);
    },
    {
      onSuccess: (res) => {
        console.log("히스토리받아오기 성공", res)
        const temp = res.content.reverse()
        setHistory(temp)
      },
      onError: (err: any) => {
        console.log(err, "히스토리 오류");
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(e.target.value);
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
      },
      onError: (err: any) => {
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
        console.log("buy요청성공", res);
      },
      onError: (err: any) => {
        console.log("buy요청 실패", err);
      },
    }
  );

  const isOkay = ()=>{
    if(Number(priceValue)-price>=1){setCheck('true')} 
    else if (priceValue===''){setCheck('null')}
    else {setCheck('false')}
  }

  const dealTypeConvert = (dealType) => {
    switch (dealType) {
      case 1: // 경매등록
        return <Event><ShoppingCartIcon /><div>Create auction</div></Event>
      case 2: // 판매등록
        return <Event><ShoppingCartIcon /><div>Create Sale</div></Event>
      case 3: // 경매참여
        return <Event><LocalOfferIcon /><div>Bid</div></Event>
      case 4: // 판매취소
        return <Event><ReplayIcon /><div>Cancel sale</div></Event>
      case 5: // 소유권 전달
        return <Event><CompareArrowsIcon /><div>Transfer</div></Event>
      case 6: // 민팅
        return <Event><ChildFriendlyIcon /><div>Minted</div></Event>
      default:
        return "알수없는 dealType"
    }
  };

  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }

  const convertDate = (dateArray) => {
    const year = String(dateArray[0]);
    const month = String(dateArray[1]);
    const day = String(dateArray[2]);
    return year + "-" + leadingZeros(month, 2) + "-" + leadingZeros(day, 2)
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
      return
    }
  }

  useEffect(() => {
    getHistory.mutate()
  }, [])
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <div className="title">{status}</div>
        <Exit>
          <CloseIcon
            fontSize="small"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Exit>
        {status === "bid" && (
          <Content>
            <div className="price"> 현재 가격:{price}</div>
            <p>현재 가격에 최소 1NCT 이상의 입찰가를 입력하세요</p>
            <Input
              id={
                check === "true" ? "true" : check === "false" ? "false" : "null"
              }
              value={priceValue}
              onChange={handleChange}
            />
            {check === "true" && (
              <div>
                <Button
                  onClick={() => {
                    getBid();
                  }}
                >
                  입찰하기
                </Button>
              </div>
            )}
            <List>
                  <ListCategory>
                    <div>Event</div>
                    <div>Price</div>
                    <div>From</div>
                    <div>To</div>
                    <div>Date</div>
                  </ListCategory>
                  {history?.map((history, idx) => {
                    return (
                      <ListItem key={idx}>
                        <div>{dealTypeConvert(history.dealType)}</div>
                        <div>{history.dealPrice}</div>
                        <div>{history.dealFromNickName}</div>
                        <div>{history.dealToNickName}</div>
                        <div>{convertDate(history.dealCreatedAt)}</div>
                      </ListItem>
                    );
                  })}
                </List>
            {afterBuy && (
              <h3>
                {item.productTitle}작품을 {priceValue}NCT에 입찰 성공했습니다
              </h3>
            )}
          </Content>
        )}
        {status === "sell" && (
          <Content>
            즉시 구매가:{price}NCT
            {!afterBuy ? (
              <div>
                <Button
                  onClick={() => {
                    getBuy();
                  }}
                >
                  입찰하기
                </Button>
              </div>
            ) : (
              <h3>
                {item.productTitle}작품을 {price} NCT에 입찰 성공했습니다
              </h3>
            )}
          </Content>
        )}
      </Wrapper>
    </Modal>
  );
}

export default DealModal