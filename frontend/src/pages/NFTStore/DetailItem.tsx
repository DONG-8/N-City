import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { artists as users } from './items';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import {  getProductAll, getProductDetail, getSellProduct } from '../../store/apis/product';
import { getUsercollectedInfo, getUserInfo } from '../../store/apis/user';
import { postProductLike } from '../../store/apis/Main';
import { delProductLike, getProductLike } from '../../store/apis/favorite';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ItemCard2 from '../../components/Card/ItemCard2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DealModal from './DealModal';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BidBox from './BidBox';

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
    font-size: 1.8vh;
    .mid-l{
      flex:1;
      button{
        font-size: 1.5vh;
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
    font-size: 4vh;
    font-weight: 800;
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
    overflow-y: hidden;

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
  
  
`

const Mid = styled.div`
  h1{
    margin-top: 7vw;
    margin-left: 7vw;
    margin-bottom: 3vw;
  }

`
const Description = styled.div`
  h3 {
    margin-left: 2vw;
  }
  .box {
    width: 26vw;
    height: 15vh;
    background-color: white;
    margin-left: 2vw;
    border-radius: 10px;
    border: 0.5px solid #e7e4e4;

    p {
      margin-left: 1vw;
      padding-top: 1vh;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  height: 20vh;
  .right {
    flex: 1;
    border-top: 0.5px solid #e0dede;
    .content{
        margin: 2vh;
      }
    button {
      margin-left: 10vw;
      border-radius: 15px;
      /* background-color: #272793; */
      background-color: #e0dede;
      color:#333;
    }
  }
`;
const ModalWrapper = styled.div`
  position: absolute;
  bottom: 10vh;
  right: 5vw;
  width: 80vw;
  height: 80vh;
  color: #eee;
  background: white;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 5px;
  padding: 15px 35px 15px 15px;

  .close {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .tip {
    margin-left: 12px;
  }
`;
const StoreWapper = styled.div`
  .nftstore {
    margin-left: 1vw;
    margin-top: 2vh;
    width: 80vw;
    height: 78vh;
    overflow: auto;
    color: black;
  }
`;
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
  }
}
const DetailItem = () => {
  const [localitem,setLocalitem] = useState<Istate['item']>(JSON.parse(localStorage.getItem("item")||""))
  const [likes,setLikes] = useState(Number(localitem.productFavorite))
  const [liked,setLiked] = useState(false) // 내가 좋아요 했나
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

  // 모달창
  const [open, setOpen] = useState(false);

  // 1: bid , 2:sell , 3:normal
  const [status,setStatus] = useState('bid') 
  const [MyAddress,setMyAddress] = useState(localStorage.getItem('userId'))
  const [productId,setProductId] = useState(useParams().productId)
  const [item,setItem] = useState(
    {
      "productId": 6,
      "userId": 1,
      "tokenId": 17,
      "productTitle": "디자이너",
      "productDesc": "디자이너너너",
      "productCode": 4,
      "productXCoordinate": 0,
      "productYCoordinate": 0,
      "productView": false,
      "productState": 2,
      "productPrice": 10,
      "productRegDt": "2022-03-29 11:30:36",
      "productFileUrl": "https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/210cd695-d5ab-4a48-b885-3cd9eb3c97b4.jpg",
      "productThumbnailUrl": "https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/612e52c3-6678-458e-9347-f58a4d5acc81.jpg",
      "productAuctionEndTime": null,
      "favoriteCount": 0
    }
  )
  
  const { isLoading:ILA, data:newItem } = useQuery<any>( // 추가 // 추천 데이터 
  "getProductAll",
  async () => {return (await (getProductAll({page: 1, size: 5 })))
  },
  { onError: (err: any) => {console.log(err, "판매중 데이터")}}
  );
  
  const {isLoading:ILC,data:collection} = useQuery<any>( // 이 유저가 가진 그림
    "getUserCollection",
    async()=>{return (await(getUsercollectedInfo(user.userId as number)))},
    {onError:(err)=>{console.log(err)}}
  )

  const getLiked = useMutation<any,Error>(
    'getProductLike',
    async()=>{return(
      await (getProductLike(Number(productId)))
    )},
    {onSuccess:(res)=>{
      setLiked(res)
    }}
  )

  const getProduct = useMutation<any, Error>(
    "productDetail",
    async () => { return(
      await (getProductDetail(Number(productId)))
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
  const getStatus = ()=>{
    if(item.productState ===1){setStatus('bid')}
    if(item.productState ===2){setStatus('sell')}
    if(item.productState ===3){setStatus('normal')}
  }
  useEffect(()=>{
    getStatus()
  },[item])
  useEffect(()=>{
    getProduct.mutate()
    getUser.mutate()
    getLiked.mutate()
    window.scrollTo(0, 0);
  },[productId])

  if (newItem && collection){
    if (items.length <5){
      setItems(items.concat(collection.content))
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
              <div>직업:{user.userRole}</div>
              <div>팔로워수:{user.followerCnt}</div>
              <div>팔로잉수:{user.followeeCnt}</div>
              <Button>팔로우하기</Button>
              <Button>팔로우끊기</Button>
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
                <div>카테고리 : {item.productCode}</div>
                <div>좋아요 수: {item.favoriteCount}</div>
                <div>등록일자:{item.productRegDt}</div>
                <div>상품상태/판매중?:{item.productState}</div>
                <div>상품상태/판매중?:{status}</div>
                <div onClick={()=>{setLiked(!liked)}} className='icon'>
                  {liked?
                  <FavoriteIcon onClick={()=>{cancelLike()}} color='error'/> :
                  <FavoriteBorderIcon onClick={()=>{Like()}} color='error'/>}
                </div> 
              </div>
                <Description>
                  <h3>작품설명</h3>
                  <div className='box'>
                    <p>{item.productDesc}</p>
                  </div>
                </Description>
            </div>
            
            {item.productFileUrl ? 
            <img className='img' alt='작품' src={item.productFileUrl as any}/>:
            <img className='img' alt='작품' src={item.productThumbnailUrl as any}/>
            }
          </div>
          <Bottom>
            <div className='right'>
              {console.log(item)}
              {status ==='bid' &&
              <BidBox setOpen={setOpen} item={item} />
              }
              {status==='sell' &&
              <>
                <div className='content'>즉시구매가 : {item.productPrice} </div>
                <Button variant="contained" onClick={()=>{setOpen(true)}} >구매하기</Button>
              </>}
              {status==='normal' && 
              <>
                <div className='content'>판매 등록이 없습니다</div>
              </>
              }
            </div>
          </Bottom>
          </div>
        </TopR>
        }
      </Top>
      <Mid>
        {items.length >0 &&
        <>
        <h1>이 작가의 다른 작품 & 새로나온 작품</h1>
        <MainBannerWrapper onClick={()=>{}}>
            <Slider {...settings}>
              { items.length >0 &&
              items.map((item,idx) => {
                return <div key={idx} onClick={()=>{setProductId(item.productId as any )}}>
                  <ItemCard2 key={idx} item={item}/> </div> ;
              }) }
            </Slider>
        </MainBannerWrapper>
        </>
      }
      </Mid>
      {open && (
          <ModalWrapper>
            <IconButton
              className="close"
              onClick={() => setOpen(false)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
            <StoreWapper className="StoreWapper">
              <div className="nftstore">
                <DealModal item={item} status={status} open={open} setOpen={setOpen}/>
              </div>
            </StoreWapper>
          </ModalWrapper>
        )}
    </Wrapper>
  );
}
export default DetailItem