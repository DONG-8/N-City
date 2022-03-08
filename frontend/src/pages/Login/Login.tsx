import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MetaMaskOnboarding from '@metamask/onboarding'


const Wrapper = styled.div`
  justify-content: "center";
  align-items: "center";
`
const LoginButton = styled.button`
  
`


const Login = () => {
  const [onboardButtonText, setOnboardButtonText] = useState<string>("");
  const [buttonDisabledState, setButtonDisabledState] =
    useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  useEffect(() => {
    initialize()
  }, []);

  const { ethereum } = window;
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin =
    currentUrl.hostname === "localhost" ? "http://localhost:3000" : undefined;

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

  const initialize = () => {
    MetaMaskClientCheck();
  }

  // 브라우저에 메타마스크가 깔려있는지 확인하는 함수
  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  
  // 메타마스크 설치 여부에 따라 텍스트 변경
  const MetaMaskClientCheck = () => {
    if (!isMetaMaskInstalled()) {
      setOnboardButtonText("메타마스크 설치")
    } else {
      setOnboardButtonText("메타마스크 연결")
    }
  };

  // 메타마스크 설치 여부에 따라 onClick함수 변경(설치 or 연결)
  const onClickButton = () => {
    if (!isMetaMaskInstalled()) {
      onClickInstall()
    } else {
      onClickConnect()
    }
  }

  // 메타마스크 설치하는 페이지로 보냄
  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  // 메타마스크 연결
  const onClickConnect = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      accounts[0] ? setAccount(accounts[0]) : setAccount("계정을 불러올 수 없습니다.")
    } catch (error) {
      console.error(error);
      alert("메타마스크에 연결중 오류가 발생하였습니다.")
    }
  };
  
  return (
    <Wrapper>
      {account}
      <LoginButton onClick={onClickButton} disabled={buttonDisabledState}>
        {onboardButtonText}
      </LoginButton>
    </Wrapper>
  )
}

export default Login;