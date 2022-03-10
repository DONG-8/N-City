import React from 'react'
import styled from 'styled-components'

const Cards = styled.div`
  cursor: pointer;
  height: 400px;
  width: 300px;
  background-color: #F2DBDB;
  border-radius: 10px;
  box-shadow:1px 3px 7px  ;
  margin: 30px ;
  .image{
    img{
    width:300px;
    height:300px ;
    border-radius: 10px 10px 0 0 ;
    object-fit: cover;    

    }
  }
  .card_center{
    display:flex ;
    height: 60px ;
    display: flex ;

    .artist{
        margin:0.2rem ;
        font-weight: 1000 ;
        margin-left: 0.5rem;
    }
    .title{
      font-size:1.4rem;
        margin: 0.1rem;
        font-weight: 1000 ;   
    }
    .des_left{
      margin-left:0.5rem ;
      flex:6;
    }
    .des_right{
      flex:4;
      margin-top: 30px;
      font-weight: 1000 ;
    }
  }
  .card_bottom{
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
  }
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
const ItemCard = () => {
  return (
    <>
      <Cards>
        <div className='image'>
          <img alt="pic" 
          src='https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305'/>
        </div>
        <div className='card_center'>
          <div className='des_left'>
            <div className='artist'>
              Hong Hosus
            </div>
            <div className='title'>
              #Hong1535
            </div>
          </div>
          <div className='des_right'>
            1.24 💎
          </div>
        </div>
        <div className='card_bottom'>
          <div className='buy'>Buy Now</div>
          <div className='like'>❤ 35</div>
        </div>
      </Cards>
    </>
  )
}

export default ItemCard