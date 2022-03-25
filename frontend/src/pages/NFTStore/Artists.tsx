import React, { useState } from 'react'
import ArtistCard from '../../components/Card/ArtistCard'
import styled from 'styled-components'
import { artists as art } from './items'
import NewTokkenList from '../Main/NewTokkenList'
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
    height: 30vh;
    object-fit: cover;
  }
  .all{
    object-position:50% 50%;
  }
  .follow{
    object-position:20% 20%;
  }
  .influencer{
    object-position:50% 50%;
  }
  .artist{
    object-position:50% 50%;
  }
  .enterprise{
    object-position:70% 70%;
  }
  
  
`

const ArtistCards = styled.div`
  margin:auto ;
  width: 90vw ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`

const FilterBar = styled.div`
  margin: auto;
  margin-top: 3vh;
  width: 70% ;
  display: flex;
  margin-bottom:5vh;
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
    border-bottom:2px solid #F43B00;
  }
  
  #select{
    background-color: white ;
    border-left: 2px solid #F43B00;
    border-right: 2px solid #F43B00;
    border-top:2px solid #F43B00;
    border-bottom: none;
    color:#FF7248 ;
    &:hover{
      background-color: #F9F9F9 ;
      transition:0.3s ;
  
    }
  }
`

export interface IState{
  artist :{
    name:string,
    profileImg:string,
    verified:boolean,
    sumnailImg:string,
    descreption:string
  }[],
}



const Artists = () => {
  const [artists,setArtists] = useState<IState["artist"]>(art)
  const [status,setStatus] = useState("all")

  return (
    <div>
      <ColorBar>
        {status === "all" && (
          <img className="all" src="essets/images/오로라.jpg" alt="bg" />
        )}
        {status === "follow" && (
          <img className="follow" src="essets/images/오로라2.jpg" alt="bg" />
        )}
        {status === "influencer" && (
          <img className="influencer" src="essets/images/influencer.jpg" alt="bg" />
        )}
        {status === "artist" && (
          <img className="artist" src="essets/images/아티스트.jpg" alt="bg" />
        )}
        {status === "enterprise" && (
          <img
            className="enterprise"
            src="essets/images/나이키.jpeg"
            alt="bg"
          />
        )}
      </ColorBar>
      {/* <Title>
        <h1>Artists</h1>
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
      <FilterBar>
        <div
          id={status === "all" ? "select" : ""}
          onClick={() => {
            setStatus("all");
          }}
        >
          <p>전체작가</p>
        </div>
        <div
          id={status === "follow" ? "select" : ""}
          onClick={() => {
            setStatus("follow");
          }}
        >
          <p>관심작가</p>
        </div>
        <div
          id={status === "influencer" ? "select" : ""}
          onClick={() => {
            setStatus("influencer");
          }}
        >
          <p>인플루언서</p>
        </div>
        <div
          id={status === "artist" ? "select" : ""}
          onClick={() => {
            setStatus("artist");
          }}
        >
          <p>아티스트</p>
        </div>
        <div
          id={status === "enterprise" ? "select" : ""}
          onClick={() => {
            setStatus("enterprise");
          }}
        >
          <p>기업</p>
        </div>
      </FilterBar>

      <ArtistCards>
        <NewTokkenList/>
        {artists.map((artist) => {
          return <ArtistCard key={artist.profileImg} artist={artist} />;
        })}
      </ArtistCards>
    </div>
  );
}

export default Artists