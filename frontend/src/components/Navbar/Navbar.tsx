import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import SearchBar from "./SearchBar";
import CoinChargeModal from "../Mint/CoinChargeModal";
import { useMutation } from "react-query";
import { getLogout } from "../../store/apis/log";
import GameStartButton from "./GameStartButton";
import Logo from "../../essets/images/logo2.png";
import Logotext from "../../essets/images/logo2_text.png";

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
    justify-content: center;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  img {
    height: 50px;
    margin-left: 5px;
  }
  .pageName {
    display: flex;
    align-items: center;
    font-size: 40px;
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
      width: 5.5vw;
      min-width: 80px;
    }
    .game {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      min-width: 200px;
      height: 80px;
      background: linear-gradient(-45deg, #ffaa98, #fef0d3, #fddfd2, #ff9788);
      background: linear-gradient(-45deg, #f3f3ff, #63638b, #7373f8, #9d9dc5);
      color: white;
      background-size: 400% 400%;
      font-size: 35px;
      cursor: pointer;
    }

    .community {
      position: relative;
      width: 5.5vw;
      min-width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .hide2 {
        display: none;
        width: 8vw;
        height: auto;
        background-color: white;
        color: black;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
        position: absolute;
        top: 60px;
        margin-right: 1px;
        border-radius: 0 0 5px 5px;
        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }

    .profile {
      position: relative;
      font-weight: 600;
      width: 160px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .name {
        margin-left: 10px;
        color: #6225e6; //🎨메인색🎨
        font-weight: 600;
      }
      .hide {
        display: none;
        width: 10vw;
        height: auto;
        background-color: white;
        color: black;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
        position: absolute;
        top: 60px;
        margin-right: 1px;
        border-radius: 0 0 5px 5px;
        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .community:hover {
      .hide2 {
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
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [openCoin, setOpenCoin] = useState(false);
  const [nickName, setNickName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  window.onstorage = (event) => {
    if (event.key !== "userNickname") return;
    console.log("스토리지변경감지");
    const newNick = sessionStorage.getItem("userNickname");
    console.log(newNick);
    if (newNick) {
      setNickName(newNick);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    console.log(sessionStorage.getItem("userId"));
    if (sessionStorage.getItem("userId")) {
      setIsLogin(true);
      setNickName(sessionStorage.getItem("userNickname"));
    } // userId가 있다면 로그인 되어있음
    else {
      setIsLogin(false);
    }
  }, []);

  const login = () => {
    // 위에 세줄 지우기 ⭐
    navigate("/login");
  };

  const logout = () => {
    setIsLogin(false);
    get_logout.mutate();
    navigate("/");
    // window.location.reload();
  };

  const get_logout = useMutation<any, Error>(
    "get_logout",
    async () => {
      return await getLogout();
    },
    {
      onSuccess: (res) => {
        console.log("로그아웃성공", res);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userNickname");
      },
      onError: (err) => {
        console.log("로그아웃실패", err);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userNickname");
      },
    }
  );

  const goToGame = () => {
    if (isLogin === true) {
      navigate("/ingame/" + sessionStorage.getItem("userId"));
    } else {
      navigate("/ingame");
    }
  };

  if (window.location.pathname.slice(0, 7) === "/ingame") return null;

  return (
    <>
      <NavbarWrrap>
        <NavbarBox>
          <Link to="/">
            <div className="container">
              <div className="logo">
                <img src={Logo} alt="로고" />
              </div>
              <div className="pageName">
                <img src={Logotext} alt="로고" />
              </div>
            </div>
          </Link>
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
          <div className="secondContainer">
            <div className="community">
              <p className="inner">News</p>
              <div className="hide2">
                <Link className="inner" to="faq">
                  <p>FAQ</p>
                </Link>
                <Link className="inner" to="event">
                  <p>Event</p>
                </Link>
              </div>
            </div>

            <Link className="inner" to="store">
              <p>NFTs</p>
            </Link>
            <Link className="inner" to="artists">
              <p>Citizen</p>
            </Link>

            {isLogin && (
              <Link className="inner" to="mint">
                <p>Create</p>
              </Link>
            )}
            {isLogin ? ( // 로그인 되었으면
              <div className="profile">
                <PersonIcon />
                <p className="name">{nickName}님</p>

                <div className="hide">
                  <div>
                    <p
                      onClick={() => {
                        setOpenCoin(true);
                      }}
                    >
                      NCT 충전
                    </p>
                    <CoinChargeModal open={openCoin} setOpen={setOpenCoin} />
                  </div>
                  <div>
                    <Link to={"mypage/" + sessionStorage.getItem("userId")}>
                      <p>마이페이지</p>
                    </Link>
                  </div>
                  <div>
                    <Link className="inner" to="character">
                      <p>캐릭터</p>
                    </Link>
                  </div>
                  <div>
                    <p
                      onClick={() => {
                        logout();
                      }}
                    >
                      로그 아웃
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="profile">
                  <p
                    className="inner"
                    onClick={() => {
                      login();
                    }}
                  >
                    로그인
                  </p>
                  <div className="hide"></div>
                </div>
              </>
            )}
            <GameStartButton isLogin={isLogin} />
          </div>
        </NavbarBox>
      </NavbarWrrap>
      <Empty></Empty>
    </>
  );
}
