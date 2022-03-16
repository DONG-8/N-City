import React, { useState } from 'react'
import ArtistCard from '../../components/Card/ArtistCard'
import styled from 'styled-components'

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
  .all{
    background-color: #FCD7CD ;
    height: 8vh;
  }
  .follow{
    background-color: #FCD7CD ;
    height: 8vh;
  }
  
  img{
    margin: auto;
    width: 100vw ;
    height: 30vh;
    object-fit: cover;
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
  
  const [status,setStatus] = useState("all")

  return (
    <div>
     
    <ColorBar>
        {status==='all' && <div className='all'/>}
        {status==='follow' && <div className='follow'/>}
        {status==='influencer' &&
        <img className='influencer' src="essets/images/인플.jpg" alt='bg'/>  }
        {status==='artist' &&
        <img className='artist' src="essets/images/아티스트.jpg" alt='bg'/>  }
        {status==='enterprise' &&
        <img className='enterprise' src="essets/images/나이키.jpeg" alt='bg'/>  }
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
      <div  id={status==='all'?'select':""} onClick={()=>{setStatus("all")}}><p>전체작가</p></div>
      <div  id={status==='follow'?'select':""} onClick={()=>{setStatus("follow")}} ><p>관심작가</p></div>
      <div  id={status==='influencer'?'select':""} onClick={()=>{setStatus("influencer")}}><p>인플루언서</p></div>
      <div  id={status==='artist'?'select':""} onClick={()=>{setStatus("artist")}}><p>아티스트</p></div>
      <div  id={status==='enterprise'?'select':""} onClick={()=>{setStatus("enterprise")}}><p>기업</p></div>
    </FilterBar>
      
    <ArtistCards>
      {artists.map(artist=>{return(
        <ArtistCard key={artist.profileImg} artist={artist}/>
      )})}
    </ArtistCards>
    </div>
  );
}

export default Artists