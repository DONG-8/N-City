import React, { useState } from 'react'
import styled from 'styled-components'
import ItemCard from '../../components/Card/ItemCard'
import { items as itm } from './items'
import { getProductAll } from '../../store/apis/product'
import { useQuery } from 'react-query'
import ItemCard2 from '../../components/Card/ItemCard2'

const Title = styled.div`
  display:flex ;
  justify-content:space-around;
  h1{
    font-size: 4rem;
  }
  p{
    margin-top: 10vh;
    font-weight: 1000 ;
    font-size: 1.5rem;
  }
  margin-bottom: 0;
`
const ColorBar = styled.div`
  margin: auto;
    margin-top:0;
    width: 100vw ;
  
  
  img{
    margin: auto;
    width: 100vw ;
    height: 20vh;
    object-fit: cover;
  }
  .all{
    object-position:10% 10%;
  }
  .art{
    object-position:70% 70%;
  }
  .music{
    object-position:70% 70%;
  }
  .photography{
    object-position:40% 40%;
  }
  .sports{
    object-position:90% 90%;
  }
  .game{
    object-position:60% 60%;
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

export interface IState{
  item :{
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productRegDt:Object,
    productFavorite: Number,
    productCode: Number,
  }[]
}
const NFTStore = () => {
  const [filter,setFilter] = useState("all")
  // 상품 정보 모두 가져오기
  const [items,setItems] = useState(itm)
  // const { isLoading, data:items } = useQuery<any>(
  //   "query-prouductAll",
  //   async () => {return (await getProductAll({ page: 1, size: 1000 }))
  //   },
  // );
  return (
    <>
      {/* <ColorBar>
        {filter === "all" && (
          <img className="all" src="essets/images/오로라.jpg" alt="bg" />
        )}
        {filter === "art" && (
          <img className="art" src="essets/images/art.jpg" alt="bg" />
        )}
        {filter === "music" && (
          <img className="music" src="essets/images/music.jpg" alt="bg" />
        )}
        {filter === "photography" && (
          <img className="photography" src="essets/images/photography2.jpg" alt="bg" />
        )}
        {filter === "sports" && (
          <img className="sports" src="essets/images/sports.jpg" alt="bg" />
        )}
        {filter === "game" && (
          <img className="game" src="essets/images/game.jpg" alt="bg" />
        )}
      </ColorBar> */}
      {/* <Title>
        <h1>Store</h1>
        <div>
          <p>
            소지금 : 356,321
            <img
              alt="💎"
              style={{ height: "2.2vh" }}
              src="essets/images/ethereum.png"
            />
          </p>
        </div>
      </Title> */}
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
      <CategoryBar>
        <li>
          <p
            id={filter === "all" ? "category" : ""}
            onClick={() => {
              setFilter("all");
            }}
          >
            All
          </p>
        </li>
        <li>
          <p
            id={filter === "art" ? "category" : ""}
            onClick={() => {
              setFilter("art");
            }}
          >
            Art
          </p>
        </li>
        <li>
          <p
            id={filter === "music" ? "category" : ""}
            onClick={() => {
              setFilter("music");
            }}
          >
            Music
          </p>
        </li>
        <li>
          <p
            id={filter === "photography" ? "category" : ""}
            onClick={() => {
              setFilter("photography");
            }}
          >
            Photography
          </p>
        </li>
        <li>
          <p
            id={filter === "sports" ? "category" : ""}
            onClick={() => {
              setFilter("sports");
            }}
          >
            Sports
          </p>
        </li>
        <li>
          <p
            id={filter === "game" ? "category" : ""}
            onClick={() => {
              setFilter("game");
            }}
          >
            Game
          </p>
        </li>
      </CategoryBar>
        {/* {isLoading ? <div>로딩중</div>: 
            <>
          {items ?
            <ItemCards>
            {(items.content).map((item,idx) => {
              return(
                <ItemCard key={idx} item={item} />
                )
              })}
            </ItemCards> 
            :<></>} </>} */}
            <ItemCards>
             {(items).map((item,idx) => {
              return(
                <ItemCard2 key={idx} item={item} />
                )
              })}
            </ItemCards>
      </>
  );
}

export default NFTStore
