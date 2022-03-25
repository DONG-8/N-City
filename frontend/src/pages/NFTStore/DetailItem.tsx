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
import { artists, items as itm } from './items';
const etherURL = '/essets/images/ethereum.png'

const Wrapper = styled.div`
`

const Top = styled.div`
  width: 90vw;
  height: 60vh;
  margin: auto;
  margin-top: 10vh;
  display: flex;
`
const TopL = styled.div`
  flex: 4;
`
const ArtistBox = styled.div`
  height: 60%;
  background-color: #F7F8FA ;
  border-radius: 30px;
  .top{
    display: flex;
    align-items: center;
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
`
const ArtistDescription = styled.div`
  height: 30%;
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
    height: 8vh;
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
  flex: 6;
  background-color: blueviolet;
  background-color: #F7F8FA ;
  margin-left: 3vw;
  border-radius: 30px;
  .top{
    height: 44vh;
    background-color: yellowgreen;
    display: flex;
  }
  .top-left{
    width: 30vw;
    .title{
      font-size: 3rem;
      font-weight: 1000;
      margin-top: 3vh;
      margin-left: 2vw;
    }
  }
  .img{
    height: 40vh;
    width: 40vh;
    margin-top: 2vh;
    margin-left: 1vw;
    border-radius: 30px;
  }
  .bot{}
`

interface ItemType{
  item:{
    productTitle: string, // 제목
    productPrice: Number, // 가격
    productThumbnailUrl: string, // 사진
    productFavorite: Number, // 좋아요 갯수
    productRegDt:Object, // 등록일자
    productCode: Number, // 번호 
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
  const [item,setItem] = useState<ItemType['item']>(JSON.parse(localStorage.getItem("item")||"")) 
  const [likes,setLikes] = useState(Number(item.productFavorite))
  const [liked,setLiked] = useState(false)
  const [change,setChange] = useState(false)
  const [artist,setArtist] = useState<ItemType['artist']>(artists[0]) // item을 받고 artist 정보 받아오기(api)
  useEffect(()=>{
    const tmp = JSON.parse(localStorage.getItem("item")||"")
    if (item.productTitle !==tmp.productTitle){
      setItem(tmp)
      window.scrollTo(0,0)
    }
    setChange(false)
  },[change])
  return (
    <Wrapper>
      <Top>
        <TopL>
          <ArtistBox>
            <div className='top'>
              <img className='profile' src={artist.userImgUrl as any} alt='profile'/>
              <p className='name'>{artist.userNick}</p>
            </div>
            <div className='mid'>
              <div className='email'>{artist.userEmail}</div>
              <div className='verified'>
                {artist.userEmailConfirm && 
              <img alt="verified" style={{ height: "1.5rem" }}
              src="/essets/images/verified.png"/>}</div>
              <div>userId:{artist.userId}</div>
              <div>userRole:{artist.userRole}</div>
              <div>followeeCnt:{artist.followeeCnt}</div>
              <div>followerCnt:{artist.followerCnt}</div>
            </div>
          </ArtistBox>
          <ArtistDescription>
            <div className='title'>Description</div>
            <div className='content'>{artist.userDescription}</div>
          </ArtistDescription>
        </TopL>
        <TopR>
          <div className='top'>
            <div className='top-left'>
              <div className='title'>{item.productTitle}</div>
              <div>{item.productCode}</div>
              <div>하트{item.productFavorite}</div>
              <div>가격:{item.productPrice}</div>
              <div>등록일자:{item.productRegDt}</div>
            </div>
            <img className='img' alt='작품' src={item.productThumbnailUrl as any}/>
          </div>
          <div className='bot'>

          </div>
        </TopR>
      </Top>
    </Wrapper>
  );
}

export default DetailItem