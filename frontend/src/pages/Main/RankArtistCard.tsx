import React from "react";
import styled from "styled-components";

const RankCardWrapper = styled.div`
  position: relative;
  width: 410px;
  height: 300px;
  background-color: #f6f6f7;
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
  background-color: white;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  .container1 {
    width: 100%;
    height: 65%;
    display: flex;
    flex-direction: row;
  }

  .container2 {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    .status {
      width: 143px;
      display: flex;
      flex-direction: row;
      #set {
        color: #12abdc;
        font-size: 14px;
        margin-left: 13px;
      }

      #data {
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }

  #profileImg {
    width: 125px;
    height: 125px;
    object-fit: fill;
    border-radius: 10px;
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
      font-weight: 1000;
    }

    p {
      margin: 0px;
      font-size: 15px;
    }
  }
`;

const MusicDiv = styled.div`
  width: 400px;
  height: 65px;
  margin: 5px auto;
  font-size: 15px;
  background-color: white;
  display: flex;
  border-radius: 10px;
  align-items: center;
  .box {
    width: 240px;
    overflow: hidden;
    margin-left: 10px;
    cursor: pointer;
  }
  .musicInfo {
    font-size: 15px;
    font-weight: 700;
    color: black;
    width: 240px;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    animation: filter 5s linear infinite;
  }

  .bgm {
    font-size: 20px;
    color: #12abdc;
    cursor: pointer;
  }
  @keyframes filter {
    to {
      transform: translateX(-300px);
      filter: hue-rotate(0);
    }
    from {
      transform: translateX(300px);
      filter: hue-rotate(360deg);
    }
  }
`;

const NextIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 90px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
`;

const PlayIcon = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z'/%3E%3C/svg%3E");
`;

const TodayInformationDiv = styled.div`
  width: 400px;
  height: 65px;
  background-color: #129fce;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  p {
    font-size: 10px;
    color: white;
    margin: 5px;
  }

  h5 {
    font-size: 12px;
    color: #f2c953;
    margin: 2px;
  }

  h4 {
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

const RankArtistCard = () => {
  return (
    <RankCardWrapper>
      <RankCardDiv>
        <TitleCardDiv>
          <div className="container1">
            <img
              id="profileImg"
              src="essets/images/charicter.png"
              alt="사진없노"
            ></img>
            <div id="explain">
              <h1>싸피</h1>
              <p>NFT를 통해</p>
              <p>당신만의 공간을 꾸며보아요!</p>
            </div>
          </div>
          <div className="container2">
            <div className="status">
              <div id="set">Today is..</div>
              <div id="data">🎀</div>
            </div>
            <div className="status">
              <div id="set">followers</div>
              <div id="data">9,999</div>
            </div>
            <div className="status">
              <div id="set">즐겨찾기</div>
              <div id="data">9,999</div>
            </div>
          </div>
        </TitleCardDiv>
        <TodayInformationDiv></TodayInformationDiv>
      </RankCardDiv>
    </RankCardWrapper>
  );
};

export default RankArtistCard;
