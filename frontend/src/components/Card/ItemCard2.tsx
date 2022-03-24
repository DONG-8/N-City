import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'
import ether from './ethereum.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CardWrapper = styled.div`
  cursor: pointer;
  height: 300px;
  width: 250px;
  background-color: #ffffff;
  border-radius: 2px;
  border:1px solid gray;
  box-shadow:0px 3px 3px  ;
  /* border: 0.5px solid gray; */
  margin: 30px ;
  &:hover{
    box-shadow:0px 5px 5px  ;    
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
    width:250px;
    height:250px ;
    border-radius: 2px 2px 0 0 ;
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
  margin: 0.2rem;
  font-weight: 1000;
  margin-left: 0.5rem;
`;
const DesRight = styled.div`
  flex: 4;
  margin-left: 70px;
  margin-top: -10px;
  font-weight: 1000;
  font-size: 1rem;
`;
const Title = styled.div`
  font-size: 0.5rem;
  margin-left: 1rem;
  font-weight: 1000;
  margin-top: 0.4rem;
`;
interface Iprops{
  item :{
    name:string,
    title:string,
    price:number,
    liked:number,
    url:string
  }
}

const ItemCard2:React.FC<Iprops>= ({item}) => {
  const navigate = useNavigate()
  const goDetailPage = ()=>{
    navigate('/store/detail')
    localStorage.setItem("item",JSON.stringify(item))
  }
  const [liked,setLiked] = useState(false)
  const [likes,setLikes] = useState(item.liked)

  return (
    <>
      <CardWrapper >
        <Image onClick={()=>{goDetailPage()}}>
          <img alt="pic" 
          src={item.url}/>
        </Image>
        <CardCenter onClick={()=>{goDetailPage()}}>
          <DesLeft>
            <Artist>
              {item.name}
            </Artist>
            <Title>
              {item.title}
            </Title>
          </DesLeft>
          <DesRight>
            <p className='number'> <img alt="💎" style={{"height":"2.5vh"}} src={ether}/>{item.price}</p>
          </DesRight>
        </CardCenter>
      </CardWrapper>
    </>
  )
}

export default ItemCard2