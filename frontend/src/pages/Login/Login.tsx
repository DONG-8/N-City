import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useMutation } from 'react-query';
import { postLogin } from "../../store/apis/log";
import { useNavigate } from "react-router-dom";
import { NFTcreatorAddress, SSFTokenAddress, web3 } from "../../web3Config";

//// style
const Wrapper = styled.div`
  background-image: linear-gradient( rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) ), url("/essets/images/login_background.png");
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: "center";
  height: 1000px;
  margin-bottom: -20vh;
  width: 100%;
`;

const Container = styled.div`
  margin-left: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 30px;
  width: 320px;
  height: 80px;
  border: 1px solid black;
  border-radius: 2vh;
  font-size: 27px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Explain = styled.div`
  margin-top: 30px;
  p {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
  span {
    color: #F68614;
  }
`

//// component
const Login = () => {
  const [onboardButtonText, setOnboardButtonText] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  useEffect(() => {
    initialize();
  }, []);

  const { ethereum } = window;
  const currentUrl = new URL(window.location.href);
  const forwarderOrigin ="http://localhost:3000/";
  const navigate = useNavigate();
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
      await setAccount(accounts[0])

      // NCT토큰 자동불러오기 (이미 등록되어있어도 뜸.. 이건 해결방법은 없음(못찾는게아니라 애초에 방법이없음))
      // https://coder-solution.com/solution-blog/288728 참고
      
      
      
      const chainId = 31221
      const rpcurl = "http://20.196.209.2:8545"
      

        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: web3.utils.toHex(chainId) }],
          });
        

        await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: SSFTokenAddress,
                symbol: "NCT",
                decimals: 0,
                image: "",
              },
            },
          })
          .then((success) => {
            if (success) {
              console.log("successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
          
          // login
        login.mutate()
      } catch (error) {
        console.error(error);
        alert("메타마스크에 연결중 오류가 발생하였습니다.");
      }
    };
    
    const login = useMutation<any, Error>(
      "postPurchase",
      async () => {
        return postLogin(account)
      },
      {
        onSuccess: (res) => {
          console.log("로그인요청 성공", res);
        sessionStorage.setItem("userId", res.userId)
        sessionStorage.setItem("userNickname", res.userNick)
        navigate("/")
        window.location.reload();
      },
      onError: (err: any) => {
        console.log("로그인요청 실패", err);
      },
    }
  );

  return (
    <Wrapper>
      <Container>
        {isMetaMaskInstalled() ? (
          <Header>
            <H1>지갑에 연결하세요</H1>
            {/* <H3>MetaMask를 이용하여 로그인 할 수 있습니다</H3> */}
          </Header>
        ) : (
          <Header>
            <H1>지갑이 없으신가요?</H1>
            <H3>지금 바로 생성하세요</H3>
          </Header>
        )}
        {account && <p>연결된 지갑 주소 : {account}</p>}
        <Explain>
          <p>저희 사이트에는 개인지갑을 편리하고 안전하게 관리할 수 있는</p>
          <p>
            구글 확장프로그램인 <span>메타마스크</span>를 이용하여 로그인 합니다
          </p>
        </Explain>
        <Explain>
          <p>이미 지갑을 소유하셨다면 회원가입 절차 필요없이</p>
          <p>서비스를 바로 이용할 수 있습니다</p>
        </Explain>
        <Button onClick={onClickButton}>
          <Logo src="/essets/images/metamask_logo.png" alt="Logo" />
          {onboardButtonText}
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Login;
