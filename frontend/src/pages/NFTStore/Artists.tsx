import React, { useState } from 'react'
import ArtistCard from '../../components/Card/ArtistCard'
import styled from 'styled-components'
import { artists as art } from './items'

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
  width: 95vw ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content: center;
 
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
const IntroBox = styled.div`
  width: 88vw;
  height: 50vh;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  margin: auto;
  margin-top: 10vh;
  border-radius: 30px;
  display: flex;
  margin-bottom:15vh;
`
const Left = styled.div`
  flex: 1;
  .black {
    height: 100%;
    width: 100%;
    background-color: #272627;
    border-radius: 30px 0 0 30px;
    .text {
      color: white;
      font-size: 3rem;
      text-align: center;
      margin-left: 1vw;
      margin-bottom: 10vh;
    }
  }
  img {
    margin-left: 12vw;
    margin-top: 4vh;
    height: 60%;
    width: 45%;
  }
  
`
const Right = styled.div`
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
`;


export interface IState{
  user:{
    "authId": Number,
    "followeeCnt": Number,
    "followerCnt": Number,
    "userAddress": String,
    "userDescription": String,
    "userEmail": String,
    "userEmailConfirm": Boolean,
    "userId": Number,
    "userImgUrl": String,
    "userNick": String,
    "userRole": String
  }[]
}



const Artists = () => {
  const [users,setUsers] = useState<IState["user"]>(art)
  const [status,setStatus] = useState("all")

  return (
    <div>
      <IntroBox>
        <Left>
        <div className='black'>
          {/* <img alt='black' src='https://i.gifer.com/QGA.gif' /> */}
          <img alt='black' src='https://i.gifer.com/BKfh.gif' />
            <div className='text'><p>N-city Store</p></div>
          </div>
        </Left>
        <Right>
        <div className='text'>
            <div className='h3'>NFT Marketplace</div>
            <div className='h1'>Artists</div>
            <div className='h4'>N-city는 다양한 <span className='blue'>NFT 작품</span>들을 판매하고 있습니다. </div>
            <div className='h4'><span className='purple'>NCT 토큰</span>을 이용해 갤러리를 구경하고 거래할 수 있습니다. </div>
            <div className='h4'>물건을 구입해 <span className='blue'>마이룸</span>을 꾸미세요. </div>
          </div>
          
        </Right>
      </IntroBox>
      {/* <ColorBar>
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
      </ColorBar> */}
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
      {/* <FilterBar>
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
      </FilterBar> */}

      <ArtistCards>
        {users.map((user,idx) => {
          return <ArtistCard key={idx} user={user} />;
        })}
      </ArtistCards>
    </div>
  );
}

export default Artists