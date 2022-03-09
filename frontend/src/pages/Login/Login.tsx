import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MetaMaskOnboarding from "@metamask/onboarding";



//// style
const Wrapper = styled.div`
  background-image: linear-gradient( rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) ), url("/essets/images/login_background.png");
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: "center";
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  margin-left: 20vw;
`;
const Header = styled.div`
  /* display: flex; */
  /* margin-left: 10vw; */
`

const H1 = styled.h1`
  font-size: 50px;
  margin-top: 20vh;
  margin-bottom: 0;
`

const H3 = styled.h3`
  font-size: 30px;
  margin-top: 0;
`

const Logo = styled.img`
  height: 35px;
  width: auto;
  margin-right: 10px;
`

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: white;
  margin-top: 5vh;
  width: 280px;
  height: 60px;
  border: 1px solid black;
  border-radius: 2vh;
  font-size: 27px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`


//// component
const Login = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [onboardButtonText, setOnboardButtonText] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  useEffect(() => {
    initialize();
    setLoading(false);
  }, []);

  const { ethereum } = window;
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:3000" : undefined;

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  const initialize = () => {
    MetaMaskClientCheck();
  };

  // 브라우저에 메타마스크가 깔려있는지 확인하는 함수
  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  // 메타마스크 설치 여부에 따라 텍스트 변경
  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      setOnboardButtonText("메타마스크 설치");
    } else {
      setOnboardButtonText("메타마스크 연결");
    }
  };

  // 메타마스크 설치 여부에 따라 onClick함수 변경(설치 or 연결)
  const onClickButton = () => {
    if (!isMetaMaskInstalled()) {
      onClickInstall();
    } else {
      onClickConnect();
    }
  };

  // 메타마스크 확장 프로그램 설치하는 페이지로 보냄
  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  // 메타마스크 연결
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      accounts[0]
        ? setAccount(accounts[0])
        : setAccount("계정을 불러올 수 없습니다.");
    } catch (error) {
      console.error(error);
      alert("메타마스크에 연결중 오류가 발생하였습니다.");
    }
  };

  return (
    <Wrapper>
      {loading ? (
        "Loading..."
      ) : (
        <Container>
          {isMetaMaskInstalled() ? (
            <Header>
              <H1>지갑에 연결하세요 !</H1>
              <H3>MetaMask를 이용하여 로그인 할 수 있습니다 !</H3>
            </Header>
          ) : (
            <Header>
              <H1>지갑이 없으신가요 ?</H1>
              <H3>지금 바로 생성하세요 !</H3>
            </Header>
          )}
          <p>{account}</p>

          <Button onClick={onClickButton}>
            <Logo src="/essets/images/metamask_logo.png" alt="Logo" />
            {onboardButtonText} &rarr;
          </Button>
        </Container>
      )}
    </Wrapper>
  );
};

export default Login;
