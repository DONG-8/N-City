import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'
import ether from './ethereum.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CardWrapper = styled.div`
  cursor: pointer;
  height: 320px;
  width: 280px;
  background-color: #ffffff;
  border-radius: 10px;
  border:0.5px solid #E9E4E4;
  margin: 30px ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  &:hover{
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
    width:280px;
    height:280px ;
    border-radius: 10px 10px 0 0 ;
    object-fit: cover;    
  }
`
// 5/7
const CardCenter = styled.div`
  display: flex;
  height: 55px;
  display: flex;
  border-radius: 0 0 2px 2px ;
`;

const DesLeft = styled.div`
  margin-left: 0.5rem;
  flex: 6;
`;
const Artist = styled.div`
  font-size: 0.9rem;
  margin-left: 0.2rem;
  font-weight: 1000;
  margin-left: 0.5rem;
`;
const DesRight = styled.div`
  flex: 4;
  margin-left: 2rem;
  margin-top: -10px;
  font-weight: 1000;
  font-size: 1rem;
`;
const Title = styled.div`
  font-size: 0.5rem;
  margin-left: 1rem;
  font-weight: 1000;
  margin-top: 0.2rem;
`;
const DesCenter = styled.div`
  display: flex;
  margin-left: 1rem;
  .like{
      margin-top: 0.3rem;
      font-size: 1rem ;
      font-weight:600;
      display: flex;
      p{
        margin: 0;
        margin-top: 0.2rem;
        margin-left: 0.4rem;
      }
    }
    .icon{
    cursor: pointer;
    margin-top:0.2vh;
    
    &:hover{
      transform: scale(1.1);
    }
}
`
interface Iprops{
  item :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
  }
}

const ItemCard2:React.FC<Iprops>= ({item}) => {
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
          { item.productThumbnailUrl ?
          <img alt="pic" src={item.productThumbnailUrl}/>:
          <img alt="pic" src="https://search.pstatic.net/sunny/?src=http%3A%2F%2Ftx01-az3199.ktics.co.kr%2F13301240351_t_article.png&type=sc960_832"/>}
        </Image>
        <CardCenter >
          <DesLeft>
            {/* <Artist>
            {item.name}              
            </Artist> */}
            <Title>
              {item.productTitle}
            </Title>
          </DesLeft>
          <DesCenter>
          <div className='like'>
            <div onClick={()=>{setLiked(!liked)}} className='icon'>
              {liked?
              <FavoriteIcon onClick={()=>{setLikes(likes-1)}}  color='error'/> :
              <FavoriteBorderIcon onClick={()=>{setLikes(likes+1)}} color='error'/>}
            </div> 
              <p>
                {likes}
              </p>
          </div>
          </DesCenter>
          <DesRight>
            <p className='number'> 
            <img alt="💎" style={{"height":"2.5vh"}} src={ether}/>
              {item.productPrice}
            </p>
          </DesRight>
        </CardCenter>
      </CardWrapper>
    </>
  )
}

export default ItemCard2