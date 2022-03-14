import React from 'react';
import styled from "styled-components";
import Accordion from '../../components/FAQ/Accordion';

//style
const Container = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F8D9CE;
  width: 100%;
  height: 200px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`

const Title = styled.h1`
  margin: 80px 0;
  font-size: 50px;
`


//component
export default function FAQ() {
  const Q1 = "Q. NFT가 무엇인가요 ?"
  const A1 =
    "A. NFT는 Not-Fungible Token의 약자로 대체 불가능한 토큰을 의미합니다. NFT는 블록 체인에 저장된 데이터 단위이며 NFT는 암호화 토큰처럼 작동하지만 비트코인과 같은 암호 화폐와는 달리 상호 교환이 불가능합니다.\n NFT의 암호화 트랜잭션 프로세스는 NFT 소유권을 추적하는 데 사용되는 디지털 서명을 제공하여 각 디지털 파일의 인증을 보장합니다.\n 또한 NFT의 소유권은 디지털 자산에 대한 저작권을 부여하지 않습니다.\n 누군가 자신의 작품의 NFT를 판매할 수 있지만, NFT의 소유권이 변경될 때 구매자가 반드시 저작권 권한을 얻는 것은 아닙니다.";
  
  const Q2 = "Q. NFT 토큰 생성은 어떻게 하나요 ?"
  const A2 = "A. 우선 토큰을 충전 한 후에 거래소로 가서 어쩌구 저쩌구 ㅎㅎㅎㅎ"

  const Q3 = "Q. 동탁은 왜 잘생긴건가요 ?"
  const A3 = "A. 이 논제는 기원전 200년 전부터 꾸준히 제기되어왔지만 현재까지 답을 도출하지 못한 난제입니다."

  const Q4 = "Q. 로그인은 어떻게 하나요 ?"
  const A4 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q5 = "Q. 로그인은 어떻게 하나요 ?"
  const A5 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q6 = "Q. 로그인은 어떻게 하나요 ?"
  const A6 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q7 = "Q. 로그인은 어떻게 하나요 ?"
  const A7 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q8 = "Q. 로그인은 어떻게 하나요 ?"
  const A8 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q9 = "Q. 로그인은 어떻게 하나요 ?"
  const A9 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  const Q10 = "Q. 로그인은 어떻게 하나요 ?"
  const A10 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  return (
    <Container>
      <Header>
        <h1>무엇을 도와드릴까요?</h1>
      </Header>
      <Main>
        <Title>FAQ</Title>
        <Accordion title={Q1} contents={A1}></Accordion>
        <Accordion title={Q2} contents={A2}></Accordion>
        <Accordion title={Q3} contents={A3}></Accordion>
        <Accordion title={Q4} contents={A4}></Accordion>
        <Accordion title={Q5} contents={A5}></Accordion>
        <Accordion title={Q6} contents={A6}></Accordion>
        <Accordion title={Q7} contents={A7}></Accordion>
        <Accordion title={Q8} contents={A8}></Accordion>
        <Accordion title={Q9} contents={A9}></Accordion>
        <Accordion title={Q10} contents={A10}></Accordion>
      </Main>
    </Container>
  );
}
