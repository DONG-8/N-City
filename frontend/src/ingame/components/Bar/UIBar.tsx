import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Wrapper,
  Head,
  ToggleBtn,
  BodyWrapper,
  Body,
  Absol,
  BottomItem,
  NonMusicDiv,
  BottomWrap,
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
import { postRandomJoin } from "../../../store/apis/myRoom";
import SearchModal from "../seatchbar/SearchModal";
import { Button } from "@mui/material";
import {
  deleteFollow,
  getFollowee,
  postFollow,
} from "../../../store/apis/follow";
import influencer from "../../../essets/images/influencer-mark.png";
import artist from "../../../essets/images/artist-mark.png";
import enterprise from "../../../essets/images/enterprise-mark.png";

interface Iprops {
  today: Number;
  total: Number;
}

interface IUserInfo {
  userId: number;
  authId: number;
  userAddress: string;
  userRole: string;
  userNick: string;
  userEmail: string;
  userEmailConfirm: boolean;
  userDescription: string;
  userImgUrl: string;
  followerCnt: number;
  followeeCnt: number;
}

const UIBar: React.FC<Iprops> = ({ today, total }) => {
  const [musicList, setMusic] = useState();
  const dispatch = useAppDispatch();
  const [tog, setTog] = useState(true);
  const [musicTog, setMusicTog] = useState(true);
  const [shopTog, setShopTog] = useState(true);
  const [visitTog, setVisitTog] = useState(true);
  const [userTog, setUserTog] = useState(true);
  const [searchTog, setSearchTog] = useState(true);
  const [followBtnState, setFollowBtnState] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const { userId } = useParams();
  const numId = Number(userId);
  const navigate = useNavigate();
  const myId = sessionStorage.getItem("userId");

  let itsMe;
  if (myId === userId) {
    itsMe = true;
  } else {
    itsMe = false;
  }

  const goRandom = useMutation<any, Error>(
    "Randomgogo",
    async () => {
      return await postRandomJoin();
    },
    {
      onSuccess: (res) => {
        navigate(`/ingame/${res.userId}`);
        window.location.reload();
      },
    }
  );

  const getMyInfo = useMutation<any, Error>(
    "getUserInfo",
    async () => {
      if (userId) {
        return await getUserInfo(Number(userId));
      } else {
        alert("내 정보를 받아올 수 없습니다.");
        return;
      }
    },
    {
      onSuccess: async (res) => {
        await setUserInfo(res);
      },
      onError: (err: any) => {
      },
    }
  );

  const getUserFollower = useMutation<any, Error>(
    "getFollower",
    async () => {
      return await getFollowee(Number(userId));
    },
    {
      onSuccess: (res) => {
        const userIds = res.map((user) => user.userId);
        if (userIds.includes(Number(sessionStorage.getItem("userId")))) {
          setFollowBtnState(false);
        } else {
          setFollowBtnState(true);
        }
      },
      onError: (err: any) => {
      },
    }
  );

  const follow = useMutation<any, Error>(
    "follow",
    async () => {
      return await postFollow(Number(userId));
    },
    {
      onSuccess: async (res) => {
        await getMyInfo.mutate();
        // getUserFollower.mutate()
      },
      onError: (err: any) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
    }
  );

  const unFollow = useMutation<any, Error>(
    "unFollow",
    async () => {
      return await deleteFollow(Number(userId));
    },
    {
      onSuccess: async (res) => {
        await getMyInfo.mutate();
        // getUserFollower.mutate()
      },
      onError: (err: any) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
    }
  );

  const onClickFollow = async () => {
    followBtnState ? follow.mutate() : unFollow.mutate();
    setFollowBtnState(!followBtnState);
  };

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
        if (res.content.length !== 0) {
          const music = res.content.filter((obj, i) => {
            return obj.productCode === 1;
          });
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
          dispatch(setMusicList(MusicArray));
          setMusic(MusicArray);
        }
      },
    }
  );
  // const { data: userInfo, isLoading: userInfoLoading } = useQuery<any>(
  //   "sideuserInfo",
  //   async () => {
  //     return await getUserInfo(numId);
  //   }
  // );

  // room 이동 요청
  // get 해당 유저의 id , 데이터 변경 , post 요청 입장, route 주소 변경
  // Ramdom 로직 확인 후 분할 혹은 병합

  const getVerifiedMark = (userType: string | undefined) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return (
          <img
            className="mark"
            src={influencer}
            title="influencer"
            alt="mark"
          />
        );
      case "ROLE_ARTIST":
        return <img className="mark" src={artist} title="artist" alt="mark" />;
      case "ROLE_ENTERPRISE":
        return (
          <img
            className="mark"
            src={enterprise}
            title="enterprise"
            alt="mark"
          />
        );
      default:
        return;
    }
  };

  const toggle = () => {
    setTog(!tog);
  };

  const gotoHome = () => {
    // return <Navigate to="/" />;
    navigate("/");
    (window as any).game.destroy(true);
    window.location.reload();
  };

  const ClickModeChange = () => {
    dispatch(EditModeChange());
  };

  const onClickMyRoom = () => {
    navigate(`/ingame/${sessionStorage.getItem("userId")}`);
    window.location.reload();
  };

  const openMusic = () => {
    setMusicTog(!musicTog);
    setShopTog(true);
    setVisitTog(true);
    setUserTog(true);
    setSearchTog(true);
  };

  const openShop = () => {
    setMusicTog(true);
    setShopTog(!shopTog);
    setVisitTog(true);
    setUserTog(true);
    setSearchTog(true);
  };

  const openVisit = () => {
    setMusicTog(true);
    setShopTog(true);
    setVisitTog(!visitTog);
    setUserTog(true);
    setSearchTog(true);
  };

  const openUser = () => {
    setMusicTog(true);
    setShopTog(true);
    setVisitTog(true);
    setUserTog(!userTog);
    setSearchTog(true);
  };

  const openSearch = () => {
    setMusicTog(true);
    setShopTog(true);
    setVisitTog(true);
    setUserTog(true);
    setSearchTog(!searchTog);
  };

  useEffect(() => {
    getUserFollower.mutate();
    getMyInfo.mutate();
  }, []);

  return (
    <Wrapper>
      {/* <Head className={tog ? "close" : "open"}> */}
      <Head className={tog ? "close" : "open"}>
        <ToggleBtn onClick={() => toggle()}>
          <img
            alt=""
            className={tog ? "changeButton" : "button"}
            src="/essets/room/arrow-left-circle.png"
          ></img>
        </ToggleBtn>
        {userInfo ? (
          <div className="head">
            {userInfo.userImgUrl ? (
              <img className="onHiddenImg" src={userInfo.userImgUrl} alt="" />
            ) : (
              <img src="/essets/room/none.png" alt="" />
            )}
            <div className={tog ? "hidden" : "profileBox"}>
              <div className="content">
                <div className="top">
                  <div className="nick">
                    {userInfo.userNick}
                    <span>{getVerifiedMark(userInfo.userRole)}</span>
                  </div>
                </div>
                <div className="bottom">
                  <div>
                    <div>TOTAL : {total}</div>
                    <div>TODAY : {today}</div>
                    {/* <div>팔로워 : {userInfo?.followerCnt}</div>
                  <div>팔로잉 : {userInfo?.followeeCnt}</div> */}
                  </div>
                  <div>
                    {userInfo.userId !==
                      Number(sessionStorage.getItem("userId")) && (
                      <Button
                        className="profilesetting"
                        variant="contained"
                        onClick={onClickFollow}
                      >
                        {followBtnState ? "Follow" : "Unfollow"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>로딩중..</>
        )}
      </Head>
      <BodyWrapper>
        <Body className={tog ? "close" : "open"}>
          <Absol>
            {shopTog ? null : <StoreModal setOpen={setShopTog}></StoreModal>}
          </Absol>
          <Absol>
            {visitTog ? null : <VisitModal setOpen={setVisitTog}></VisitModal>}
          </Absol>
          <Absol>
            {musicTog ? null : <MusicModal setOpen={setMusicTog}></MusicModal>}
          </Absol>
          <Absol>
            {searchTog ? null : (
              <SearchModal setOpen={setSearchTog}></SearchModal>
            )}
          </Absol>
          <div className="Icon">
            <img
              alt=""
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
                <NonMusicDiv
                  onClick={() => {
                    openShop();
                  }}
                >
                  <p>
                    음악이 없어요
                    <br /> 사러 가볼까요?
                  </p>
                </NonMusicDiv>
              )}
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
          <div className="Icon" onClick={() => gotoHome()}>
            <img className="Mimg" src="/essets/room/move.png" alt="사진없노" />
            <div className={tog ? "hidden" : "content"}>
              <p>Home</p>
            </div>
          </div>
        </Body>

        <BottomItem className={tog ? "close" : "open"}>
          <BottomWrap>
            {userInfo?.userId !== Number(sessionStorage.getItem("userId")) && (
              <Tooltip title="My Room">
                <img
                  onClick={onClickMyRoom}
                  src="/essets/room/home.png"
                  alt="사진없노"
                  style={{ margin: "auto" }}
                />
              </Tooltip>
            )}

            <div className={tog ? "hidden" : "content"}>
              <Tooltip title="Random User">
                <button onClick={() => goRandom.mutate()}>
                  <img className="user" src="/essets/room/random.png" alt="" />
                </button>
              </Tooltip>
              <Tooltip title="Search User">
                <button onClick={openSearch}>
                  <img className="user" src="/essets/room/search.png" alt="" />
                </button>
              </Tooltip>
            </div>
          </BottomWrap>
        </BottomItem>
      </BodyWrapper>
    </Wrapper>
  );
};

export default UIBar;
