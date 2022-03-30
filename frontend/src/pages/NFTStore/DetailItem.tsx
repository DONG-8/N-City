import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { artists as users } from './items';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import {  getProductDetail, getSellProduct } from '../../store/apis/product';
import { getUsercollectedInfo, getUserInfo } from '../../store/apis/user';
import { postProductLike } from '../../store/apis/Main';
import { delProductLike } from '../../store/apis/favorite';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ItemCard2 from '../../components/Card/ItemCard2';



function NextArrow(props) {
  const { className, style, onClick } = props;
  return <RCricle onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return <LCricle onClick={onClick} />;
}

const RCricle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  /* background-color: red; */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z'/%3E%3C/svg%3E");
  position: absolute;
  top: 200px;
  right: -80px;
  cursor: pointer;
`;

const LCricle = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  /* background-color: red; */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z'/%3E%3C/svg%3E");
  position: absolute;
  top: 200px;
  left: -80px;
`;

const settings = {
  dots: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MainBannerWrapper = styled.div`
  padding-top: 5vh;
  width: 90vw;
  height: 450px;
  color: black;
  margin: 0 auto;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin-bottom: 10vh;
`;



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
const UserBox = styled.div`
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
    display: flex;
    .mid-l{
      flex:1;
    }
    .mid-r{
      flex:1;
      button{
        font-size: 3rem;
      }
    }
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
const UserDescription = styled.div`
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

const Mid = styled.div`
  h1{
    margin-top: 7vw;
    margin-left: 7vw;
    margin-bottom: 3vw;
  }
`
  

interface Istate{
  item :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
    productFavoriteUser:{
      authId: Number,
      userAddress: string,
      userDescription: string,
      userEmail: string,
      userEmailConfirm: boolean,
      userId: number,
      userImgUrl: string,
      userNick: string,
      userRole: string,
    }[],
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
  user:{
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
  const [transactions,setTransactions] = useState<Istate['transactions']>([
    {event:'transfer', from:"59912",to:"24923", date:`20220309`},
    {event:'sale',price:1.04, from:"59912",to:"24923", date:`20220305` },
    {event:'list',price:1.01, date:`20220306` },
    {event:'minted', date:`20220301` }
  ])
  const [rawitem,setRawItem] = useState<Istate['item']>(JSON.parse(localStorage.getItem("item")||""))
  const [likes,setLikes] = useState(Number(rawitem.productFavorite))
  const [change,setChange] = useState(false)
  const [user,setUser] = useState(users[0])
  const [items,setItems ] = useState<Istate['item'][]>([{
      productId: 1,
      productTitle: 'string',
      productPrice: 1,
      productThumbnailUrl: 'string',
      productFavorite: 1,
      productRegDt:1,
      productCode: 1,
      productFavoriteUser:[
      {authId: 1,
      userAddress: 'string',
      userDescription: 'string',
      userEmail: 'string',
      userEmailConfirm: true,
      userId: 0,
      userImgUrl: 'string',
      userNick: 'string',
      userRole: 'string'}]
    }
    ])
  const [id,setId] = useState(useParams().productId)
  const [item,setItem] = useState<Istate['itemdetail']>(
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

  const { isLoading:ILA, data:newItem } = useQuery<any>( // 추가 // 추천 데이터 
  "getSellProduct",
  async () => {return (await (getSellProduct()))
  },
  { onError: (err: any) => {console.log(err, "판매중 데이터")}}
  );
  
  const {isLoading:ILC,data:collection} = useQuery<any>( // 이 유저가 가진 그림
    "getUserCollection",
    async()=>{return (await(getUsercollectedInfo(user.userId as number)))},
    {onError:(err)=>{console.log(err)}}
  )

  const getProduct = useMutation<any, Error>(
    "productDetail",
    async () => { return(
      await (getProductDetail(Number(id)))
    )},{
      onSuccess: (res) => {setItem(res)},
      onError: (err: any) => {console.log(err, "❌디테일 페이지 실패!")}});

  const getUser = useMutation<any,Error>(
    "getuserdetail",
    async()=>{return(
      await (getUserInfo(Number(item.userId)))
    )},
    {onSuccess:(res)=>{setUser(res)}
  }
  )

  const LikeIt = useMutation<any,Error>(
    'postProductLike',
    async()=>{ return (
      await ( postProductLike(Number(item.productId)))
      )
    },
    {onSuccess: (res)=>console.log(res),
      onError:(err)=>console.log(err)}
  )
  const cancelLikeIt = useMutation<any,Error>(
    'delProductLike',
    async()=>{ return (
      await ( delProductLike(Number(item.productId)))
      )
    },
    {onSuccess: (res)=>console.log(res),
    onError:(err)=>console.log(err)}
  )
  const Like =()=>{
    setLikes(likes+1)
    LikeIt.mutate()
  }
  const cancelLike  =()=>{
    setLikes(likes-1)
    cancelLikeIt.mutate()
  }
  useEffect(()=>{
    getProduct.mutate()
    getUser.mutate()
    console.log(item)
  },[id])

  if (newItem && collection){
    if (items.length <5){
      setItems(items.concat(collection.content))
      setItems(items.concat(newItem.content))
      setItems(items.concat(newItem.content))
    }
  }
  return (
    <Wrapper>
      <Top>
        <TopL>
          {user!== undefined &&<>
          <UserBox>
            <div className='top'>
              {user.userImgUrl ? 
              <img className='profile' src={user.userImgUrl as any} alt='profile'/>
              :
              <img className='profile' src='https://www.taggers.io/common/img/default_profile.png' alt='profile'/>} 
              <p className='name'>{user.userNick}</p>
            </div>
            <div className='mid'>
              <div className='mid-l'>
              <div className='verified'>
                {user.userEmailConfirm && 
              <img alt="verified" style={{ height: "1.5rem" }}
              src="/essets/images/verified.png"/>}</div>
              <div className='email'> email:{user.userEmail}</div>
              <div>userId:{user.userId}</div>
              <div>userRole:{user.userRole}</div>
              <div>followeeCnt:{user.followeeCnt}</div>
              <div>followerCnt:{user.followerCnt}</div>
              </div>
              <div className='mid-r'>
                <button onClick={()=>{Like()}}>♡</button>
                <button onClick={()=>{cancelLike()}}>❤</button>
              </div>
              
            </div>
          </UserBox>
          <UserDescription>
            <div className='title'>Description</div>
            {user.userDescription ?
            <div className='content'>{user.userDescription}</div>:
            <div className='content'>아직 소개 글이 없어요~ 😀</div>}
          </UserDescription>
          </>}
        </TopL>
          {item !== undefined &&
        <TopR>
          <div className='ITEM'>
          <div className='top'>
            <div className='top-left'>
              <div className='title'>{item.productTitle}</div>
              <div className='content'>
                <div>productCode : {item.productCode}</div>
                <div>좋아요 : {item.favoriteCount}</div>
                <div>등록일자:{item.productRegDt}</div>
                <div>productView:{item.productView}</div>
                <div>productState:{item.productState}</div>
                <div>작품설명:{item.productDesc}</div>
              </div>
            </div>
            
            {item.productFileUrl ? 
            <img className='img' alt='작품' src={item.productFileUrl as any}/>:
            <img className='img' alt='작품' src={item.productThumbnailUrl as any}/>
            }
          </div>
          <div className='bot'>
            <div className='left'>
              <div>직전 거래가 : </div>
              <div>최고 거래가 : </div>
              <Button variant="contained">제안하기</Button>
            </div>
            <div className='right'>
              <div>판매가 : {item.productPrice} </div>
              <div>판매 종료 : </div>
              <Button variant="contained" >구매하기</Button>
            </div>
          </div>
          </div>
        </TopR>
        }
      </Top>
      <Mid>
        {items.length >0 &&
        <>
        <h1>이 작가의 다른 작품 & 판매중인 작품</h1>
        <MainBannerWrapper onClick={()=>{}}>
            <Slider {...settings}>
              { items.length >0 &&
              items.map((item,idx) => {
                return <div onClick={()=>{setId(item.productId as any )}}>
                  <ItemCard2 key={idx} item={item}/> </div> ;
              }) }
            </Slider>
        </MainBannerWrapper>
        </>
      }
      </Mid>
    </Wrapper>
  );
}
export default DetailItem