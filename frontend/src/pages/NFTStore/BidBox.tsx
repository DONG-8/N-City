import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';
import 'moment/locale/ko';
import { useMutation } from 'react-query';
import { getPastHistory, postAuctionConfirm } from '../../store/apis/deal';
import { createSaleContract, SaleFactoryContract } from '../../web3Config';

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

const BidBox:React.FC<Iprops> = ({item,setOpen}) => {
  // console.log(item)
  const moment = require('moment')
  const [endtime,setEndtime] = useState(moment(item.productAuctionEndTime))
  const [isEnd,SetIsEnd]  = useState(endtime.isBefore(moment())) // 요놈이 트루면 끝!
  const [date,setData] = useState(endtime.calendar())
  const [RESTTIME,setRESTTIME] = useState({days:0,hours:0,minutes:0,seconds:0}) 
  // const [history, setHistory] = useState<IState["history"][]>([])
  const [lastBidder, setLastBidder] = useState("")
  const {ethereum} = window;

  const getHistory = useMutation<any>( // 추가 // 추천 데이터
    "getPastHistory",
    async () => {
      return await getPastHistory(Number(item.productId));
    },
    {
      onSuccess: (res) => {
        console.log("히스토리받아오기 성공", res);
        const bidArray = res.content.filter((item) => item.dealType === 3);
        // console.log(bidArray)
        console.log(bidArray[bidArray.length - 1].dealFromNickName);
        setLastBidder(bidArray[bidArray.length - 1].dealFromNickName);
      },
      onError: (err: any) => {
        console.log(err, "히스토리 오류");
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
        console.log("confirm 성공", res);
      },
      onError: (err) => console.log("confirm 실패", err)
    }
  );
  
  const onClickConfirm = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" })

      //salecontract address
      const saleContractAddress = await SaleFactoryContract.methods.getSaleContractAddress(item.tokenId).call()
      const saleContract = await createSaleContract(saleContractAddress)
      const response = await saleContract.methods.confirmItem().send({ from: accounts[0] });
      const temp = (response.events.SaleEnded.returnValues.winner);
      const temp2 = (response.events.SaleEnded.returnValues.amount);
      console.log("경매끝 최종 구매자", temp)
      console.log("경매끝 최종 구매 가격", temp2)
      confirmProduct.mutate()
    } catch (error) {
      console.log("confirm 실패", error)
    }
  }

  useEffect(()=>{
    const timer = setInterval(() => {
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
  }, [])

  return (
    <div>
    {isEnd ? 
      <div>
       <h3>경매 종료</h3>
       <div className='content'>최종 입찰가 : {item.productPrice} </div>
       <div className='content'>최종 입찰자 : {lastBidder} </div>
       <button onClick={onClickConfirm}>Confirm</button>
      </div>
    : 
    <>
      <h3>진행중</h3>
      {/* <div className='content'>판매 종료 시간 : {item.productAuctionEndTime} </div> */}
      <div className='content'>판매 종료 시간 : {date} </div>
      <div className='content'>현재가 : {item.productPrice} </div>
      <div className='content'>현재 최종 입찰자 : {lastBidder} </div>
      <div className='content'>{RESTTIME.days}일 {RESTTIME.hours}시간 {RESTTIME.minutes}분 {RESTTIME.seconds}초 남았습니다</div>
      <Button variant="contained" onClick={()=>{setOpen(true)}}>제안하기</Button>
    </>
  }
    </div>
  )
}

export default BidBox