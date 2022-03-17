import React, { useState } from 'react'
import styled from 'styled-components'
import ItemCard from '../../components/Card/ItemCard'
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
  const [items,setItems] = useState<IState["item"]>([
    {id:1,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305'},
    {id:2,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
    {id:3,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300'},
    {id:4,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/EdzzR4e6tc8jtOsRZ7T5-d9ejmy6r7zyulAjw4D-XlNMNISRPAwYXpVLOmj_dL-gWme69VvlDBj_EsXit8jwSFPjS_oFvgcjmo-Z=w328'},
    {id:5,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qeCj7NRekCZ9BUjM8c9Pk02DxmPgX483qgEkVJeLXYIDOFVTXAfCg8TTztcMMQPgYFsNDUqndF5asWPCgJVpiM6P39VzpWa3TTKrvg=w300'},
    {id:6,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/jWonBwIV3RRzCv2xEu3pKA5buXUne_vnltLcLIfnluPuctdbTd-ScsBO94-njkA2L5VHVRA56CG5tbbxwacCvFdFWaZzuIJNUB1sVCA=w300'},
    {id:7,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
    {id:8,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/jc4P6pZhiNsBNxErAilpkx-d3RZDpNpJbYjs2k5nou29DJGe_r27tu2i0xy0KBOIgHaQhgVOqIF4-aLpjIqLV6eo-IsIUQ98VI_jDw=w300'},
    {id:9,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
    {id:10,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
    {id:11,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/BqScg3QwKPcNW_cxtvBws2D2cE8Us-QsN9yYmB_8UzUikBwLfOC5Nc2JgXWOB2ijx4lAU2KcYplGujimb2FUD9ArixBFeCyNPcES=w352'},
    {id:12,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/OjwqOOt3_po4pPlTYg43Us9_pp4Ji9X8JKZY4aCsjzHISKQL-u2oSX_q4NmK5qZZn5PPYfMCpDS8OKFXBzXzXA6ljfWfaxGdEvc8DA=w300'},
  ])
 
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
