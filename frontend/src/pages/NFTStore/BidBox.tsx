import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';
import 'moment/locale/ko';

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
interface ITime {
  time:{
    day:number,
    hour:number,
    minute:number,
    second:number
  }|null
}

const BidBox:React.FC<Iprops> = ({item,setOpen}) => {
  console.log(item)
  const moment = require('moment')
  const [endtime,setEndtime] = useState(moment(item.productAuctionEndTime))
  const [now,setNow] = useState(moment())
  // 현재보다 전인가 ? 전이면 끝나는 것
  const [isEnd,SetIsEnd]  = useState(endtime.isBefore(now))
  const [date,setData] = useState(endtime.calendar())
  var Time = useRef<ITime['time']>()
  
  // const getrestTime = setInterval(() => {
  //   Time = 
  //   {
  //     day :moment.duration(endtime.diff(now)).days(),
  //     hour :moment.duration(endtime.diff(now)).hours(),
  //     minute :moment.duration(endtime.diff(now)).minutes(),
  //     second :moment.duration(endtime.diff(now)).seconds(),
  //   }
  // },1000)
  // getrestTime()
  return (
    <div>
    {isEnd ? 
      <div>
       <h3>경매 종료</h3>
      </div>
    : 
    <>
      <h3>진행중</h3>
      {/* <div className='content'>판매 종료 시간 : {item.productAuctionEndTime} </div> */}
      <div className='content'>판매 종료 시간 : {date} </div>
      <div className='content'>현재가 : {item.productPrice} </div>
      {/* <div className='content'>남은시간 : {restTime} </div> */}
      <Button variant="contained" onClick={()=>{setOpen(true)}}>제안하기</Button>
    </>
  }
    </div>
  )
}

export default BidBox