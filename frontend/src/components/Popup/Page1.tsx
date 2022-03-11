import React from "react";
import styled from "styled-components";

const oneWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const BlockContent = styled.div`
  width: 100%;
  height: 90%;
  background-color: #f2dbdb;
`;

const BlockFooter = styled.div`
  width: 100%;
  height: 10%;
  background-color: pink;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .one {
    width: 40%;
    height: 100%;
    color: black;
  }

  .two {
    width: 60%;
    height: 700px;
    color: green;
    img {
      width: 45.5vw;
      position: absolute;
      top: 10%;
      right: 6%;
    }
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 5%;
  right: 20%;
  width: 39vw;
  height: 78.5vh;
  border-radius: 50%;
  background-color: #faebeb;
  margin: 0%;
`;

const ImgBox = styled.div`
  width: 30vw;
  height: 30vh;
  background-color: gray;
  position: absolute;
  top: 16.6%;
  right: 15.5%;
`;

const BottomWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomCircle = styled.div`
  width: 1.5vw;
  height: 3vh;
  background-color: gray;
  border-radius: 50%;
  margin: 20px;
`;

const Page1 = () => {
  return (
    <>
      <BlockContent>
        <MainContent>
          <div className="one">
            <h1>N-City</h1>
            <h2>세상 모든 NFT를 색다르게</h2>
            <h3>다양한 사람들과 만나며</h3>
            <h3>NFT 커뮤니티 서비스를 통해</h3>
            <h3>자신만의 공간을가져보세요!</h3>
            <button>N-City로 여행가기</button>
          </div>
          <div className="two">
            <Circle></Circle>
            <img src="essets/images/moniter.png" alt="사진없노"></img>
            <ImgBox></ImgBox>
          </div>
        </MainContent>
      </BlockContent>
      <BlockFooter>
        <BottomWrapper>
          <BottomCircle></BottomCircle>
          <BottomCircle></BottomCircle>
          <BottomCircle></BottomCircle>
        </BottomWrapper>
      </BlockFooter>
    </>
  );
};

export default Page1;
