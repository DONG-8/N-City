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

  return (
    <Container>
      <Title>FAQ</Title>
      <Accordion title="Q1. ㅇㄴㄹㄴㅇ" contents="fsd"></Accordion>
      <Accordion title="Q1. ㅇㄴㄹㄴㅇ" contents="fsd"></Accordion>
      <Accordion title="Q1. ㅇㄴㄹㄴㅇ" contents="fsd"></Accordion>
      <Accordion title="Q1. ㅇㄴㄹㄴㅇ" contents="fsd"></Accordion>
      <Accordion title="Q1. ㅇㄴㄹㄴㅇ" contents="fsd"></Accordion>
    </Container>
  );
}
