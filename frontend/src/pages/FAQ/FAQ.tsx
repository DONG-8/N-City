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

const Title = styled.h1`
  font-size: 50px;
`


//component
export default function FAQ() {
  const Q1 = "Q. NFT가 무엇인가요 ?"
  const A1 = "A. NFT는 Not-Fungible Token 어쩌구 저쩌구 저쩌구 어쩌구 쏼라쏼라쏼라 쏼라쏼라 쏼라쏼라 쏼라쏼라쏼라쏼라 쏼라쏼라 쏼라쏼라쏼라쏼라 쏼라쏼라 쏼라쏼라 쏼라쏼라 쏼라쏼라쏼라쏼라쏼라쏼라 쏼라쏼라쏼라쏼라쏼라쏼라 쏼라쏼라 쏼라쏼라쏼라쏼라 쏼라쏼라쏼라쏼"

  const Q2 = "Q. 토큰 거래는 어떻게 하나요 ?"
  const A2 = "A. 우선 토큰을 충전 한 후에 거래소로 가서 어쩌구 저쩌구 ㅎㅎㅎㅎ"

  const Q3 = "Q. 동탁은 왜 잘생긴건가요 ?"
  const A3 = "A. 이 논제는 기원전 200년 전부터 꾸준히 제기되어왔지만 현재까지 답을 도출하지 못한 난제입니다."

  const Q4 = "Q. 로그인은 어떻게 하나요 ?"
  const A4 = "A. 저희 사이트에서는 Metamask로 생성한 계정을 통해 로그인 할 수 있습니다."

  return (
    <Container>
      <Title>FAQ</Title>
      <Accordion title={Q1} contents={A1}></Accordion>
      <Accordion title={Q2} contents={A2}></Accordion>
      <Accordion title={Q3} contents={A3}></Accordion>
      <Accordion title={Q4} contents={A4}></Accordion>
    </Container>
  );
}
