import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img1 from './image/characters/character1.png'
import img2 from './image/characters/character2.png'
import img3 from './image/characters/character3.png'
import img4 from './image/characters/character4.png'
import img5 from './image/characters/character4.png'
const charimg = {
  '1':img1,'2':img2,'3':img3,'4':img4,'5':img5
}

const RankCardWrapper = styled.div`
  position: relative;
  width: 410px;
  height: 300px;
  /* background-color: #f6f6f7; */
  border-radius: 10px;

`;

const RankCardDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleCardDiv = styled.div`
  width: 400px;
  height: 200px;
  background-color: #e6e6ff;
  margin: 5px auto;
  font-size: 15px;
  display: flex;
  border-radius: 10px;
  /* flex-direction: column; */
  .container1 {
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: row;
  }

  .container2 {
    width: 100%;
    height: 20%;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    .nickname{
      font-size: 1.1rem;
      color:#333;
      align-items: center;
      margin: auto;
    }
    .status {
      margin:auto;
      margin-top: 20px;
      width: 143px;
      display: flex;
      flex-direction: row;
      #set {
        color: #030338 ;
        font-size: 14px;
        margin-left: 13px;
      }

      #data {
        color: #12abdc;
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }

  #profileImg {
    margin-top: 20px;
    margin-left: 10px;
    width: 160px;
    height: 160px;
    object-fit: fill;
    border-radius: 100%;
    border: #c4c1c1   solid 0.3px;
  }

  #explain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    text-align: center;
    h1 {
      margin-bottom: 20px;
      font-size: 25px;
      font-weight: 600;
    }

    p {
      margin: 0px;
      font-size: 15px;
    }
  }
`;


const TodayInformationDiv = styled.div`
  width: 400px;
  height: 65px;
  background-color: #9f9ff8 ;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  &:hover{
      background-color: #a9a9f2 ;
      transition: 0.1s;
  }
  p {
    margin-left:20px;
    font-size: 10px;
    color: white;
    margin: 5px;
  }
  .gobutton{
    margin-left:20px;
    font-size: 1.4rem;
    
  }
  h5 {
    font-size: 12px;
    color: #f2c953;
    margin: 2px;
  }

  h4 {
    margin-left:20px;
    font-size: 12px;
    color: white;
    margin: 0;
  }

  h1 {
    font-size: 10px;
    color: white;
    margin-left: 10px;
    margin-right: 5px;
  } 
`;
interface Iprops {
  user:{
    userFollowerCnt: number;
    userImgUrl: string;
    userId: number;
    userNick:string;
  }
}

const RankCitizen:React.FC<Iprops>= ({user}) => {  
  const [imgurl,setImgurl] = useState('')
  const imageOnErrorHandler = ( // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src ='data:image/png;base64,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';
  };
  const navigate = useNavigate()
  useEffect(()=>{
    if(user!==undefined){
    if(user.userImgUrl===null){
      setImgurl('data:image/png;base64,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')
    }
    else{setImgurl(user.userImgUrl)}}
  },[user])
  return (
    <RankCardWrapper>
      <RankCardDiv>
          {user!==undefined &&
        <TitleCardDiv>
          <div className="container1">
            <img
              onError={imageOnErrorHandler}
              id="profileImg"
              src={imgurl}
              alt="사진"
            />
          </div>
          <div className="container2">
            <div className="nickname">
              <h1>{user.userNick}</h1>
            </div>
            <div className="status">
              <div id="set">Follower</div>
              <div id="data">{user.userFollowerCnt}</div>
            </div>
          </div>
        </TitleCardDiv>
        }
        <TodayInformationDiv onClick={()=>{navigate(`/mypage/${user.userId}`)}}>
          <div className="gobutton">
            {user.userNick} 프로필로 이동하기
          </div>
        </TodayInformationDiv>
      </RankCardDiv>
    </RankCardWrapper>
  );
};

export default RankCitizen;
