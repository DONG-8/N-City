import React, { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useMutation, useQuery } from "react-query";
import { postAuthentiaction } from "../../store/apis/authentication";
import { getFollowee, getFollower } from "../../store/apis/follow";
import { useNavigate } from "react-router-dom";
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"


export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  userId?: number;
  isFollower: boolean;
  followers: IUsers[];
  followees: IUsers[];
};

//// style
// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// components
const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.3s ease-out;
  transition: visibility 0.3s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
  font-family: "Noto Sans KR", sans-serif;
  width: 25vw;
  height: 70vh;
  overflow-y: auto;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 500px;
  left: 50%;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  ${(props) => modalSettings(props.visible)}
  .name{
    margin: 8px 0 8px 20px;
    position: relative;
    font-size: 2.5vh;
    cursor: pointer;
    img {
      position: absolute;
    }
  }
`;

const Title = styled.h1<{ visible: boolean }>`
  margin: 40px 0 10px;
  font-size: 30px;
  text-align: center;
  ${(props) => modalSettings(props.visible)}
`;

const Divider = styled.hr`
  border: solid 1px #6225E6  ;
  width: 65%;
  margin-bottom: 30px;
`;

const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

interface IUsers {
  userAddress: string;
  userDescription: string;
  userEmail: string;
  userImgUrl: string;
  userNick: string;
  userRole: string;
  userId: number;
}

//// component
const FollowModal = ({
  children,
  visible,
  onClose,
  userId,
  isFollower,
  followees,
  followers,
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navgate = useNavigate();

  const handleOnClickFollower = (userId) => {
    navgate(`/mypage/${userId}`);
    setIsOpen(false);
    window.location.reload();
  };
  // useEffect(() => {
  //   if (userId && isFollower){
  //     getUserFollower.mutate();
  //   } else if (userId && !isFollower) {
  //     getUserFollowee.mutate();
  //   }
  // },[isOpen])

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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <CloseButton onClick={onClose}/>
        <Title visible={visible}>{isFollower ? "팔로워" : "팔로우"}</Title>
        <Divider />
        {isFollower
          ? followers.map((user) => {
              return (
                <div
                  className="name"
                  key={user.userId}
                  onClick={() => handleOnClickFollower(user.userId)}
                >
                  <span>
                  {user.userNick}
                  </span>
                  {getVerifiedMark(user.userRole)}
                </div>
              );
            })
          : followees.map((user) => {
              return (
                <div
                  className="name"
                  key={user.userId}
                  onClick={() => handleOnClickFollower(user.userId)}
                >
                  <span>
                  {user.userNick}
                  </span>
                  {getVerifiedMark(user.userRole)}
                </div>
              );
            })}
      </ModalSection>
    </div>
  );
};

export default FollowModal;
