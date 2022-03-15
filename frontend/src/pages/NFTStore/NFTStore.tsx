import React, { useState } from 'react'
import styled from 'styled-components'
import ArtistCard from '../../components/Card/ArtistCard'
import ItemCard from '../../components/Card/ItemCard'



const Title = styled.div`
  background-color: #F5E1DB ;
  display:flex ;
  justify-content:space-around;
  height: 20vh;
  h1{
    font-size: 3.5rem;
  }
  p{
    margin-top: 10vh;
    font-weight: 1000 ;
    font-size: 1.5rem;
  }
`
const FilterBar = styled.div`
  margin: auto;
  margin-top: 3vh;
  width: 70% ;
  display: flex;
  div{
    cursor:pointer;
    flex: 2.5;
    height: 6vh ;
    text-align:center ;
    &:hover{
      background-color: whitesmoke ;
      transition:0.3s ;
    }
    p{
      font-size:2.5vh ;
      margin-top : 1vh;
      font-weight: 1000 ;
    }
  }
  div{
    /* background-color: #F5B6A0; */
    border-bottom:2px solid #FF865B;
  }
  
  #select{
    background-color: white ;
    border-left: 2px solid #FF865B;
    border-right: 2px solid #FF865B;
    border-top:2px solid #FF865B;
    border-bottom: none;
    &:hover{
      background-color: #F9F9F9 ;
      transition:0.3s ;
    }
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
    background-color: salmon;
    border-radius: 10px;
    transition: 0.3s;
    position: absolute;
    bottom: -0.5rem;
  }
  p:hover::before{
    width: 100%;
    background-color: salmon;
  }
  #category::before{
    width: 100%;
    background-color: salmon;
  }
`
const ItemCards = styled.div`
  margin:auto ;
  width: 90% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`
const ArtistCards = styled.div`
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
  }[],
  artist :{
    name:string,
    profileImg:string,
    verified:boolean,
    sumnailImg:string,
    descreption:string
  }[],
}
const NFTStore = () => {
  const [items,setItems] = useState<IState["item"]>([
    {id:1,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305'},
    {id:2,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
    {id:3,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300'},
    {id:4,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/Cxb_lnNlgplYCULm_ZGlY9pCrxQ67GO2hmStVJTSEN3O2hNeIZoWyK3CwaCj-vZBxeQqioC-P1qT7cK6wXWc-WjjfUyjR3zXNwKN=w300'},
    {id:5,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qeCj7NRekCZ9BUjM8c9Pk02DxmPgX483qgEkVJeLXYIDOFVTXAfCg8TTztcMMQPgYFsNDUqndF5asWPCgJVpiM6P39VzpWa3TTKrvg=w300'},
    {id:6,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/jWonBwIV3RRzCv2xEu3pKA5buXUne_vnltLcLIfnluPuctdbTd-ScsBO94-njkA2L5VHVRA56CG5tbbxwacCvFdFWaZzuIJNUB1sVCA=w300'},
    {id:7,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
    {id:8,name:"Hong Hosus",title:"#Hong1535",price:1.24,liked:35,url:'https://lh3.googleusercontent.com/jc4P6pZhiNsBNxErAilpkx-d3RZDpNpJbYjs2k5nou29DJGe_r27tu2i0xy0KBOIgHaQhgVOqIF4-aLpjIqLV6eo-IsIUQ98VI_jDw=w300'},
    {id:9,name:"Giks Home",title:"#ghe23434",price:1.35,liked:43,url:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
    {id:10,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
    {id:11,name:"Giks Home",title:"#ghe254334",price:1.2,liked:24,url:'https://lh3.googleusercontent.com/BqScg3QwKPcNW_cxtvBws2D2cE8Us-QsN9yYmB_8UzUikBwLfOC5Nc2JgXWOB2ijx4lAU2KcYplGujimb2FUD9ArixBFeCyNPcES=w352'},
    {id:12,name:"Giks Home",title:"#g53434",price:1.37,liked:52,url:'https://lh3.googleusercontent.com/OjwqOOt3_po4pPlTYg43Us9_pp4Ji9X8JKZY4aCsjzHISKQL-u2oSX_q4NmK5qZZn5PPYfMCpDS8OKFXBzXzXA6ljfWfaxGdEvc8DA=w300'},
  ])
  const [artists,setArtists] = useState<IState["artist"]>([
    { name:"Happy Club ",
      sumnailImg:"https://lh3.googleusercontent.com/YCprgCsKKotONKjXCkJbiSWitAY_X5CrIfCMARxlsQ1d7ZkVwqxIXbBDqgpuVD7zt3B2eJxJkS6PYwcGuQUqSURlB1R_gk9Xqwdze-o=w352",
      profileImg:"https://lh3.googleusercontent.com/rPB_SZcWuxqlK5M6LpQdF_-4gm3ucQ4xuS7AMjgZJk1kseF2d20Q1GTsXPQs_aOyu8iyDpwKowjw1tw1XfyJbna5oeOSJz1n3LAEQZE=w352",
      verified:false,
      descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
      { name:"Happy Club ",
      sumnailImg:"https://lh3.googleusercontent.com/vALHImVEwEODQSOflhpMtBzFlcpFSLsx23Cl9RmeI_Kkjs55D3cqxZGpKevob-W8qXTEBw7NGbepY1MHSo8g-FpC1cgHteie-452=w352",
      profileImg:"https://lh3.googleusercontent.com/cxi2xFzMFTwzV9ooqyi5KR5ax8i4sce_1PdeLSyHIms8kTUrAih_tPtGGcslqhvB8yibvCZIIQsFrfDLq_76Hpqs72zwoo1F_bLC2Q=w352",
      verified:true,
      descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
      { name:"Happy Club ",
      sumnailImg:"https://lh3.googleusercontent.com/np9zjHHBCwZbx0026anZjJJ_9HY_StZYfD0-l_zmjrpGKS3ioB-eQ38vElOjuekV_mR411iwaK69mWW5y-4lRXOAPZOlUJ4xW4_Ayw=w352",
      profileImg:"https://lh3.googleusercontent.com/9HZDavtHY7rsjCgFlcBb3fz-nw8Zr4iHRSxjbpKSh8LNpZ2dHTHfdlRC1RRpAAkL4MnuKUCskykNx5zK0M87F1GLyCshn7G4fydlOA=w352",
      verified:false,
      descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
      { name:"Happy Club ",
      sumnailImg:"https://lh3.googleusercontent.com/lKO8Gswt-ZKxHMg6PK8caKuMhi2sW2Vp-f5ltxCi-N3hiODM3u0fbMQad-t5dockqy_Rfb5SAA0QItZgFuXsqAKGzCjWN22sqzeE=w352",
      profileImg:"https://lh3.googleusercontent.com/pDBXxExd4AV6RUTV5o9SbSoDMZZ7RX9oiv4RTJ4BXm9lBa2hwvog0bPTy19itnb-10OHXmOAWwvKUcCQFaucEkrAmfmz5WJuYaCd=w352",
      verified:true,
      descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
  ])
  const [status,setStatus] = useState("items")
  const [filter,setFilter] = useState("top")
  return (<>
    <Title>
      <h1>Store</h1>
      <div>
        <p>소지금 : 356,321<img alt="💎" style={{"height":"2.2vh"}} src="essets/images/ethereum.png"/></p> 
      </div>
    </Title>

    <FilterBar>
      <div className='allPicture' id={status==='items'?'select':""} onClick={()=>{setStatus("items")}}><p>전체작품</p></div>
      <div className='likePicture' id={status==='likePicture'?'select':""} onClick={()=>{setStatus("likePicture")}} ><p>관심있는 작품</p></div>
      <div className='allArtist' id={status==='artists'?'select':""} onClick={()=>{setStatus("artists")}}><p>전체 작가</p></div>
      <div className='followArtist' id={status==='followArtist'?'select':""} onClick={()=>{setStatus("followArtist")}}><p>팔로우한 작가</p></div>
    </FilterBar>

    <CategoryBar>
      <li><p id={filter==="top"?"category":""} onClick={()=>{setFilter("top")}}>TOP</p></li>
      <li><p id={filter==="art"?"category":""} onClick={()=>{setFilter("art")}}>Art</p></li>
      <li><p id={filter==="music"?"category":""} onClick={()=>{setFilter("music")}}>Music</p></li>
      <li><p id={filter==="photography"?"category":""} onClick={()=>{setFilter("photography")}}>Photography</p></li>
      <li><p id={filter==="sports"?"category":""} onClick={()=>{setFilter("sports")}}>Sports</p></li>
      <li><p id={filter==="game"?"category":""} onClick={()=>{setFilter("game")}}>Game</p></li>
    </CategoryBar>
    {status==="items" &&
    <ItemCards>
      {items.map(item=>{return(
        <ItemCard key={item.id} item={item} />)})}
    </ItemCards>}
    {status==="artists" &&
    <ArtistCards>
      {artists.map(artist=>{return(
        <ArtistCard key={artist.profileImg} artist={artist}/>
      )})}
    </ArtistCards>}
    </>
  )
}

export default NFTStore
