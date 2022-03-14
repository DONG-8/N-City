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
  font-size: 70px;
`


//component
export default function FAQ() {
  const Q1 = "NFT가 무엇인가요 ?"
  const A1 =
    "NFT는 Not-Fungible Token의 약자로 대체 불가능한 토큰을 의미합니다.\nNFT는 블록 체인에 저장된 데이터 단위이며 NFT는 암호화 토큰처럼 작동하지만 비트코인과 같은 암호 화폐와는 달리 상호 교환이 불가능합니다.\n\nNFT의 암호화 트랜잭션 프로세스는 NFT 소유권을 추적하는 데 사용되는 디지털 서명을 제공하여 각 디지털 파일의 인증을 보장합니다.\n또한 NFT의 소유권은 디지털 자산에 대한 저작권을 부여하지 않습니다.\n쉽게말해 NFT의 소유권과 저작권이 분리가 되어있어서 내가 NFT를 소유했다고 해서 저작권까지 내 것이 되는것은 아닙니다.\n";
  
  const Q2 = "NFT 작품은 어떻게 등록하나요?"
  const A2 = "먼저 로그인을 한 후에 상단 메뉴에 있는 작품등록을 클릭하여 NFT 작품 등록 페이지로 이동합니다.\n작품등록 페이지에서 내가 등록하고 싶은 이미지, 비디오, 오디오 파일을 업로드 한후 작품명, 작품설명, 카테고리를 설정한 후 작품등록을 할 수 있습니다."

  const Q3 = "로그인은 어떻게 하나요?"
  const A3 = "N-City는 메타마스크 계정으로 로그인 할 수 있습니다.\n그러므로 따로 회원가입이 불필요하며 이미 메타마스크 지갑 계정을 보유하고 계신 고객은 바로 서비스를 이용할 수 있습니다.\n메타마스크 지갑 계정이 없으신 고객께서는 아래에서 메타마스크 확장프로그램을 설치 및 계정생성을 한 후 서비스를 이용할 수 있습니다.\n\nhttps://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko\n\n로그인 페이지에서 메타마스크 연결 버튼을 클릭 후 브라우저 상단의 확장앱에서 메타마스크를 클릭한 후 계정 생성시 설정한 암호를 입력하여 지갑에 연결할 수 있습니다"

  const Q4 = "메타마스크가 무엇인가요?"
  const A4 = "메타마스크(MetaMask)란 개인지갑을 편리하고 안전하게 관리할 수 있는 구글 확장프로그램입니다.\nN-City는 메타 마스크를 이용하여 송금과 토큰거래 및 보유토큰을 확인하고 관리합니다.\n따라서 N-City의 서비스를 이용하기 위해서는 메타마스크의 설치가 필수이며 설치후 지갑 계정을 생성하여 로그인 할 수 있습니다.\n\n"

  const Q5 = "판매는 어떻게 하나요?"
  const A5 = "마이페이지에서 내가 보유한 작품을 조회할 수 있습니다.\n그 중에 판매 등록하고 싶은 작품을 선택한 후 판매등록할 수 있습니다.\n\n판매 등록하는 방법에는 일반판매등록과 경매등록 두가지가 있습니다\n일반판매등록은 판매등록할 때 입력한 금액을 구매자가 보내면 작품이 거래되는 방식입니다.\n경매등록은 판매등록할 때 입력한 시작 경매가부터 일정시간이 지날 때 까지 가격제안을 받은 후 판매 종료 시점에서 가장 높은 가격을 제안한 구매자에게 판매를 하는 방식입니다."

  const Q6 = "구매는 어떻게 하나요?"
  const A6 = "상단 메뉴의 Store 또는 특정 유저의 프로필에서 판매 등록된 작품을 조회할 수 있습니다.\n판매 등록된 작품은 일반판매등록, 경매등록 두가지의 종류가 있습니다.\n\n일반 판매등록된 작품을 구매하기 위해서는 구매버튼을 눌러 등록된 판매가를 보내면 작품을 구매할 수 있습니다.\n경매등록된 작품을 구매하기 위해서는 현재 작품에 제시된 최고가보다 높은 가격을 제시하여 경매 종료 시점에 내가 등록한 제시가보다 더 높은 가격에 제시한 유저가 없을 경우 작품이 구매됩니다."

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
      </Main>
    </Container>
  );
}
