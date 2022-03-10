import React from "react";
import styled from "styled-components";

//// style
const Wrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: "center";
  height: 100vh;
  width: 100vw;
`;

const H1 = styled.h1`
  font-size: 35px;
  margin-top: 10vh;
  margin-bottom: 10vh;
  text-align: center;
`
const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 4px solid black;
  border-radius: 15px;
  background-color: #FFF6F3;
  
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease-out;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
`

const CardTitle = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

//// component
const Apply = () => {
  const onClickInfluencer = () => {};
  const onClickDesigner = () => {};
  const onClickEnterprise = () => {};
  return (
    <Wrapper>
      <H1>유형을 선택해주세요</H1>
      <CardBox>
        <CardWrapper>
          <Card onClick={onClickInfluencer}>
            <Logo src="/essets/images/influencer_logo.png" alt="logo" />
          </Card>
          <CardTitle>인플루언서</CardTitle>
        </CardWrapper>
        <CardWrapper>
          <Card onClick={onClickDesigner}>
            <Logo src="/essets/images/designer_logo.png" alt="logo" />
          </Card>
          <CardTitle>디자이너</CardTitle>
        </CardWrapper>
        <CardWrapper>
          <Card onClick={onClickEnterprise}>
            <Logo src="/essets/images/enterprise_logo.png" alt="logo" />
          </Card>
          <CardTitle>기업</CardTitle>
        </CardWrapper>
      </CardBox>
    </Wrapper>
  );
}

export default Apply;