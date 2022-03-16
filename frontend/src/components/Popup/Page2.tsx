import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const Wrapper = styled.div`
  width: 100%;
  height: 900px;
  background-color: white;
  /* background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxODA1MjlfOCAg/MDAxNTI3NTcwODY5ODc5.iMrWUglAiT5Ik9ijZM0mSYL6KfPPpes8xaKQTUqvW0Ig.RT-Ki2uWaVl7HIAYXsdB1RO2P5pj5NvVyttt2fHRzL0g.GIF.rlfjrl24/%EB%B2%9A%EA%BD%83_%2810%29.gif?type=w800"); */
  background-size: 50%;
`;

const BlockContent = styled.div`
  width: 1500px;
  margin: 0 auto;
  min-width: 1340px;
  height: 100%;
  /* background-color: #f2dbdb; */
  display: flex;
  flex-direction: row;
`;

const TextContent = styled.div`
  width: 400px;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  text-align: center;
  h1 {
    margin: 0px;
    font-size: 80px;
  }
  h2 {
    margin-top: 10px;
    font-size: 50px;
  }

  h3 {
    margin: 3px;
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
    animation: gradient 15s ease infinite;
  }
`;

const ImageContent = styled.div`
  width: 1050px;
  height: 100%;
  /* background-color: white; */
`;

const Circle = styled.div`
  position: relative;
  top: -1100px;
  left: 300px;
  width: 600px;
  height: 600px;
  border-radius: 300px;
  /* background-color: #faebeb; */
  background-color: #fddfd2;
  /* margin: 0%; */
  z-index: 1;
`;

const ImgBox = styled.div`
  width: 640px;
  height: 350px;
  background-color: #fffbd8;
  position: relative;
  background-image: url("essets/images/dote.gif");
  background-size: 100%;
  z-index: 4;
  border: black 5px solid;
  top: -650px;
  left: 410px;
`;

const ImgBox2 = styled.div`
  z-index: 2;
  position: relative;
  width: 560px;
  height: 315px;
  /* background-color: yellow; */
  background-image: url("essets/images/login_background.png");
  background-size: 100%;
  top: -100px;
  left: 50px;
`;

const MoniterImg = styled.div`
  position: relative;
  width: 700px;
  height: 500px;
  background-size: 100%;
  z-index: 3;
  background-image: url("essets/images/moniter.png");
  top: 150px;
  left: 380px;
`;

const Page2 = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <Wrapper>
      <BlockContent>
        <TextContent data-aos="fade-up" data-aos-duration="1500">
          <h1>N-City </h1>
          <h2>세상 모든 NFT를 색다르게</h2>
          <h3>다양한 사람들과 만나며</h3>
          <h3>NFT 커뮤니티 서비스를 통해</h3>
          <h3>자신만의 공간을가져보세요!</h3>
          <button>N-City로 여행가기</button>
        </TextContent>
        <ImageContent data-aos="fade-up" data-aos-duration="1500">
          <MoniterImg></MoniterImg>
          <ImgBox2></ImgBox2>
          <ImgBox></ImgBox>
          <Circle></Circle>
        </ImageContent>
      </BlockContent>
    </Wrapper>
  );
};

export default Page2;
