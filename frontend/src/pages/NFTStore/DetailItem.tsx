import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ItemCard from '../../components/Card/ItemCard';
import Background from '../../components/Card/Background';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { artists, itemdetail, itemdetail as itm } from './items';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { getProductDetail } from '../../store/apis/product';
import { getUserInfo } from '../../store/apis/user';
const etherURL = '/essets/images/ethereum.png'

const Wrapper = styled.div`
`

const Top = styled.div`
  width: 90vw;
  height: 70vh;
  margin: auto;
  margin-top: 10vh;
  display: flex;
  margin-bottom: 10vh;
`
const TopL = styled.div`
  flex: 4;
  
`
const ArtistBox = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);

  height: 55%;
  background-color: #F7F8FA ;
  border-radius: 30px;
  .top{
    display: flex;
    align-items: center;
  }
  .mid{
    margin-left: 3vw;
  }
  .profile{
    border-radius: 100%;
    height: 12vh;
    margin: 5vh;
  }
  .name{
    color:#272793;
    font-size: 2rem;
    font-weight: 800;
  }
  overflow-x: hidden;
    overflow-y: scroll;
      &::-webkit-scrollbar { //스크롤바 🎨
        visibility: hidden;
        width: 7px;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #272793;
          border-radius: 10px;
          background-clip: padding-box;
          border: 1px solid transparent;
        }
      }
`
const ArtistDescription = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);

  height: 26vh;
  margin-top: 5vh;
  background-color: #F7F8FA ;
  border-radius: 30px;
  .title{
    padding-top: 2vh;
    margin-left: 2vw;
    font-size: 2rem;
    font-weight: 1000;
  }
  .content{
    width: 90%;
    height: 15vh;
    font-size: 1.1rem;
    margin-left: 2vw;
    margin-top: 2vh;
    overflow-x: hidden;
    overflow-y: scroll;
      &::-webkit-scrollbar { //스크롤바 🎨
        visibility: hidden;
        width: 7px;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #272793;
          border-radius: 10px;
          background-clip: padding-box;
          border: 1px solid transparent;
        }
      }
  }
`
const TopR = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  flex: 6;
  background-color: #F7F8FA ;
  margin-left: 3vw;
  border-radius: 30px;
  .top{
    height: 50vh;
    display: flex;
    overflow-x: hidden;
    overflow-y: scroll;
      &::-webkit-scrollbar { //스크롤바 🎨
        visibility: hidden;
        width: 7px;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #272793;
          border-radius: 10px;
          background-clip: padding-box;
          border: 1px solid transparent;
        }
      }
  }
  .top-left{
    width: 30vw;
    .title{
      font-size: 2.5rem;
      font-weight: 1000;
      margin-top: 3vh;
      margin-left: 2vw;
    }
    .content{
      margin-top: 3vh;
      margin-left: 2vw;
    }
  }
  .img{
    height: 45vh;
    width: 45vh;
    margin-top: 2vh;
    margin-right: 1vw;
    border-radius: 30px;
    border:1px solid #E0DEDE ;
  }
  .bot{
    display: flex;
    height: 20vh;
    .left{
      flex: 1;
      border-top: 0.5px solid #E0DEDE;
      button{
        border-radius:15px;
        background-color: #F7F8FA ;
        color: black;
      }
      }
    }
    .right{
      flex: 1;
      border-top: 0.5px solid #E0DEDE;
      border-left: 0.5px solid #E0DEDE;
      button{
        border-radius:15px;
        background-color: #272793;
      }
    }
`

interface ItemType{
  itm :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
  },
  itemdetail:{
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
  artist:{
    "authId": Number,
    "followeeCnt": Number,
    "followerCnt": Number,
    "userAddress": String,
    "userDescription": String,
    "userEmail": String,
    "userEmailConfirm": Boolean,
    "userId": Number,
    "userImgUrl": String,
    "userNick": String,
    "userRole": String
  },
  transactions:{
      event:string,
      price?:Number,
     from?:string,
     to?:string, 
     date:string
  }[]
}
const DetailItem = () => {
  const [transactions,setTransactions] = useState<ItemType['transactions']>([
    {event:'transfer', from:"59912",to:"24923", date:`20220309`},
    {event:'sale',price:1.04, from:"59912",to:"24923", date:`20220305` },
    {event:'list',price:1.01, date:`20220306` },
    {event:'minted', date:`20220301` }
  ])
  const [items,setItems] = useState(itm)
  // const [item,setItem] = useState<ItemType['itemdetail']>(JSON.parse(localStorage.getItem("item")||"")) 
  const [rawitem,setRawItem] = useState<ItemType['itm']>(JSON.parse(localStorage.getItem("item")||""))
  const [likes,setLikes] = useState(Number(rawitem.productFavorite))
  const [liked,setLiked] = useState(false)
  const [change,setChange] = useState(false)
  const [artist,setArtist] = useState<ItemType['artist']>(artists[0]) // item을 받고 artist 정보 받아오기(api)
  const [item,setItem] = useState<ItemType['itemdetail']>(
    {
      productId: 1,
      userId: 1,
      productTitle: 'string',
      productDesc: 'string',
      productCode: 1,
      productXCoordinate: 1,
      productYCoordinate: 1,
      productView: false,
      productState: 1,
      productPrice: 1,
      productRegDt: 'string',
      productFileUrl: 'string',
      productThumbnailUrl: 'string',
      favoriteCount: 1
    }
  )
  const getProduct = useMutation<any, Error>(
    "productDetail",
    async () => { return(
      await (getProductDetail(Number(rawitem.productId)))
    )},
    {
      onSuccess: (res) => {
        setItem(res)
      },
      onError: (err: any) => {
        console.log(err, "❌디테일 페이지 실패!");
      },
    }
  );
  const getUser = useMutation<any,Error>(
    "getuserdetail",
    async()=>{return(
      await (getUserInfo(Number(item.userId)))
    )},
    {onSuccess:(res)=>{
      setArtist(res)
    }}
  )
  useEffect(()=>{
    const tmp = JSON.parse(localStorage.getItem("item")||"")
    if (item.productTitle !==tmp.productTitle){
      setRawItem(tmp)
      window.scrollTo(0,0)
    }
    setChange(false)
    getProduct.mutate()
    getUser.mutate()
  },[change])
  return (
    <Wrapper>
      <Top>
        <TopL>
          <ArtistBox>
            <div className='top'>
              {artist.userImgUrl ? 
              <img className='profile' src={artist.userImgUrl as any} alt='profile'/>
              :
              <img className='profile' src='https://www.taggers.io/common/img/default_profile.png' alt='profile'/>} 
              <p className='name'>{artist.userNick}</p>
            </div>
            <div className='mid'>
              <div className='verified'>
                {artist.userEmailConfirm && 
              <img alt="verified" style={{ height: "1.5rem" }}
              src="/essets/images/verified.png"/>}</div>
              <div className='email'> email:{artist.userEmail}</div>
              <div>userId:{artist.userId}</div>
              <div>userRole:{artist.userRole}</div>
              <div>followeeCnt:{artist.followeeCnt}</div>
              <div>followerCnt:{artist.followerCnt}</div>
            </div>
          </ArtistBox>
          <ArtistDescription>
            <div className='title'>Description</div>
            {artist.userDescription ?
            <div className='content'>{artist.userDescription}</div>:
            <div className='content'>아직 글이 없어요~ 😀</div>}
          </ArtistDescription>
        </TopL>
        <TopR>
          {item &&
          <div className='ITEM'>
          <div className='top'>
            <div className='top-left'>
              <div className='title'>{item.productTitle}</div>
              <div className='content'>
                <div>productCode : {item.productCode}</div>
                <div>하트{item.favoriteCount}</div>
                <div>가격:{item.productPrice}</div>
                <div>등록일자:{item.productRegDt}</div>
                <div>productX:{item.productXCoordinate}</div>
                <div>productY:{item.productYCoordinate}</div>
                <div>productView:{item.productView}</div>
                <div>productState:{item.productState}</div>
                <div>productRegDt:{item.productRegDt}</div>
              </div>
            </div>
            
            {item.productFileUrl ? 
            <img className='img' alt='작품' src={item.productFileUrl as any}/>:
            <img className='img' alt='작품' src={item.productThumbnailUrl as any}/>}
          </div>
          <div className='bot'>
            <div className='left'>
              <div>직전 거래가 : </div>
              <div>최고 거래가 : </div>
              <Button variant="contained">제안하기</Button>
            </div>
            <div className='right'>
              <div>판매가 : </div>
              <div>판매 종료 : </div>
              <Button variant="contained" >구매하기</Button>
            </div>
          </div>
          </div>
}
        </TopR>
      </Top>
    </Wrapper>
  );
}

export default DetailItem