import React, { useState } from 'react'
import styled from 'styled-components'
import ItemCard from '../../components/Card/ItemCard'
import { items as itm } from './items'
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
    font-size:3vh;
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
    background-color: #F43B00;
    border-radius: 10px;
    transition: 0.3s;
    position: absolute;
    bottom: -0.5rem;
  }
  p:hover::before{
    width: 100%;
    background-color: #F43B00;
  }
  #category::before{
    width: 100%;
    background-color: #F43B00;
  }
`
const ItemCards = styled.div`
  margin:auto ;
  width: 90% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`

export interface IState{
  item :{
    id:number,
    name:string,
    title:string,
    price:number,
    liked:number,
    url:string
  }[]
}
const NFTStore = () => {
  const [items,setItems] = useState(itm)
  const [filter,setFilter] = useState("all")
  return (
    <>
      <ColorBar>
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
      </ColorBar>
      <Title>
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
      </Title>
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
      <ItemCards>
        {items.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
      </ItemCards>
    </>
  );
}

export default NFTStore
