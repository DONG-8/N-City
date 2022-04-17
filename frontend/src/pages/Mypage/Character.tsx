import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCharacter, putCharacterChange } from '../../store/apis/myRoom';
import { getUsercollectedInfo } from '../../store/apis/user';
import img1 from './images/character1.png'
const Wrapper = styled.div`
  .title{
    margin-left: 8vw;
    font-size: 4vh;
  }
  .save{
    margin-left: 2vw;
    font-weight: 600;
    background-color: #2394f6;
    color: white;
  }
`
const IntroBox = styled.div`
  width: 85vw;
  height: 40vh;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin: auto;
  margin-top: 10vh;
  display: flex;
  margin-bottom:5vh;
  overflow-y: hidden;

`
const Left = styled.div`
  flex: 1;
  .text{
    margin-left: 5vw;
    margin-top: 4vh;
  .h1{
    font-size: 8vh;
    margin-bottom: 5vh;
    font-weight: 600;
  }
  .h4{
    font-size : 2vh;
    margin-top:1vh;
  }
  .blue{
    background:linear-gradient(to top,transparent 10%,skyblue 70%, transparent 10%);
  }
  .purple{
    background:linear-gradient(to top, white 20% ,#BDBDFF 70% , white 20%);
  }
  button{
    color: #2d2d9c;
    font-weight: 600;
    margin-left: -0.5vw;
  }
}
`
const Right = styled.div`
  flex: 1;
  .black {
    height: 100%;
    width: 100%;
    background-color: #F5F4E1;
    border-radius: 0 30px 30px 0;
    .text {
      color: #333;
      font-size: 3rem;
      text-align: center;
      margin-left: 1vw;
      margin-bottom: 10vh;
    }
  }
  img {
    margin-left: 6vw;
    margin-top: 2vh;
    height: 35vh;
    width: 30vw;
  }
  `;

const Cards = styled.div`
  width: 85vw;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin: auto;
  padding-bottom: 50px;
  .cards{
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }
`
const Card = styled.div`
  margin-top: 7vh;
  height: 20vw;
  width: 20vw;
  .name{
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
  }
  img{
    height: 18vw;
    width: 18vw;
    border-radius: 20px;
    opacity: 0.7;
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    &:hover{
      transform: translateY(-5px);
      opacity: 1;
    } 
  }
  .choice{
    opacity: 1;
    border: 5px solid #6225E6  ;
  }
  margin-right: 2vw;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 5vw;
  
`
interface Istate{
  item:
    {
      "favorite": boolean,
      "productAuctionEndTime": string,
      "productCode": number,
      "productDesc": string,
      "productFavoriteCount": number,
      "productFileUrl": string,
      "productId": number,
      "productPrice": number,
      "productRegDt": string,
      "productState": number,
      "productThumbnailUrl": string,
      "productTitle": string,
      "tokenId": number,
      "userId": number
    }
}
const Character = () => {
  const [userId,setUserId] = useState(Number(sessionStorage.getItem('userId')||""))
  const [items,setItems] = useState<Istate['item'][]>([])
  const [myChar,setMyChar] = useState('')
  const navigate = useNavigate()
  const getsave = ()=>{
    changeCharacter.mutate()
  }

  const { isLoading:ILS, data:everyitems } = useQuery<any>(
    "getSellProduct",
    async () => {return (await (getUsercollectedInfo(userId)))
      },
    {
      onSuccess:(res)=>{ 
      setItems(res.content.filter((item)=> item.productCode===7))
      },
      onError: (err: any) => {}
      }
  );

  const CharacterGet = useMutation<any, Error>(
    "getCharacter",
    async () => {
      return await getCharacter(userId);
    },
    {
      onSuccess: (res) => {
        if(res.myRoomCharacter===null){
          setMyChar('1')
        }
        else{setMyChar(res.myRoomCharacter)}
      },
      onError: (err: any) => {
      },
    }
  );
  
  const changeCharacter = useMutation<any, Error>(
    "putCharacterChange",
    async () => {
      return await putCharacterChange(String(myChar));
    },
    {
      onSuccess: (res) => {
        alert('캐릭터를 변경했습니다. '+ myChar )
        navigate('/')
      },
      onError: (err: any) => {
      },
    }
  );
  useEffect(()=>{
    CharacterGet.mutate()

  },[])
  useEffect(()=>{
  },[myChar])
  return (
    <Wrapper>
      <IntroBox>
        <Left>
          <div className='text'>
            <div className='h1'>Select Characters</div>
            <div className='h4'>Myroom에서<span className='blue'>NFT 캐릭터</span>를  사용해 보세요 </div>
            <div className='h4'> <span className='purple'>Store</span>에서 NFT 캐릭터를 구입하세요</div>
            <div className='h4'>개성있는 자신만의 캐릭터로 <span className='blue'> N-City</span>를 즐기세요</div>
            <div className='h4'><Button>상점으로 이동 </Button></div>
          </div>
        </Left>
        <Right>
          <div className='black'>
          <img alt='black' src='https://i.gifer.com/5QK.gif' /> 
          </div>
        </Right>
      </IntroBox>
      
      <h1 className='title'>내가 소유한 캐릭터 
        <Button onClick={()=>{getsave()}} className='save'  variant='contained' >저장하기</Button>
      </h1>
      <Cards>
        <div className='cards'>
        <Card onClick={()=>{setMyChar('1')}}>
          <img className={myChar==='1'? 'choice':''} alt='캐릭터' src={img1} />
          <div className='name'>NC보이</div>
        </Card>
        {everyitems&&
        items.map((item)=>{
          return( 
            <Card key={item.productId} onClick={()=>{setMyChar(item.productDesc.substring(9))}}>
            <img  className={myChar===item.productDesc.substring(9)? 'choice':''}  alt='캐릭터' src={item.productFileUrl} />
            <div className='name'>{item.productTitle}</div>
            </Card>
        )})}
        </div>
      </Cards>
    </Wrapper>
  )
}

export default Character
