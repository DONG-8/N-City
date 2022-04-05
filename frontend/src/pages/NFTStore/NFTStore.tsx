import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProductAll, getSellProduct } from '../../store/apis/product'
import { useMutation, useQuery } from 'react-query'
import ItemCard2 from '../../components/Card/ItemCard2'
import ItemCard from '../../components/Card/ItemCard'
import ToggleSwitch from './ToggleSwitch'
import ToggleSwitch2 from './ToggleSwitch2'
import IsLoading2 from './IsLoading2'
import IsLoading from './IsLoading'
import StoreItemCard from '../../components/Card/StoreItemCard'

const Wrapper = styled.div`
  .loading{
    text-align: center;
    font-size: 2.5vh;
    font-weight: 600;
    margin-top: -5vh;
  }

`

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
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    text-align: center;
  }
  p::before{
    content: "";
    height: 5px;
    width: 0px;
    background-color: #6225E6  ;
    border-radius: 10px;
    transition: 0.3s;
    position: absolute;
    bottom: -0.5rem;
  }
  p:hover::before{
    width: 100%;
    background-color: #6225E6  ;
  }
  #category::before{
    width: 100%;
    background-color: #6225E6;
  }
`
const ItemCards = styled.div`
  margin: auto;
  width: 90vw ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content: center;
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
  margin-bottom:5vh;

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

const FilterButton = styled.div`
display: flex;
justify-content: end;
margin-right:10vw;
.toggle{
  margin-left: 3vw;
}
.name{
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
}

`
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
    userRole: string
  }
}
const NFTStore = () => {
  const [filter,setFilter] = useState(0) 
  const [status,setStatus]  = useState(false)
  const [order,setOrder]  = useState(false)
  const [allitems,setAllitems] = useState([])
  const [saleitems,setSaleitems] = useState([])
  const [showItems,setShowItems] = useState<any[]>([])
  const [showSales,setShowSales] = useState<any[]>([])
    // 상품 정보 모두 가져오기
  const getAll = useMutation<any,Error>(
    "prouductAll",
    async () => {return (await (getProductAll({ page: 1, size: 1000 }) ))},
    { onSuccess:(res)=>{
      console.log(res)
      setAllitems(res.content)
      setShowItems(res.content)
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
        setShowSales(res.content)
      },
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );

  const getFilter = (num)=>{
    if (num===0){
      setShowItems(allitems)
      setShowSales(saleitems)
    }
    else{
      let items: Istate["item"][] = [];
      allitems.map((item: Istate["item"]) => {
        if (item.productCode === num) {
          items.push(item);
        }
      });
      setShowItems(items);

      let sales: Istate["item"][] = [];
      saleitems.map((item: Istate["item"]) => {
        if (item.productCode === num) {
          sales.push(item);
        }
      });
      setShowSales(sales);
    }
  }

  useEffect(()=>{
    // 좋아요를 하고 status를 바꿔도 그대로인 오류...❌
    getAll.mutate()
    getSale.mutate()
  },[status])

  useEffect(()=>{
    console.log('필터 함수!!!!!!!!')
    getFilter(filter)
  },[filter])



  return (
    <Wrapper>
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
      {allitems.length>0 &&
      <>
        <FilterButton>
          <div className='toggle'>
            {status?<div className='name'>판매하는</div >:<div className='name'>모든물품</div>}
            <ToggleSwitch2 status={status} setStatus={setStatus}/>
          </div>
          <div className='toggle'>
            {order?<div className='name'>오래된</div>:<div className='name'>최신순 </div>}
            <ToggleSwitch order={order} setOrder={setOrder}/>
          </div>
        </FilterButton>
      <CategoryBar>
        <li>
          <p id={filter === 0 ? "category" : ""} onClick={() => {setFilter(0)}}>
            All
          </p>
        </li>
        <li>
          <p id={filter === 1 ? "category" : ""} onClick={() => {  setFilter(1)}}>
          Music
          </p>
        </li>
        <li>
          <p id={filter === 2 ? "category" : ""} onClick={() => {  setFilter(2)}}>
          Picture
          </p>
        </li>
        <li>
          <p id={filter === 3 ? "category" : ""} onClick={() => {  setFilter(3)}}>
          Video
          </p>
        </li>
        <li>
          <p id={filter === 4 ? "category" : ""} onClick={() => {  setFilter(4)}}>
          Art
          </p>
        </li>
        <li>
          <p id={filter === 5 ? "category" : ""} onClick={() => {  setFilter(5)}}>
          Celebrity
          </p>
        </li>
        <li>
          <p id={filter === 6 ? "category" : ""} onClick={() => {  setFilter(6)}}>
          Sports
          </p>
        </li>
        <li>
          <p id={filter ===7 ? "category" : ""} onClick={() => {  setFilter(7)}}>
          Character
          </p>
        </li>
        <li>
          <p id={filter === 8 ? "category" : ""} onClick={() => {  setFilter(8)}}>
          Animation
          </p>
        </li>
      </CategoryBar>
      </>
      }
          {allitems.length===0 &&
          <>
          <IsLoading2/>
          <div className='loading'>Loading..</div>
          </>}
        <ItemCards>
          {!status && showItems && !order&&
          ([...showItems].reverse()).map((item,idx) => {
          return(
            <StoreItemCard key={idx} item={item} />
            )
          })}
          {!status && showItems && order&&
          showItems.map((item,idx) => {
          return(
            <StoreItemCard key={idx} item={item} />
            )
          })}
          {status && showSales && !order&&
          ([...showSales].reverse()).map((item,idx) => {
          return(
            <StoreItemCard key={idx} item={item} />
            )
          })}
          {status && showSales && order&&
          showSales.map((item,idx) => {
          return(
            <StoreItemCard key={idx} item={item} />
            )
          })}
        </ItemCards>
      </Wrapper>
  );
}

export default NFTStore
