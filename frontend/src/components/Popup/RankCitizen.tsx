import React, { useEffect, useState } from "react";
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
  background-color: #ffffff;
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
    width: 160px;
    height: 160px;
    object-fit: fill;
    border-radius: 5px;
    border: gray   solid 1px;
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
    myRoomCharacter: string;
    myRoomTodayCnt: number;
    myRoomTotalCnt: number;
    userId: number;
    userNick:string;
  }
}

const RankCitizen:React.FC<Iprops>= ({user}) => {
  useEffect(()=>{
    if (user.myRoomCharacter===null){
      setImgurl(img1)
    }
    else{
      setImgurl(charimg[user.myRoomCharacter])
    }
  },[])
  
  const [imgurl,setImgurl] = useState('')
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
            />
          </div>
          <div className="container2">
            <div className="nickname">
              <h1>{user.userNick}</h1>
            </div>
            <div className="status">
              <div id="set">Follower</div>
              <div id="data">{user.myRoomTodayCnt}</div>
            </div>
          </div>
        </TitleCardDiv>
        }
        <TodayInformationDiv><div className="gobutton">{user.userNick} 프로필로 이동하기</div></TodayInformationDiv>
      </RankCardDiv>
    </RankCardWrapper>
  );
};

export default RankCitizen;
