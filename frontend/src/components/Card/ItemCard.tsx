import React from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'

const CardWrapper = styled.div`
  cursor: pointer;
  height: 400px;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow:1px 3px 7px  ;
  margin: 30px ;
  &:hover{
    &{
      transform:scale(1.01) ;
    }
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
    border-radius: 10px 10px 0 0 ;
    object-fit: cover;    
    }
`
const CardCenter = styled.div`
  display:flex ;
    height: 60px ;
    display: flex ;
`
const CardBottom = styled.div`
  height:40px;
    border-radius:0 0 10px 10px ;
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
      margin: 7px ;
    }
`
const DesLeft = styled.div`
  margin-left:0.5rem ;
      flex:6;
`
const Artist = styled.div`
    margin:0.2rem ;
    font-weight: 1000 ;
    margin-left: 0.5rem;
`
const DesRight = styled.div`
  flex:4;
      margin-top: 30px;
      font-weight: 1000 ;
`
const Title = styled.div`
  font-size:1.4rem;
        margin: 0.1rem;
        font-weight: 1000 ; 
`
interface Iprops{
  item :{
    name:string,
    title:string,
    price:number,
    liked:number,
    url:string
  }
}

const ItemCard:React.FC<Iprops>= ({item}) => {
  const navigate = useNavigate()
  const goDetailPage = ()=>{
    navigate('/store/detail')
    localStorage.setItem("item",JSON.stringify(item))
  }
  return (
    <>
      <CardWrapper onClick={()=>{goDetailPage()}}>
        <Image>
          <img alt="pic" 
          src={item.url}/>
        </Image>
        <CardCenter>
          <DesLeft>
            <Artist>
              {item.name}
            </Artist>
            <Title>
              {item.title}
            </Title>
          </DesLeft>
          <DesRight>
            {item.price}💎
          </DesRight>
        </CardCenter>
        <CardBottom>
          <div className='buy'>Buy Now</div>
          <div className='like'>❤ {item.liked}</div>
        </CardBottom>
      </CardWrapper>
    </>
  )
}

export default ItemCard