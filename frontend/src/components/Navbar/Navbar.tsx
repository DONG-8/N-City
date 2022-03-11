import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";

const NavbarWrrap = styled.div`
  /* display: block; */
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 80px;
  background-color: white;
  border-color: black;
  border: solid;
  border-width: 1px;
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
    justify-content: flex-end;
    align-items: center;
    width: 1000px;
    font-size: 20px;
    text-align: center;

    .inner {
      width: 120px;
    }

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

    .profile {
      width: 120px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .hide {
        display: none;
        width: 118px;
        height: auto;
        background-color: white;
        color: black;
        border: solid;
        border-width: 1px;
        position: absolute;
        top: 80px;
        margin-right: 1px;

        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }

    .profile:hover {
      .hide {
        display: block;
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        animation: fadein 1s;
      }
    }
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 80px;
`;

export default function Navbar() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const goToGame = () => {
    if (isLogin === true) {
      alert("게임방입장예정");
    } else {
      alert("로그인을 먼저 진행 해 주세요");
    }
  };

  return (
    <>
      <NavbarWrrap>
        <NavbarBox>
          <div className="container">
            <div>
              <Link to="/">
                <img src="essets/images/sakura.png" alt="사진없노" />
              </Link>
            </div>
            <div className="pageName">
              <Link to="/">N-City</Link>
            </div>
          </div>
          <div className="secondContainer">
            <Link className="inner" to="faq">
              <p>FAQ</p>
            </Link>

            <Link className="inner" to="store">
              <p>store</p>
            </Link>
            {isLogin ? (
              <div className="profile">
                <PersonIcon></PersonIcon>
                <p>000님</p>
                <div className="hide">
                  <div>
                    <Link to="mypage">
                      <p>마이페이지</p>
                    </Link>
                  </div>
                  <div>
                    <p>로그 아웃</p>
                  </div>
                  <div>
                    <p>코인 충전</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link className="inner" to="login">
                  <p>로그인</p>
                </Link>
                {/* <Link className="inner" to="signup">
                  <p>회원가입</p>
                </Link> */}
              </>
            )}
            <div className="game" onClick={() => goToGame()}>
              <p>Game Start</p>
            </div>
          </div>
        </NavbarBox>
      </NavbarWrrap>
      <Empty></Empty>
    </>
  );
}
