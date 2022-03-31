import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProductAll, getSellProduct } from '../../store/apis/product'
import { useMutation, useQuery } from 'react-query'
import ItemCard2 from '../../components/Card/ItemCard2'


const CategoryBar = styled.div`
  margin: auto;
  margin-top: 5vh;
  width: 70% ;
  display: flex;
  li{
    margin: auto;
  }
  p{
    font-size:2vh;
    font-weight:1000;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    text-align: center;
  }
  p::before{
    content: "";
    height: 5px;
    width: 0px;
    background-color: #272793;
    border-radius: 10px;
    transition: 0.3s;
    position: absolute;
    bottom: -0.5rem;
  }
  p:hover::before{
    width: 100%;
    background-color: #272793;
  }
  #category::before{
    width: 100%;
    background-color: #272793;
  }
`
const ItemCards = styled.div`
  margin: auto;
  width: 90vw ;
  display: flex ;
  flex-wrap: wrap ;
  &:last-child {
    margin-right: auto;
  }
`
const IntroBox = styled.div`
  width: 85vw;
  height: 50vh;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin: auto;
  margin-top: 10vh;
  display: flex;
  margin-bottom:10vh;

`
const Left = styled.div`
  flex: 1;
  .text{
    margin-left: 5vw;
    margin-top: 8vh;
  
  .h1{
    font-size: 8vh;
    margin-bottom: 5vh;
    font-weight: 600;
  }
  .h3{
    font-size: 3vh;
  }
  .h4{
    font-size : 2vh
  }
  .blue{
    background:linear-gradient(to top,transparent 10%,skyblue 70%, transparent 10%);
  }
  .purple{
    background:linear-gradient(to top, white 20% ,#BDBDFF 70% , white 20%);
  }
}
`
const Right = styled.div`
  flex: 1;
  .black {
    height: 100%;
    width: 100%;
    background-color: #030338;
    border-radius: 0 30px 30px 0;
    .text {
      color: white;
      font-size: 3rem;
      text-align: center;
      margin-left: 1vw;
      margin-bottom: 10vh;
    }
  }
  img {
    margin-left: 9vw;
    margin-top: 4vh;
    height: 60%;
    width: 60%;
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
  }
}
const FilterButton = styled.div`
`
const NFTStore = () => {
  const [filter,setFilter] = useState("all") 
  const [status,setStatus]  = useState('all')
  const [allitems,setAllitems] = useState([])
  const [saleitems,setSaleitems] = useState([])
    // 상품 정보 모두 가져오기
  const getAll = useMutation<any,Error>(
    "prouductAll",
    async () => {return (await (getProductAll({ page: 1, size: 1000 }) ))},
    { onSuccess:(res)=>{
      setAllitems(res.content)
    },
      onError: (err: any) => {console.log(err, "상품정보 가져오기 오류")},
    });
  const getSale = useMutation<any,Error>(
    "getSellProduct",
    async () => {return (await (getSellProduct()))
      },
    { 
      onSuccess:(res)=>{
        setSaleitems(res.content)
      },
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );
  useEffect(()=>{
    // 좋아요를 하고 status를 바꿔도 그대로인 오류...❌
    getAll.mutate()
    getSale.mutate()
  },[status])
  return (
    <>
      <IntroBox>
        <Left>
          <div className='text'>
            <div className='h3'>NFT Marketplace</div>
            <div className='h1'>N-city Store</div>
            <div className='h4'>N-city는 다양한 <span className='blue'>NFT 작품</span>들을 판매하고 있습니다. </div>
            <div className='h4'><span className='purple'>NCT 토큰</span>을 이용해 갤러리를 구경하고 거래할 수 있습니다. </div>
            <div className='h4'>물건을 구입해 <span className='blue'>마이룸</span>을 꾸미세요. </div>
          </div>
        </Left>
        <Right>
          <div className='black'>
          <img alt='black' src='https://i.gifer.com/7VA.gif' />            <div className='text'><p>N-city Store</p></div>
          </div>
        </Right>
      </IntroBox>
      <FilterButton>
        <button onClick={()=>{setStatus('all')}}>모든 상품</button>
        <button onClick={()=>{setStatus('sale')}}>판매중</button>
      </FilterButton>
      <CategoryBar>
        <li>
          <p id={filter === "all" ? "category" : ""} onClick={() => {setFilter("all")}}>
            All
          </p>
        </li>
        <li>
          <p id={filter === "art" ? "category" : ""} onClick={() => {  setFilter("art")}}>
            Art
          </p>
        </li>
        <li>
          <p id={filter === "music" ? "category" : ""} onClick={() => {  setFilter("art")}}>
            Art
          </p>
        </li>
        <li>
          <p id={filter === "photography" ? "category" : ""} onClick={() => {  setFilter("art")}}>
            Art
          </p>
        </li>
      </CategoryBar>
        <ItemCards>
          {status==='all' && allitems &&
          (allitems).map((item,idx) => {
          return(
            <ItemCard2 key={idx} item={item} />
            )
          })}
          {status==='sale' && saleitems &&
          (saleitems).map((item,idx) => {
          return(
            <ItemCard2 key={idx} item={item} />
            )
          })}
        </ItemCards>
      </>
  );
}

export default NFTStore
