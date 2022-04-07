import React, { useState } from "react";
import styled from "styled-components";
import {
  Wrapper,
  Head,
  ToggleBtn,
  BodyWrapper,
  Body,
  Absol,
  BottomItem,
} from "./style";

import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getUsercollectedInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { setMusicList } from "../../stores/RoomStore";
import Chat from "../Chat";
import AudioPlayer from "../Music/AudioPlayer";
import { Tooltip } from "@mui/material";
import MusicModal from "../Music/MusicModal";
import StoreModal from "../NFTstore/StoreModal";
import VisitModal from "../visitModal";
import UserModal from "../user/UserModal";
import { EditModeChange, MakingModeChange } from "../../stores/EditStore";

const UIBar = () => {
  const [musicList, setMusic] = useState();
  const dispatch = useAppDispatch();
  const [tog, setTog] = useState(true);
  const [musicTog, setMusicTog] = useState(true);
  const [shopTog, setShopTog] = useState(true);
  const [visitTog, setVisitTog] = useState(true);
  const [userTog, setUserTog] = useState(true);
  const { userId } = useParams();
  const numId = Number(userId);
  const navigation = useNavigate();
  const myId = sessionStorage.getItem("userId");

  let itsMe;
  if (myId === userId) {
    itsMe = true;
  } else {
    itsMe = false;
  }

  const {
    data: Alldata,
    isLoading: AllLoading,
    refetch: ALL,
  } = useQuery<any>(
    "ALLNFT",
    async () => {
      const size = 1000;
      return await getUsercollectedInfo(numId, size);
    },
    {
      onSuccess: (res) => {
        // 성공하면 db에 뮤직 string List를 만들어서 넘겨준다.
        let arr;
        console.log(res, "앱창에서 불러온 정보");
        console.log(res.content, "콘텐츠"); // []
        if (res.content.length !== 0) {
          const music = res.content.filter((obj, i) => {
            return obj.productCode === 1;
          });
          console.log(music, "음악 정보만 받아옴");
          let MusicArray;
          if (music.length !== 0) {
            MusicArray = music.map((obj, i) => {
              return {
                title: obj.productTitle,
                artist: obj.productDesc,
                audioSrc: obj.productFileUrl,
                image: obj.productThumbnailUrl,
                color: "#6225E6",
              };
            });
          }

          console.log(MusicArray, "뮤직어레이");
          dispatch(setMusicList(MusicArray));
          setMusic(MusicArray);
        }
      },
    }
  );
  const { data: userInfo, isLoading: userInfoLoading } = useQuery<any>(
    "sideuserInfo",
    async () => {
      return await getUserInfo(numId);
    }
  );

  // room 이동 요청
  // get 해당 유저의 id , 데이터 변경 , post 요청 입장, route 주소 변경
  // Ramdom 로직 확인 후 분할 혹은 병합

  const toggle = () => {
    setTog(!tog);
  };

  const gotoHome = () => {
    // return <Navigate to="/" />;
    navigation("/");
    (window as any).game.destroy(true);
  };

  const ClickModeChange = () => {
    dispatch(EditModeChange());
    console.log("변경중");
  };

  const openMusic = () => {
    setMusicTog(!musicTog);
  };

  const openShop = () => {
    setShopTog(!shopTog);
  };

  const openVisit = () => {
    setVisitTog(!visitTog);
  };

  const openUser = () => {
    setUserTog(!userTog);
  };

  const imageOnErrorHandler = (
    // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "data:image/png;base64,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";
  };
  return (
    <Wrapper>
      {/* <Head className={tog ? "close" : "open"}> */}
      <Head className={tog ? "close" : "open"}>
        <ToggleBtn onClick={() => toggle()}>
          <img
            className={tog ? "changeButton" : "button"}
            src="/essets/room/arrow-left-circle.png"
            onError={imageOnErrorHandler}
          ></img>
        </ToggleBtn>
        {userInfo ? (
          <>
            {userInfo.userImgUrl ? (
              <img src={userInfo.userImgUrl} alt="" />
            ) : (
              <img src="/essets/room/none.png" alt="" />
            )}

            <div className={tog ? "hidden" : ""}>
              <div>{userInfo.userNick}</div>
              <div>follower : {userInfo.followerCnt}</div>
              <div> following : {userInfo.followeeCnt}</div>
            </div>
          </>
        ) : (
          <>로딩중..</>
        )}
      </Head>
      <BodyWrapper>
        <Body className={tog ? "close" : "open"}>
          <Absol>{shopTog ? null : <StoreModal></StoreModal>}</Absol>
          <Absol>{visitTog ? null : <VisitModal></VisitModal>}</Absol>
          <Absol>{musicTog ? null : <MusicModal></MusicModal>}</Absol>
          <Absol>{userTog ? null : <UserModal></UserModal>}</Absol>
          <div className="Icon">
            <img
              onClick={() => {
                openMusic();
              }}
              className="Mimg"
              src="/essets/room/music.png"
            />
            <div className={tog ? "hidden" : "content"}>
              {musicList ? (
                <AudioPlayer tracks={musicList} />
              ) : (
                <div>음악이 없어요 사러 가볼까요?</div>
              )}
            </div>
          </div>

          <div className="Icon" onClick={() => gotoHome()}>
            <img className="Mimg" src="/essets/room/home.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <p>Home</p>
            </div>
          </div>
          <div
            className="Icon"
            onClick={() => {
              openShop();
            }}
          >
            <img className="Mimg" src="/essets/room/store.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <p>store</p>
            </div>
          </div>
          <div
            className="Icon"
            onClick={() => {
              openVisit();
            }}
          >
            <img className="Mimg" src="/essets/room/visit.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <p>Guest Book</p>
            </div>
          </div>
          <div
            className="Icon"
            onClick={() => {
              openUser();
            }}
          >
            <img className="Mimg" src="/essets/room/visit.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <p>UserList</p>
            </div>
          </div>
          {itsMe ? (
            <div className="Icon" onClick={() => ClickModeChange()}>
              <img
                className="Mimg"
                src="/essets/room/hammer.png"
                alt="사진없노"
              />
              <div className={tog ? "hidden" : "content"}>
                <p>Editing</p>
              </div>
            </div>
          ) : null}
        </Body>
        <BottomItem className={tog ? "close" : "open"}>
          <div className="Bottom">
            <img src="/essets/room/move.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <Tooltip title="Random User">
                <button>
                  <img className="user" src="/essets/room/random.png" alt="" />
                </button>
              </Tooltip>
              <Tooltip title="Search User">
                <button>
                  <img className="user" src="/essets/room/search.png" alt="" />
                </button>
              </Tooltip>
            </div>
          </div>
        </BottomItem>
      </BodyWrapper>
    </Wrapper>
  );
};

export default UIBar;
