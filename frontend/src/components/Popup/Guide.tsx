import React from "react";
import styled from "styled-components";
import GuideSlide from "./GuideSlide";
import HotArtistSlide from "./HotArtistSlide";
import HotRoomSlide from "./HotRoomSlide";
import SmallSlide from "./SmallSlide";

const InnreContent = styled.div`
  width: 1500px;
  height: 500px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  margin: 50px auto;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
  margin-left: 10px;
`;
const FlexBox2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0px;
  justify-content: space-between;
  margin-left: 10px;
  margin-top: 40px;
`;

const InnerFlexBox = styled.div`
  width: 456px;
  height: 400px;
  /* background-color: gray; */
`;

const ShopIcon = styled.div`
  width: 350px;
  height: 100px;
  /* background-color: yellow; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

const SubText = styled.div`
  width: 420px;
  height: 100px;
  /* background-color: red; */
  font-size: 30px;
  /* font-family: "DungGeunMo"; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Guide = () => {
  return (
    <InnreContent>
      <FlexBox>
        <InnerFlexBox>
          <SubText>
            <h3>Hot Room</h3>
          </SubText>
          <HotRoomSlide/>
        </InnerFlexBox>

        <InnerFlexBox>
          <SubText>
            <h3>Hot Citizen</h3>
          </SubText>
          <HotArtistSlide/>
        </InnerFlexBox>

        <InnerFlexBox>
          <SubText>
            <h3>Guide</h3>
            <h1>+</h1>
          </SubText>
          <GuideSlide/>
        </InnerFlexBox>
      </FlexBox>
      <FlexBox2>
        <ShopIcon>
            <img src="essets/images/방문.png" alt="" />
            <h4>
              다른 사람의 방이 궁금하다면?
              <br />
              <br />방 구경하러 가기
            </h4>
          </ShopIcon>
        <ShopIcon>
          <img src="essets/images/경매장.png" alt="" />
          <h4>
            더 다양한 물품들을 만나보세요
            <br />
            <br />
            경매장
          </h4>
        </ShopIcon>
        <ShopIcon>
          <img src="essets/images/거래소.png" alt="" />
          <h4>
            구매하고싶은 작품이 있다면?
            <br />
            <br />
            거래소
          </h4>
        </ShopIcon>
        
      </FlexBox2>
    </InnreContent>
  );
};

export default Guide;
