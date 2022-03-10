import React, { useState } from 'react'
import styled from 'styled-components'
import { verifiedIMG } from '../../components/Card/ArtistCard'
const etherURL:string = 'https://cdn-icons.flaticon.com/png/128/4125/premium/4125334.png?token=exp=1646808226~hmac=06a9e13c5df4ab039435da22a37e4463'
const DetailPage = styled.div`
  background-color: yellow ;
  width: 1500px ;
  margin: auto ;
  .top{
    margin-top: 10vh ;
    display: flex ;
    justify-content:space-around ;
  }
`
const ItemCard = styled.div`
  background-color: #fffffe;
  border-radius:10px ;
  box-shadow:1px 3px 7px ;
  width: 500px;
  height: 550px;
  img{
    width:500px ;
    height:500px ;
    border-radius:10px 10px 0 0 ;
  }
  .like{
    display:flex ;
    justify-content: end;
    margin-right:1vw ;
    font-size:1.5rem ;
  }
`
const Description = styled.div`
  background-color: #fffffe;
  box-shadow:1px 3px 7px ;
  width: 500px;
  height: 550px;
  border-radius: 10px ;
  .artist{
    font-weight:1000 ;
    color:#EB6767;
    font-size: 2rem ;
    margin:1rem ;
  }
  .title{
    font-weight:1000 ;
    font-size: 3rem ;
    margin:1rem ;

  }
  .owner{
    font-weight:1000 ;
    display:flex ;
    font-size:1.5rem ;
    margin: 1rem;
    margin-bottom:2rem ;
    .owner_name{
      margin-left:1rem ;
      color:#EB6767;
    }
  }
  .contents{
    margin:1rem ;
    margin-top:2rem ;
    font-weight:1000; ;
    font-size:1.2rem ;
    margin-bottom:2rem ;
    .des_title{
      font-size:1.5rem ;
      margin-bottom:2rem ;
    }
    .content{
      display: flex;
      justify-content: space-between ;
      
    }
    .red_text{
      color:#EB6767;
    }
  }
  .buy{
    font-size:2rem ;
    font-weight:1000 ;
    display:flex ;
    margin : 1rem;
    margin-top:2.5rem;
    justify-content:space-between ;
    .buy_button{
      border-radius:10px ;
      width:7rem ;
      height:3rem;
      background-color:#EB6767 ;
      color:white ;
      font-size:1.5rem ;
      font-weight:1000 ;
      img{
        height:1.5rem;
        margin-right:0.5rem ;
      }
      &:hover{
        &{
          transform: scale(1.05) ;
          background-color:#fb5252  ;
        }
      }
    }
  }
`
const Transaction = styled.div`
  background-color: #fffffe;
  box-shadow:1px 3px 7px ;
  width: 83.5%;
  height: 550px;
  margin: auto ;
  margin-top: 10vh ;
  border-radius: 10px ;
`

const DetailItem = () => {
  const transactions:{event:string,price?:number, from?:string,to?:string, date:number}[]= [
    {event:'transfer', from:"59912",to:"24923", date:20220309 },
    {event:'sale',price:1.04, from:"59912",to:"24923", date:20220305 },
    {event:'list',price:1.01, date:20220306 },
    {event:'minted', date:20220301 },
  ]
  return (
      <DetailPage>
        <div className='top'>
          <ItemCard>
            <img alt ="pic" src='https://lh3.googleusercontent.com/m3ItIEvgov0fZVFGX8suBYdLTk9hTNKb2DNPvWFHnTxpIx-6D_kzR6c1uqXDssIITM9MI3eGkuyXU7ojyxRoCpWK0QOOU2rEciE3Tw=w600'/>
            <div className='like'> ❤ 32</div>
          </ItemCard>
          <Description>
            <div className='artist'>
              ShowMaker {verifiedIMG()}
            </div>
            <div className='title' >
            Hidden Weirdo
            </div>
            <div className='owner'>
              owner: <div className='owner_name'> ParkSos0321</div>
            </div>
            <hr/>
            <div className='contents'>
              <div className='des_title'>
              작품설명
              </div>
              <div className='content' >
                <span> Contract Adderess : </span> 
                <span className='red_text'>0x1234515re932</span>
              </div>
              <div className='content'>
                <span> Token ID: </span> 
                <span className='red_text'>8055</span>
              </div>
              <div className='content'>
                <span> Token Standard: </span> 
                <span className='red_text'>ERC-721</span>
              </div>
            </div>
            <hr/>
            <div className='buy'>
              <div className='price'>
                1.04 <img style={{"height":"2rem"}}  alt="이더" src= {etherURL}/>
              </div>
              <button className='buy_button'>
                <img  alt="cart"
                src='https://cdn-icons-png.flaticon.com/512/3737/3737151.png'/>
                구매
              
              </button>
            </div>
          </Description>
        </div>
        <div className='center'>
          <Transaction>
            <h1>거래내역</h1>
            {transactions.map()=>{(
              <div></div>
            )}}
          </Transaction>
        </div>
        <div className='bottom'>
        </div>
      </DetailPage>
  )
}

export default DetailItem