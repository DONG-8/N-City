import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import SearchBar from "./SearchBar";
import CoinChargeModal from "../Mint/CoinChargeModal";
import logo from './logo.png'
import { useMutation } from "react-query";
import { getLogout } from "../../store/apis/log";

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
    margin-top: 5px;
    height: 40px;
    margin-left: 10px;
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
      background: linear-gradient(-45deg, #f3f3ff, #63638b , #7373f8 , #9d9dc5 );
      color: white;
      background-size: 400% 400%;
      font-size: 35px;
      cursor: pointer;
    }

    .community{
      width: 120px;
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
        right: 700px;
        margin-right: 1px;
        border-radius: 0 0 5px 5px;
        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }

    .profile {
      font-weight: 1000;
      width: 160px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .name{
        margin-left: 10px;
        color:#35357a ;
        font-weight: 1000;
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
        right: 200px;
        margin-right: 1px;
        border-radius: 0 0 5px 5px;
        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }  
    }
    .community:hover{
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
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [openCoin, setOpenCoin] = useState(false);
  const [nickName,setNickName] = useState('')
  const [userId,setUserId] = useState('')
  
  useEffect(()=>{
    setUserId(localStorage.getItem('userId')||'')
    if (userId===''){setIsLogin(false)}// userId가 있다면 로그인 되어있음
    else{
      setIsLogin(true)
      setNickName(localStorage.getItem('userNickname')||'')
    }
  },[isLogin])
  
  const login = ()=>{ // 위에 세줄 지우기 ⭐
    localStorage.setItem('userId','1')
    localStorage.setItem('userNickname','아이유')
    setIsLogin(true) 
    navigate("/login");
  }

  const logout = ()=>{
    setIsLogin(false)
    localStorage.removeItem('userId')
    localStorage.removeItem('userNickname')
    get_logout.mutate()
    navigate("/");

  }

  const get_logout = useMutation<any,Error>(
    'getProductLike',
    async()=>{return(
      await (getLogout())
    )},
    {onSuccess:(res)=>{
      setIsLogin(false)
      localStorage.removeItem('userId')
      localStorage.removeItem('userNickname')
    },onError:(err)=>{console.log('로그아웃실패')}
    }
  )

  const goToGame = () => {
    if (isLogin === true) {
      navigate("/ingame");
    } else {
      navigate("/ingame");
    }
  };

  
  if (window.location.pathname === '/ingame') return null;

  return (
    <>
      <NavbarWrrap>
        <NavbarBox>
          <div className="container">
            <div>
              <Link to="/">
                <img src={logo} alt="로고" />
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
              <p>store</p>
            </Link>
            <Link className="inner" to="artists">
              <p>Artists</p>
            </Link>
            <Link className="inner" to="mint">
              <p>Create</p>
            </Link>
            {isLogin ? ( // 로그인 되었으면 
              <div className="profile">
                <PersonIcon/>
                <p className="name">{nickName}님</p>
                
                <div className="hide">
                  <div>
                      <p onClick = {()=>{setOpenCoin(true)}}>코인 충전</p>
                      <CoinChargeModal open={openCoin} setOpen={setOpenCoin} /> 
                  </div>
                  <div>
                      <Link to={"mypage/" + localStorage.getItem("userId")}>
                        <p>마이페이지</p>
                      </Link>
                  </div>
                  <div>
                    <Link className="inner" to="character">
                      <p>캐릭터</p>
                    </Link>
                  </div>
                  <div>
                    <p onClick={()=>{logout()}}>로그 아웃</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="profile">
                  <p className="inner" onClick={()=>{login()}} >로그인</p>
                  <div className="hide">
                  </div>
                </div>
              </>
            )}
            <div className="game" >
              <a href="/ingame" >Game Start</a>
            </div>
          </div>
        </NavbarBox>
      </NavbarWrrap>
      <Empty></Empty>
    </>
  );
}
