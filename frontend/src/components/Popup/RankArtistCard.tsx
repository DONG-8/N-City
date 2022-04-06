import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img1 from './image/character/1.png'
import img2 from './image/character/2.png'
import img3 from './image/character/3.png'
import img4 from './image/character/3.png'
import img5 from './image/character/3.png'
const charimg = {
  '1':img1,'2':img2,'3':img3,'4':img4,'5':img5
}

const RankCardWrapper = styled.div`
  position: relative;
  width: 410px;
  height: 300px;
  background-color: #f6f6f7;
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
  margin: 5px auto;
  font-size: 15px;
  background-color: #eaeafd;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  .container1 {
    /* background-color: #12abdc; */
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: row;
    .nickname{
      margin-top: 10px;
      margin-left: 20px;
      font-size: 1.2rem;
      color:#333;
      align-items: center;
    }
  }

  .container2 {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    .status {
      margin:auto;
      margin-top: 20px;
      width: 143px;
      display: flex;
      flex-direction: row;
      #set {
        color: #12abdc;
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
    width: 135px;
    height: 135px;
    object-fit: fill;
    border-radius: 10px;
    border: #12abdc   solid 1px;
  }

  #explain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;

    h1 {
      margin: 0px;
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
  /* background-color: #23afde; */
  background-color: #9191e8;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  &:hover{
    background-color: #9d9dee;
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
    myRoomCharacter: string;
    myRoomTodayCnt: number;
    myRoomTotalCnt: number;
    userId: number;
    userNick:string;
  }
}

const RankArtistCard:React.FC<Iprops>= ({user}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if (user.myRoomCharacter===null){
      setImgurl(img1)
    }
    else{
      setImgurl(charimg[user.myRoomCharacter])
    }
  },[])
  
  const [imgurl,setImgurl] = useState('')
  const goGame = ()=>{
    // ⭐⭐⭐⭐⭐⭐⭐⭐ api 요청
    navigate(`/ingame/${user.userId}`)
  }

  return (
    <RankCardWrapper>
      <RankCardDiv>
          {imgurl!=="" &&
        <TitleCardDiv>
          <div className="container1">
            <img
              id="profileImg"
              src={imgurl}
              alt="사진없노"
            ></img>
            <div className="nickname">
              <h1>{user.userNick}</h1>
            </div>
          </div>
          <div className="container2">
            <div className="status">
              <div id="set">Today</div>
              <div id="data">{user.myRoomTodayCnt}</div>
            </div>
            <div className="status">
              <div id="set">Total</div>
              <div id="data">{user.myRoomTotalCnt}</div>
            </div>
            {/* <div className="status">
              <div id="set">즐겨찾기</div>
              <div id="data">9,999</div>
            </div> */}
          </div>
        </TitleCardDiv>
        }
        <TodayInformationDiv onClick={()=>{goGame()}}
        ><div className="gobutton">{user.userNick} 방으로 이동하기</div></TodayInformationDiv>
      </RankCardDiv>
    </RankCardWrapper>
  );
};

export default RankArtistCard;
