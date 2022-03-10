import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarWrrap = styled.div`
  /* display: block; */
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 80px;
  background-color: white;
  border-color: black;
  border: solid;
  margin-bottom: 80px;
  @font-face {
    font-family: "DungGeunMo";
    src: url("../../essets/DungGeunMo.woff") format("woff");
  }
`;

const NavbarBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px;
  font-family: "DungGeunMo";
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    height: 70px;
    margin: 0 10px;
  }
  .pageName {
    font-size: 40px;
    margin: 0 2%;
    min-width: 120px;
  }

  .secondContainer {
    display: flex;
    flex-direction: row;
    /* margin: 0 2%; */
    justify-content: space-between;
    align-items: center;
    width: 40%;
    font-size: 20px;
    text-align: center;
    .game {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      min-width: 200px;
      height: 80px;
      background: linear-gradient(-45deg, #ffaa98, #fef0d3, #fddfd2, #ff9788);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 80px;
`;

export default function Navbar() {
  return (
    <>
      <NavbarWrrap>
        <NavbarBox>
          <div className="container">
            <img
              src="https://o.remove.bg/downloads/b7b9b8d2-3cdd-4710-ade8-ca63463d1ec1/image-removebg-preview.png"
              alt="사진없노"
            />
            <div className="pageName">N-City</div>
          </div>
          <div className="secondContainer">
            <Link to="/">
              <p>메인</p>
            </Link>
            <Link to="login">
              <p>로그인</p>
            </Link>
            <Link to="signup">
              <p>회원가입</p>
            </Link>
            <Link to="faq">
              <p>FAQ</p>
            </Link>
            <Link to="mypage">
              <p>마이페이지</p>
            </Link>
            <Link to="store">
              <p>store</p>
            </Link>
            <div className="profile">
              <p>프로필</p>
            </div>
            <div className="game">
              <p>Game Start</p>
            </div>
          </div>
        </NavbarBox>
      </NavbarWrrap>
      <Empty></Empty>
    </>
  );
}
