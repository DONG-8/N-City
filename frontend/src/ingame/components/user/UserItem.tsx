import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";
// api 요청
import { useMutation, useQuery } from "react-query";

//스토어
import { deleteFollow, postFollow } from "../../../store/apis/follow";
import { getUserInfo } from "../../../store/apis/user";
import { Link, useNavigate } from "react-router-dom";
import influencer from "../../../essets/images/influencer-mark.png"
import artist from "../../../essets/images/artist-mark.png"
import enterprise from "../../../essets/images/enterprise-mark.png"

interface Iprops {
  children?: ReactNode;
  user : {
    "userId": Number;
    "userNick": String
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
  margin-top: 2px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 25px;
  }
  .subTitle {
    /* color: white; */
    font-weight: 400;
    margin-left: 20px;
  }
  .role {
    display: flex;
    align-items: center;
    margin-left: 5px;
    img {
      width: 15px;
      height: 15px;
    }
  }
  .box {
    display: flex;
    align-items: center;
  }
  button {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
  }
`;

interface IState {
  "user" : {
    "userId": Number,
    "authId": Number,
    "userAddress": string,
    "userRole": string,
    "userNick": string,
    "userEmail": string,
    "userEmailConfirm": boolean,
    "userDescription": string,
    "userImgUrl": string,
    "followerCnt": Number,
    "followeeCnt": Number,
    "myRoomTodayCnt": Number,
    "myRoomTotalCnt": Number
  }
}

const UserItem: React.FC<Iprops> = ({ user }) => {
  // 작품 조회
  // productcode === 1 : 음악코드
  const [userInfo, setUserInfo] = useState<IState["user"]>()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const getuserinfo = useMutation<any, Error>(
    "getuserinfo",
    async () => {
      return await getUserInfo(Number(user.userId));
    },
    {
      onSuccess: (res) => {
        setUserInfo(res)
        setIsLoading(false)
      },
      onError: (err) => {
        setIsLoading(false)
      },
    }
  );


  const getVerifiedMark = (userType: string|undefined) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return <img src={influencer} title='influencer' alt="mark" />;
      case "ROLE_ARTIST":
        return <img src={artist}  title='artist' alt="mark" />;
      case "ROLE_ENTERPRISE":
        return <img src={enterprise} title='enterprise' alt="mark" />;
      default:
        return;
    }
  }


  const onClickJoinRoom = () => {
    navigate("/ingame/" + String(user.userId))
    window.location.reload()
  };

  useEffect(() => {
    getuserinfo.mutate()
  }, [])

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <Wrapper>
      <div className="box">
        <img src={userInfo?.userImgUrl} alt="프로필사진" />
        <div className="subTitle">{user.userNick}</div>
        <div className="role">{getVerifiedMark("ROLE_ARTIST")}</div>
      </div>
      <button className="joinroombtn" onClick={onClickJoinRoom}>방입장</button>
    </Wrapper>
  );
};

export default UserItem;
