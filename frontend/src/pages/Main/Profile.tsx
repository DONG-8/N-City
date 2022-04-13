import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCharacter, putCharacterChange } from "../../store/apis/myRoom";
import { getUserInfo } from "../../store/apis/user";
import { SSFTokenContract } from "../../web3Config";
import GameStartButton3 from "./GameStartButton";
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"

const SubBannerWrraper = styled.div`
  position: relative;
  width: 430px;
  height: 510px;
  margin: -400px auto 0 10px;
`;

const SubBanner = styled.div`
  width: 430px;
  height: 509px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  z-index: 0;
  background-color: #f6f6f7;
  border-radius: 20px;
  .inner {
    
    width: 448px;
  }
  .inner img {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }
`;

const TodayInformationDiv = styled.div`
  width: 400px;
  height: 65px;
  /* background-color: #129fce; */
  background-color: #9191e8 ;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  p {
    font-size: 10px;
    color: white;
    margin-left: 20px
  }

  h5 {
    font-size: 14px;
    color: #f2c953;
    margin: 2px;
    margin-left:10px;
  }

  h4 {
    font-size: 12px;
    color: white;
    margin: 0;
  }

  h1 {
    font-size: 15px;
    color: white;
    margin-left:30px;
  }
`;



const TitleCardDiv = styled.div`
  width: 400px;
  height: 260px;
  margin: 5px auto;
  font-size: 15px;
  background-color: white;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  .container1 {
    width: 88%;
    height: 65%;
    display: flex;
    flex-direction: row;
    margin: 20px;
  }

  .container2 {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    .status {
      margin-left: 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: 16px;
      font-weight: 500;
      #set {
        color: #12abdc;
        font-size: 13px;
        margin-left: 20px;
        margin-top: -0.5px
      }

      #data {
        font-size: 13px;
        margin-right: 20px;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  #profileImg {
    width: 140px;
    height: 140px;
    object-fit: fill;
    border-radius: 10px;
  }

  #explain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    .box{
      margin-top: -1vh;
      p{
        font-size: 1.05rem;
        margin-bottom: 5px;
      }
    }
    h1 {
      margin: 0px;
      margin-bottom: 20px;
      font-size: 25px;
      font-weight: 600;
    }

    p {
      margin: 0px;
      font-size: 15px;
    }
  }
`;

const Wallet = styled.div`
  width: 400px;
  height: 65px;
  margin: 5px auto;
  font-size: 15px;
  background-color: white;
  display: flex;
  border-radius: 10px;
  align-items: center;
  .box {
    width: 240px;
    overflow: hidden;
    margin-left: 10px;
  }
  .balance {
    font-size: 20px;
    font-weight: 600;
    color: black;
    width: 240px;
    margin-left: 20px;
    /* cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    animation: filter 5s linear infinite; */
    
  }
  .coinimg{
    height: 40px;
    width: 40px;
    margin-left: 20px;
  }

  .bgm {
    margin-right: 20px;
    font-size: 20px;
    color: #12abdc;
    .blue{
      color: #7f7fd8  ;
      font-weight: 700;
      margin-right: 20px;
      text-overflow: ellipsis;
    
    }
    .small{
      font-size: 15px;
      margin-left: 50px;
    }
  }
  @keyframes filter {
    to {
      transform: translateX(-300px);
      filter: hue-rotate(0);
    }
    from {
      transform: translateX(300px);
      filter: hue-rotate(360deg);
    }
  }
`;

const LoginDiv = styled.div`
  width: 400px;
  height: 65px;
  margin: 5px auto;
  font-size: 16px;
  /* background-color: #23afde; */
  background-color: #9191e8 ;
  display: flex;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  img {
    width: 55px;
    height: 55px;
    margin: auto 0;
    margin-left: 40px;
  }
  p {
    font-size: 20px;
    font-weight: bolder;
    color: white;
    margin-left: 50px;
  }
  &:hover{
    background-color: #8181e8 ;
  }
`;

const NextIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 90px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
`;

// const PlayIcon = styled.div`
//   cursor: pointer;
//   width: 50px;
//   height: 50px;
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z'/%3E%3C/svg%3E");
// `;
interface Istate{
  user:{
    "authId": Number,
    "followeeCnt": Number,
    "followerCnt": Number,
    "userAddress": String,
    "userDescription": String,
    "userEmail": String,
    "userEmailConfirm": Boolean,
    "userId": Number,
    "userImgUrl": string,
    "userNick": String,
    "userRole": String,
    "myRoomTodayCnt": number,
    "myRoomTotalCnt": number
  }
}
const Profile = () => {
  const [user,setUser] = useState<Istate['user']>()
  const [balance, setBalance] = useState(0)
  const { ethereum } = window;
  
  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    getBalance(accounts[0])
  }

  const getBalance = async (account) => {
    const response = await SSFTokenContract.methods.balanceOf(account).call();
    setBalance(response)
  }

  const imageOnErrorHandler = ( // 사진이 오류날 시 기본 사진
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src ='data:image/png;base64,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';
};
  const getUser = useMutation<any, Error>(
    "getUserInfo",
    async () => {
      if (Number(sessionStorage.getItem("userId")) === 0) return;
      return await getUserInfo(Number(sessionStorage.getItem("userId")));
    },
    {
      onSuccess: (res) => {
        setUser(res);
        // getChar.mutate()
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const convertRoleText = (userType: String|undefined) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return <div><img src={influencer} alt="mark" /> 인플루언서
          </div>;
      case "ROLE_ARTIST":
        return <div><img src={artist} alt="mark" /> 아티스트
          </div>;
      case "ROLE_ENTERPRISE":
        return <div>
          <img src={enterprise} alt="mark" /> 기업
        </div>
        ;
      case "ROLE_ADMIN":
        return <div>
          관리자
        </div>
        ;
      default:
        return <div>일반유저</div>;
    }
  }

  useEffect(()=>{
    getUser.mutate()
    getAccount();
  },[])
 
  return (
    <SubBannerWrraper>
      <SubBanner>
        <TodayInformationDiv>
          {sessionStorage.getItem("userId") ? (
            <>
              <h1>TODAY</h1>
              <h5>{user?.myRoomTodayCnt}</h5>
              <p>|</p>
              <h1>TOTAL</h1>
              <h5>{user?.myRoomTotalCnt}</h5>
            </>
          ) : (
            <>
              <h1>N-City의 다양한 컨텐츠를 즐기세요</h1>
            </>
          )}
        </TodayInformationDiv>
        <TitleCardDiv>
          <div className="container1">
            <img
              id="profileImg"
              src={
                sessionStorage.getItem("userId") && user && user.userImgUrl!==null 
                  ? user?.userImgUrl
                  : "data:image/png;base64,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"
              }
              alt="사진오류"
              onError={imageOnErrorHandler}
            />
            <div id="explain">
              <h1>
              <Link to={"mypage/" + sessionStorage.getItem("userId")}>
                {sessionStorage.getItem("userId") ? user?.userNick : null}
              </Link>
              </h1>
              <div className="box">
                {!sessionStorage.getItem("userId")  &&  ( //설명이있으면 ?
                  <div className="box">
                    <p>메타 마스크를 통해</p>
                    <p>로그인하세요</p>
                    <p>N-City가 처음이라면</p>
                    <p>가이드를 읽어주세요</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container2">
            {sessionStorage.getItem("userId") ? (
              <>
                <div className="status">
                  {convertRoleText(user?.userRole)}
                </div>
                <div className="status">
                  <div id="set">followee</div>
                  <div id="data">{user?.followeeCnt}</div>
                </div>
                <div className="status">
                  <div id="set">follower</div>
                  <div id="data">{user?.followerCnt}</div>
                </div>
              </>
            ) : (
              <>
                <div className="status">
                  <div id="set">N-city에 로그인하고 Myroom을 꾸며보세요</div>
                </div>
              </>
            )}
          </div>
        </TitleCardDiv>
        <Wallet>
          {sessionStorage.getItem("userId") ? (
            <>
              <div className="box">
                <div className="balance">내 지갑 잔액</div>
              </div>
              <div className="bgm">
                <span className="blue">{balance}</span>
                NCT
              </div>
            </>
          ) : (
            <>
              <div className="bgm">
                <span className="small">
                  로그인 하시면 메타마스크의 지갑이 연결됩니다.
                </span>
              </div>
            </>
          )}
        </Wallet>
        {sessionStorage.getItem("userId") ? (
          <GameStartButton3 />
        ) : (
          <Link to="/login">
            <LoginDiv>
              <img src="essets/images/metamask_logo.png" alt="" />
              <p>로그인 하기</p>
              <NextIcon />
            </LoginDiv>
          </Link>
        )}
      </SubBanner>
    </SubBannerWrraper>
  );
};

export default Profile;
