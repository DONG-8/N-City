import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { NFTcreatorAddress, SSFTokenAddress } from "../../web3Config";
import Extra from "./extraguide";

const Wrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;

  .important {
    color : red;
  }
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #6225E6;  
  .firstdiv {
    color: teal;
  }
  img{
    margin-top:10vh;
    border: 1px solid gray;
    border-radius: 10px;
  }
  h1{
    margin-top:10vh;
  }
  button{
    &:hover{
      background-color: white;
    }
  }
`
const Img = styled.img`
  width: 50%;  
`

const Token = styled.img`
width : 450px;
height : auto;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #35357a;
  border-radius: 0 0 10px 10px;
  color: white;
  width: 100%;
  height: 180px;
`

const FilterBar = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 65px;
  width: 70vw;
  display: flex;
  div {
    cursor: pointer;
    flex: 2.5;
    height: 6vh;
    text-align: center;
    &:hover {
      background-color: whitesmoke;
      transition: 0.3s;
    }
    p {
      font-size: 2.5vh;
      margin-top: 1vh;
      font-weight: 600;
    }
  }
  div {
    border-bottom: 2px solid #6225E6  ;
  }

  #select {
    background-color: white;
    border-left: 2px solid #6225E6  ;
    border-right: 2px solid #6225E6  ;
    border-top: 2px solid #6225E6  ;
    border-bottom: none;
    color: #6225E6  ;
    &:hover {
      background-color: #f9f9f9;
    }
  }
`;


const ButtonBox = styled.div`
margin-left: 20px;
  button {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    padding: 10px;
    font-weight: 500;
  }
`

const Title = styled.h1`
  margin: 80px 0;
  font-size: 35px;
`
//component
const Guide = () => {
  const [categoryState, setCategoryState] = useState("log")
  return (
    <Wrapper>
      <Header>
        <Title>어떻게 시작하나요?</Title>
      </Header>
      <ButtonBox>


      <FilterBar>
        <div
          id={categoryState === "log" ? "select" : ""}
          onClick={() => {
            setCategoryState("log");
          }}
          className="log"
        >
          <p>로그인 가이드</p>
        </div>
        <div
          id={categoryState === "network" ? "select" : ""}
          onClick={() => {
            setCategoryState("network");
          }}
          className="network"
        >
          <p>네트워크 연결 가이드</p>
        </div>
      </FilterBar>

      </ButtonBox>
      {categoryState === "log" ? (
        <Box>
          <Img src="/essets/guideimage/로그인버튼1_설명추가.png" alt="사진" />
          <Img
            src="/essets/guideimage/로그인페이지_설명추가_big.png"
            alt="사진"
          />
          <h1>메타마스크 설치후 지갑생성부터 진행하겠습니다.</h1>
          <Img
            src="/essets/guideimage/메타마스크_첫페이지_설명추가_cut.png"
            alt="사진"
          />
          <Token
            src="/essets/guideimage/메타마스크페이지_3_cut.png"
            alt="사진"
          />
          
          <h1>메타마스크용 새 비밀번호를 입력해줍니다.</h1>
          
          <Img
            src="/essets/guideimage/메타마스크페이지_5_설명추가_cut.png"
            alt="사진"
          />
          <h1 className="important">중요 중요!!</h1>
          <h2>
            위 화면에서 <span className="important">빨간색 박스</span>안의 비밀 복구 구문은{" "}
            <span className="important">반드시</span> 따로 저장하세요!!!
          </h2>
          <Token
            src="/essets/guideimage/메타마스크페이지_6_cut.png"
            alt="사진"
          />
          <h1>
            해당 화면이 나오면 이전 페이지의 비밀 복구 구문 순서대로 <br />{" "}
            하단의 버튼을 눌러주세요.
          </h1>
          <Token
            src="/essets/guideimage/메타마스크페이지_7_설명추가_cut.png"
            alt="사진"
          />
          <h1>입력을 마치면 하단의 확인버튼이 활성화 됩니다.</h1>
          <Token
            src="/essets/guideimage/메타마스크페이지_8_cut.png"
            alt="사진"
          />
          <h1>메타마스크 지갑 생성 완료!!!!</h1>
          
          <h1>이제 로그인을 해볼까요?</h1>
          <Token
            src="/essets/guideimage/메타마스크페이지_16_설명추가.png"
            alt="사진"
          />
          <br />
          <Token src="/essets/guideimage/메타마스크페이지_17.png" alt="사진" />
          <h1>메타마스크의 지갑계정을 N-City 사이트와 연결 해줍니다.</h1>

          <Token
            src="/essets/guideimage/메타마스크페이지_18_설명추가_cut.png"
            alt="사진"
          />
          <h1>위와 같이 연결된 지갑 주소가 출력된다면 <br/>로그인 완료!!!</h1>
          <Button onClick={()=>{setCategoryState("network");window.scrollTo(0,0);}}>
            <h2>이어서 네트워크 연결하러 가기!</h2>
          </Button>
        </Box>
      ) : (
        <Box>
          <h1>이제 네트워크를 연결해보겠습니다.</h1>
          <Img
            src="/essets/guideimage/메타마스크페이지_9_설명추가_cut.png"
            alt="사진"
          />
          <Img
            src="/essets/guideimage/메타마스크페이지_10_설명추가_cut.png"
            alt="사진"
          />
          <Img
            src="/essets/guideimage/메타마스크페이지_11_설명추가_cut.png"
            alt="사진"
          />

          <h1>RPC URL - http://20.196.209.2:8545 <br/>
              체인 ID - 31221 <br/>
              위 항목들을 알맞게 입력해줍니다.
          </h1>

          <h1>이제 토큰을 가져오겠습니다.</h1>
          <Img
            src="/essets/guideimage/메타마스크페이지_12_설명추가_cut.png"
            alt="사진"
          />

          <Token
            src="/essets/guideimage/메타마스크페이지_13_설명추가_cut.png"
            alt="사진"
          />
          <h1> 토큰 계약 주소에 아래의 주소를 입력합니다. </h1>
          <h2>{NFTcreatorAddress}</h2>
          <Token
            src="/essets/guideimage/메타마스크페이지_15_cut.png"
            alt="사진"
          />
          <h1>성공했다면 위와 같은 화면이 나옵니다.</h1>
          <Token
            src="/essets/guideimage/메타마스크페이지_14_설명추가_cut.png"
            alt="사진"
          />
          <h1>{SSFTokenAddress} <br/>위의 주소값으로 한번더 해줍니다.</h1>

          <Token
            src="/essets/guideimage/메타마스크페이지_15-2_설명 추가_cut.png"
            alt="사진"
          />
          <h1>토큰 2개를 추가한 화면</h1>

          <h1>메타마스크 설정 완료!!</h1>
          <Button><a href="/">N-City 이용하러 가기</a></Button>
        </Box>
      )}
    </Wrapper>
  );
}

export default Guide
