import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import { getProductCategori } from '../../store/apis/product';
import { getUsercollectedInfo } from '../../store/apis/user';
import img1 from './character1.png'
import img2 from './character2.png'
const Wrapper = styled.div`
  

`
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;

`
const Card = styled.div`
  height: 20vw;
  width: 20vw;
  img{
    height: 20vw;
    width: 20vw;
    border-radius: 20px;
    opacity: 0.8;
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    &:hover{
      transform: translateY(-5px);
      opacity: 1;
    } 
  }
  .choice{
    opacity: 1;
    border: 5px solid purple;
  }
  margin: 2vw;
  border-radius: 20px;
  cursor: pointer;
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
  const [userId,setUserId] = useState(Number(localStorage.getItem('userId')))
  const [characters,setCharacters ] = useState<Istate['item'][]>([])
  const [items,setItems] = useState<Istate['item'][]>([])
  const [myChar,setMyChar] = useState(1)
  const { isLoading:ILS, data:everyitems } = useQuery<any>(
    "getSellProduct",
    async () => {return (await (getUsercollectedInfo(userId)))
      },
    {
      onSuccess:(res)=>{ 
      setItems(res.content.filter((item)=> item.productCode===7))
      },
      onError: (err: any) => {console.log(err, "전체 nft 조회 실패")}
      }
  );
  useEffect(()=>{
    console.log(myChar)
  },[myChar])
  return (
    <Wrapper>
      <h1>내가 가진 캐릭터 </h1>
      <Cards>
        {everyitems !== undefined &&
        items.map((item,idx)=>{
          return( 
            <Card key={idx} onClick={()=>{setMyChar(Number(item.productDesc.substring(9)))}}>
            <img  className={myChar===idx+1? 'choice':''}  alt='캐릭터' src={item.productFileUrl} />
            </Card>
        )})}
        <Card onClick={()=>{setMyChar(4)}}>
          <img className={myChar===4? 'choice':''} alt='캐릭터' src={img1} />
        </Card>
        <Card>
          <img className={myChar===5? 'choice':''} alt='캐릭터' onClick={()=>{setMyChar(5)}} src={img2} />
        </Card>
      </Cards>
    </Wrapper>
  )
}

export default Character
