import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'
import ether from './ethereum.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CardWrapper = styled.div`
  cursor: pointer;
  height: 420;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  border:0.5px solid #E9E4E4;
  margin: 30px ;
  &:hover{
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    transform: translateY(-5px);
    .buy{
      visibility: visible ;
      transition: 1s ;
    }
    .card_bottom{
      background-color: #f8ede9;
      transition: 0.1s ;
    }
  }
`
const Image = styled.div`
  img{
    width:350px;
    height:300px ;
    border-radius: 5px 5px 0 0 ;
    object-fit: cover;    
    }
`
const CardCenter = styled.div`
  display: flex;
  height: 80px;
  display: flex;
`;
const CardBottom = styled.div`
    height:40px;
    border-radius:0 0 5px 5px ;
    background-color: whitesmoke ;
    display: flex;
    justify-content: space-between ;
    .buy{
      visibility: hidden ;
      font-weight: 1000 ;
      color:#FF865B ;
      font-size:1.2rem ;
      margin:5px ;
      margin-left: 1.5rem ; 
    }
    .like{
      font-size:1.2rem ;
      font-weight:1000;
      margin: 7px ;
      display: flex;
    }
    .icon{
    cursor: pointer;
    margin-right: 0.5vw;
    margin-top:0.2vh;
    &:hover{
      transform: scale(1.1);
    }
  }
`
const DesLeft = styled.div`
  margin-left: 0.5rem;
  flex: 6;
`;
const Artist = styled.div`
  margin: 0.2rem;
  font-weight: 1000;
  margin-left: 0.5rem;
`;
const DesRight = styled.div`
  flex: 4;
  margin-left: 70px;
  margin-top: -25px;
  font-weight: 1000;
  font-size: 2rem;

`;
const Title = styled.div`
  font-size: 1.5rem;
  margin: 0.1rem;
  font-weight: 1000;
  margin-top: 0.4rem;
`;
interface Iprops{
  item :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
  },
}

const ItemCard:React.FC<Iprops>= ({item}) => {
  const navigate = useNavigate()
  const goDetailPage = ()=>{
    navigate('/store/detail')
    localStorage.setItem("item",JSON.stringify(item))
  }
  const [liked,setLiked] = useState(false)
  const [likes,setLikes] = useState(Number(item.productFavorite))
  return (
    <>
      <CardWrapper >
        <Image onClick={()=>{goDetailPage()}}>
          <img alt="pic" 
          src={item.productThumbnailUrl}/>
        </Image>
        <CardCenter onClick={()=>{goDetailPage()}}>
          <DesLeft>
            {/* <Artist>
              {item.name}
            </Artist> */}
            <Title>
              {item.productTitle}
            </Title>
          </DesLeft>
          <DesRight>
            <p className='number'> <img alt="💎" style={{"height":"2.5vh"}} src={ether}/>{item.productPrice}</p>
          </DesRight>
        </CardCenter>
        <CardBottom>
          <div className='buy'>
            <div>Buy Now</div>
            {/* <div>Sell</div>
            <div>판매수정</div> */}
            {/* 가격이 붙어 있고, 소유주가 아니면 buy now */}
            {/* 가격이 붙어 있고, 소유주라면 판매수정  */}
            {/* 가격이 붙어 있지 않고, 소유주라면 판매수정  */}
          </div>
          <div className='like'>
            <div onClick={()=>{setLiked(!liked)}} className='icon'>
              {liked?
              <FavoriteIcon onClick={()=>{setLikes(likes-1)}}  color='error'/> :
              <FavoriteBorderIcon onClick={()=>{setLikes(likes+1)}} color='error'/>}
            </div> 
              {likes}
          </div>
        </CardBottom>
      </CardWrapper>
    </>
  )
}

export default ItemCard