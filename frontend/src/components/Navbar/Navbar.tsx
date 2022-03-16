import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import SearchBar from "./SearchBar";
import CoinChargeModal from "../Mint/CoinChargeModal";

const NavbarWrrap = styled.div`
  /* display: block; */
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 80px;
  background-color: white;
  border-color: black;
  /* border: solid; */
  /* border-width: 0 0 1px 0; */
  margin-bottom: 80px;
  box-shadow: 0 0 5px 0 gray;
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
  /* font-family: "DungGeunMo"; */
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
    margin: 0 15px;
    min-width: 120px;
  }

  .secondContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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
      font-size: 35px;
      cursor: pointer;
    }

    .profile {
      width: 120px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .hide {
        display: none;
        width: 200px;
        height: auto;
        background-color: white;
        color: black;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
        position: absolute;
        top: 60px;
        right: 205px;
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

const SearchBarContainer = styled.div`
  position: relative;
  width: 900px;
  min-width: 500px;
  max-width: 900px;
  height: 80px;
  display: flex;
  justify-content: center;
`;

export default function Navbar() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [openCoin, setOpenCoin] = useState(false);
  {/* ⭐ */}
  
  const goToGame = () => {
    if (isLogin === true) {
      navigate("/Game");
    } else {
      navigate("/Login");
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
          <SearchBarContainer>
            <SearchBar></SearchBar>
          </SearchBarContainer>
          <div className="secondContainer">
            <Link className="inner" to="faq">
              <p>FAQ</p>
            </Link>

            <Link className="inner" to="store">
              <p>store</p>
            </Link>
            <Link className="inner" to="store">
              <p>Create</p>
            </Link>
            {isLogin ? (
              <div className="profile">
                <PersonIcon></PersonIcon>
                <p>000님</p>
                <div className="hide">
                  <div>
                    <p>코인 충전</p>
                  </div>
                  <div>
                    <Link to="mypage">
                      <p>마이페이지</p>
                    </Link>
                  </div>
                  <div>
                    <p>로그 아웃</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* <Link className="inner" to="login">
                  <p>로그인</p>
                </Link> */}
                <div className="profile">
                  <PersonIcon></PersonIcon>
                  <p>000님</p>
                  <div className="hide">
                    <div >
                      <p onClick = {()=>{setOpenCoin(true)}}>코인 충전</p>
                      <CoinChargeModal open={openCoin} setOpen={setOpenCoin} /> 
                      {/* ⭐ */}
                    </div>
                    <div>
                      <Link to="mypage">
                        <p>마이페이지</p>
                      </Link>
                    </div>
                    <div>
                      <p>로그 아웃</p>
                    </div>
                  </div>
                </div>
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
