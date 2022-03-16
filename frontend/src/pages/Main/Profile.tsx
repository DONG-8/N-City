import React from "react";
import styled from "styled-components";

const SubBannerWrraper = styled.div`
  position: relative;
  width: 430px;
  height: 510px;
  margin: -400px auto 0 10px;
`;

const SubBanner = styled.div`
  width: 430px;
  height: 509px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  z-index: 0;
  background-color: #f6f6f7;
  .inner {
    width: 448px;
  }
  .inner img {
    width: 100%;
    height: 280px;
    /* height: 100%; */
    object-fit: cover;
  }
`;

const TodayInformationDiv = styled.div`
  width: 400px;
  height: 65px;
  background-color: #129fce;
  margin: 0 auto;
  margin-top: 15px;
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

const TextDiv = styled.div`
  width: 400px;
  height: 30px;
  margin: 15px auto;
  font-size: 17px;
  font-weight: 1000;
  color: black;
  text-align: center;
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
  }

  .container2 {
    width: 100%;
    height: 35%;
  }

  #profileImg {
    width: 50px;
    height: 50px;
    object-fit: fill;
    border-radius: 10px;
  }

  #explain {
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
`;

const LoginDiv = styled.div`
  width: 400px;
  height: 65px;
  margin: 5px auto;
  font-size: 15px;
  background-color: #00b1bc;
  display: flex;
  border-radius: 10px;
`;

const Profile = () => {
  return (
    <SubBannerWrraper>
      <SubBanner>
        <TodayInformationDiv>
          <h1>TODAY</h1>
          <h5>999,999</h5>
          <p>|</p>
          <p>TOTAL</p>
          <h4>999,999</h4>
        </TodayInformationDiv>
        <TextDiv>당신을 위한 공간 N-City에 오신것을 환영합니다.</TextDiv>
        <TitleCardDiv>
          <div className="container1">dd</div>
          <div className="container2">dd</div>
        </TitleCardDiv>
        <MusicDiv></MusicDiv>
        <LoginDiv></LoginDiv>
      </SubBanner>
    </SubBannerWrraper>
  );
};

export default Profile;
