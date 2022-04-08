import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  background-color: #fddfd2;
  /* background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxODA1MjlfOCAg/MDAxNTI3NTcwODY5ODc5.iMrWUglAiT5Ik9ijZM0mSYL6KfPPpes8xaKQTUqvW0Ig.RT-Ki2uWaVl7HIAYXsdB1RO2P5pj5NvVyttt2fHRzL0g.GIF.rlfjrl24/%EB%B2%9A%EA%BD%83_%2810%29.gif?type=w800"); */
  background-size: 50%;
`;

const BlockContent = styled.div`
  width: 1500px;
  margin: 0 auto;
  min-width: 1340px;
  height: 100%;
  /* background-color: yellow; */
  display: flex;
  flex-direction: row;
`;

const TextContent = styled.div`
  width: 500px;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  /* text-align: center; */
  h1 {
    margin: 0px;
    font-size: 80px;
  }
  h2 {
    margin: 0;
    margin-top: 10px;
    font-size: 50px;
  }

  h3 {
    margin: 0;
    font-size: 50px;
  }

  button {
    width: 100%;
    height: 80px;
    /* margin: 120px auto 120px; */
    margin: 50px auto;
    /* border: solid 1px #ffaa98; */
    padding: 10px 50px;
    border-radius: 10px;
    font-size: 30px;
    background: linear-gradient(-45deg, #ffaa98, #fef0d3, #fddfd2, #ff9788);
    background-size: 400% 400%;
    /* animation: gradient 15s ease infinite; */
  }
`;

const ImageContent = styled.div`
  width: 1050px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 640px;
  height: 350px;
  background-color: gray;
  position: relative;
  background-image: url("essets/images/dote.gif");
  background-size: 100%;
  z-index: 1;
  /* border: black 5px solid; */
  top: -100px;
  left: 150px;
`;

const ImgBox2 = styled.div`
  z-index: 2;
  position: relative;
  width: 640px;
  height: 350px;
  /* background-color: yellow; */
  background-image: url("essets/images/login_background.png");
  background-size: 100%;
  top: 100px;
  left: -150px;
`;

const Page3 = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <Wrapper>
      <BlockContent>
        <ImageContent data-aos="zoom-in-up" data-aos-duration="1500">
          <ImgBox2></ImgBox2>
          <ImgBox></ImgBox>
        </ImageContent>
        <TextContent data-aos="zoom-out" data-aos-duration="1500">
          <h1>🎮 N-City의</h1>
          <h2>안전한 거래를 통해</h2>
          <h3>나만의 작품을</h3>
          <h3>가져보세요</h3>
          <button>N-City로 여행가기</button>
        </TextContent>
      </BlockContent>
    </Wrapper>
  );
};

export default Page3;
