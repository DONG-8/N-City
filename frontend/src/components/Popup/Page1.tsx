import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 900px;
  height: 100%;
  background-color: #f2dbdb;
  background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxODA1MjlfOCAg/MDAxNTI3NTcwODY5ODc5.iMrWUglAiT5Ik9ijZM0mSYL6KfPPpes8xaKQTUqvW0Ig.RT-Ki2uWaVl7HIAYXsdB1RO2P5pj5NvVyttt2fHRzL0g.GIF.rlfjrl24/%EB%B2%9A%EA%BD%83_%2810%29.gif?type=w800");
  background-size: 50%;
  /* background-position-y: -1000%; */
`;

const BlockContent = styled.div`
  width: 100%;
  min-width: 1340px;
  height: 90%;
  background-color: #f2dbdb;
`;

const BlockFooter = styled.div`
  width: 100%;
  min-width: 1340px;
  height: 10%;
  background-color: #f2dbdb;
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
    margin-left: 100px;
    h1 {
      margin-top: 100px;
      font-size: 100px;
    }

    h2 {
      margin-top: 10px;
      font-size: 30px;
    }

    button {
      margin: 120px 20px 120px;
      border: solid 1px #ffaa98;
      padding: 10px 50px;
      border-radius: 10px;
      background: linear-gradient(-45deg, #ffaa98, #fef0d3, #fddfd2, #ff9788);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
  }

  .two {
    width: 60%;
    min-width: 1320px;
    height: 50vh;
    color: green;
    img {
      width: 45.5vw;
      height: 72vh;
      position: absolute;
      top: 9.2%;
      right: 4%;
    }
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 5%;
  right: 15%;
  width: 700px;
  height: 700px;
  border-radius: 350px;
  background-color: #faebeb;
  margin: 0px;
`;

const ImgBox = styled.div`
  width: 400px;
  height: 250px;
  background-color: gray;
  position: absolute;
  top: 10%;
  right: 10%;
  background-image: url("essets/images/dote.gif");
  background-size: 100%;
`;

const ImgBox2 = styled.div`
  position: absolute;
  width: 33.5vw;
  height: 40vh;
  background-color: yellow;
  background-image: url("essets/images/login_background.png");
  background-size: 33.5vw;
  top: 35%;
  right: 35%;
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
      {/* <BlockContent>
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
            <ImgBox2></ImgBox2>
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
      </BlockFooter> */}
      <Wrapper></Wrapper>
    </>
  );
};

export default Page1;
