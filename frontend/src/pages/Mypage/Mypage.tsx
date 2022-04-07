import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/Card/ItemCard";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SaleModal from "../../components/Store/SaleModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReplayIcon from '@mui/icons-material/Replay';
import Tooltip from "@mui/material/Tooltip";
import { QueryClient, useMutation, useQuery } from "react-query";
import FollowModal from "../../components/Mypage/FollowModal";
import { deleteFollow, getFollowee, getFollower, postFollow } from "../../store/apis/follow";
import { getUsercollectedInfo, getUsercreatedInfo, getUserfavoritesInfo, getUserTradeInfo, getUserInfo } from "../../store/apis/user";
import bg from "../../essets/images/login_background.png"
import GameStartButton2 from "./GameStartButton2";
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"
import IsLoading2 from "../NFTStore/IsLoading2";
import { randomwords, words } from "../NFTStore/words";
const MypageWrapper = styled.div`
  box-shadow: 1px 1px 1px;
  font-family: "Noto Sans KR", sans-serif;
  /* width:100%; */
`;
const Background = styled.div`
  width: 100%;
  height: 500px;
  background: url("https://media4.giphy.com/media/2tNvsKkc0qFdNhJmKk/giphy.gif");
  background-size: cover;
`;

const ProfileWrapper = styled.div`
  box-shadow: 1px 1px 3px;
  background-color: #faf3f3b1;
  display: flex;
  align-items: center;
  width: 1300px;
  height: 350px;
  border-radius: 10px;
  margin: auto;
  margin-top: -450px;
`;

const FollowTextBox = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  span {
    cursor: pointer;
    font-size: 22px;
    font-weight: 500;
    div {
      display: inline;
      font-weight: 600;
      margin-right: 15px;
    }
  }
  .blue{
    color:#4d4df8;
  }
`

const FilterBar = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin: auto;
  margin-top: 150px;
  width: 70vw;
  display: flex;
  div {
    cursor: pointer;
    flex: 2.5;
    height: 6vh;
    text-align: center;
    &:hover {
      background-color: whitesmoke;
      transition: 0.3s;
    }
    p {
      font-size: 2.5vh;
      margin-top: 1vh;
      font-weight: 600;
    }
  }
  div {
    border-bottom: 2px solid #6225E6  ;
  }

  #select {
    background-color: white;
    border-left: 2px solid #6225E6  ;
    border-right: 2px solid #6225E6  ;
    border-top: 2px solid #6225E6  ;
    border-bottom: none;
    color: #6225E6  ;
    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

const ProfileImg = styled.div`
  margin: 3vh;
  margin-left: 5vh;
  img {
    width: 200px;
    height: 200px;
    border-radius: 100%;
  }
`;

const Profile = styled.div`
  /* position: absolute; */
  margin-left: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* top: 0px; */
  /* left: 300px; */
  width: 1000px;
  h1 {
    font-size: 14px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 12px;
  }
  .profilesetting{
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 600;
    background-color: #7272fe  ;
    width: 200px;
    height: 40px;
    font-size: 18px;
    margin-top: 3vh;
    &:hover {
      transition: 0.2s;
      background-color: #7e7ef8  ;
    }
  }
  .gamestartbutton{
    /* margin-top: 1vh; */
  }
  .joinRoomBtn {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 600;
    background-color: #7272fe  ;
    border-radius:15px;
    color: white;
    width: 14vw;
    height: 5vh;
    font-size: 2.2vh;
    &:hover {
      transition: 0.2s;
      background-color: #5615e2  ;
    }
    width: 450px;
    height: 100px;
    font-size: 35px;
  }
`;

const ProfileName = styled.div`
    margin-top: 20px;
    position: relative;
    margin-left: 10px;
  span {
    font-size: 2.5rem;
    font-weight: bold;
  }
  img {
    margin-top: 20px;
    position: absolute;
    margin-left: 10px;
    width: 25px;
    height: auto;
  }
`

const ItemCards = styled.div`
  margin: auto;
  margin-top: 10vh;
  width: 85vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Card = styled.div`
  button {
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  margin-bottom: 3px;
  width: 79vw;
  padding: 10px;     
  border-radius: 5px;
           
  div{
    flex:1;
    text-align: center;
  }
  .event{
    text-align: start;
    margin-left: 2vw;
  }
  .title{
    margin-left: -2vw;
  }
  .price{
  }
  .from{
  }
  .to{

  }
  .date{

  }
`;
const ISL = styled.div`.ISL{
  margin-top: -5vh;

}
.loading{
  text-align: center;
  font-size: 2.5vh;
  font-weight: 600;
  margin-top: -7vh;
}
  text-align: center;
  margin-top: -20px;
  .loading{
    font-size: 30px;
    margin-top: -50px;
    font-weight: 700;
  }
`

const ListCategory = styled.div`
  border: 1px solid #333;
  width: 80vw;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 2vh;
  border-bottom: 2px solid #333;
  border-radius: 5px;
  margin-bottom: 5px;
  div{
    flex: 1;
    text-align: center;
  }
`

export const Event = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  div{
    padding: 0;
    margin-left: 2px;
    font-weight: 500;
  }
`


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

interface IUsers {
  userAddress: string,
  userDescription: string,
  userEmail: string,
  userImgUrl: string,
  userNick: string,
  userRole: string,
  userId: number,
}

export default function Mypage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [status, setStatus] = useState("myNFT");
  const [followers, setFollowers] = useState<IUsers[]>([]);
  const [followees, setFollowees] = useState<IUsers[]>([]);
  const [isFollower, setIsFollower] = useState(false);
  const [followBtnState, setFollowBtnState] = useState<boolean | null>(null);
  const [myTokens, setMyTokens] = useState<any[]>([]);
  const [myMint, setMyMint] = useState<any[]>([]);
  const [myLikes, setMyLikes] = useState<any[]>([]);
  const [myHistory, setMyHistory] = useState<any[]>([]);
  const [item, setItem] = useState<any>();
  const [isLoading,setIsLoading]  = useState(false)
  //모달창
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const {userId}= useParams()

  const handleOpen = (item) => {
    setItem(item)
    console.log(item)
    setOpen(true);
  }


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
        console.log("내정보를 받아왔습니다.");
        await setUserInfo(res);
        console.log(userInfo);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  );

  const getUserFollower = useMutation<any, Error>(
    "getFollower",
    async () => {
      return await getFollowee(Number(userId));
    },
    {
      onSuccess: async (res) => {
        await setFollowers(res)
        console.log("팔로워들", res);
        const userIds = res.map((user) => user.userId);
        console.log(userIds);
        if (userIds.includes(Number(sessionStorage.getItem("userId")))) {
          setFollowBtnState(false);
        } else {
          setFollowBtnState(true);
        }
      },
      onError: (err: any) => {
        console.log("에러발생", err);
      },
    }
  );

  const getUserFollowee = useMutation<any, Error>(
    "getFollower",
    async () => {
      return await getFollower(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("팔로우들", res);
        await setFollowees(res)
      },
      onError: (err: any) => {
        console.log("에러발생", err);
      },
    }
  )

  const follow = useMutation<any, Error>(
    "follow",
    async () => {
      return await postFollow(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("팔로우요청 성공", res);
        await getMyInfo.mutate();
        getUserFollower.mutate()
      },
      onError: (err: any) => {
        console.log("에러발생", err);
      },
    }
  )

  const unFollow = useMutation<any, Error>(
    "unFollow",
    async () => {
      return await deleteFollow(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("언팔로우요청 성공", res);
        await getMyInfo.mutate();
        getUserFollower.mutate()
      },
      onError: (err: any) => {
        console.log("에러발생", err);
      },
    }
  )

  const onClickFollow = async () => {
    followBtnState? follow.mutate() : unFollow.mutate()
    setFollowBtnState(!followBtnState)
  }


  const getMyNFT = useMutation<any, Error>(
    "getMyNFT",
    async () => {
      setIsLoading(true)
      return await getUsercollectedInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가가진 NFT들", res);
        setMyTokens(res.content.reverse())
        setIsLoading(false)
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
        setIsLoading(false)
      },
    }
  ); 

  const getMyMint = useMutation<any, Error>(
    "getMyMint",
    async () => {
      setIsLoading(true)
      return await getUsercreatedInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가민팅한 NFT들", res);
        setMyMint(res.content.reverse())
        setIsLoading(false)

      },
      onError: (err: any) => {
        console.log(err, "에러발생");
        setIsLoading(false)

      },
    }
  ); 

  const getMyLikes = useMutation<any, Error>(
    "getMyLikes",
    async () => {
      setIsLoading(true)
      return await getUserfavoritesInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가좋아요한 NFT들", res);
        setMyLikes(res.content.reverse())
        setIsLoading(false)

      },
      onError: (err: any) => {
        console.log(err, "에러발생");
        setIsLoading(false)

      },
    }
  ); 

  const getMyHistory = useMutation<any, Error>(
    "getMyHistory",
    async () => {
      setIsLoading(true)
      return await getUserTradeInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("나의 활동내역", res);
        setMyHistory(res.content)
        setIsLoading(false)

      },
      onError: (err: any) => {
        console.log(err, "에러발생");
        setIsLoading(false)

      },
    }
  ); 

  const handleModalOpen = (type:string) => {
    setIsOpen(true);
    if (type ==="follower") {
      setIsFollower(true)
    } else {
      setIsFollower(false)
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  
  const dealTypeConvert = (dealType) => {
    switch (dealType) {
      case 1: // 경매등록
        return <div className="event"><ShoppingCartIcon /><span>Create auction</span></div>
      case 2: // 판매등록
        return <div className="event"><ShoppingCartIcon /><span>Create Sale</span></div>
      case 3: // 경매참여
        return <div className="event"><LocalOfferIcon /><span>Bid</span></div>
      case 4: // 판매취소
        return <div className="event"><ReplayIcon /><span>Cancel sale</span></div>
      case 5: // 소유권 전달
        return <div className="event"><CompareArrowsIcon /><span>Transfer</span></div>
      case 6: // 민팅
        return <div className="event"><ChildFriendlyIcon /><span>Minted</span></div>
      default:
        return "알수없는 dealType"
    }
  };

  const getVerifiedMark = (userType: string|undefined) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return <img src={influencer} alt="mark" />;
      case "ROLE_ARTIST":
        return <img src={artist} alt="mark" />;
      case "ROLE_ENTERPRISE":
        return <img src={enterprise} alt="mark" />;
      default:
        return;
    }
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getMyInfo.mutate();
    getUserFollowee.mutate();
    getUserFollower.mutate();
    getMyNFT.mutate();
  }, [userId]);
  
  // useEffect(() => {
  //   isFollowThisUser();
  // }, [followers])
  
  return (
    <>
      <MypageWrapper>
        <Background/>
        <ProfileWrapper>
          <ProfileImg>
            <img
              src={
                userInfo?.userImgUrl
                  ? userInfo.userImgUrl
                  : "http://kaihuastudio.com/common/img/default_profile.png"
              }
              alt="프로필"
            />
          </ProfileImg>
          <Profile>
            <div>
              <ProfileName>
                <span>{userInfo?.userNick}</span>
                {getVerifiedMark(userInfo?.userRole)}
              </ProfileName>

              <FollowTextBox>
                <span onClick={() => handleModalOpen("follower")}>
                  팔로워 <div className="blue">{userInfo?.followerCnt}</div>{" "}
                </span>
                <span onClick={() => handleModalOpen("followee")}>
                  팔로우 <div className="blue">{userInfo?.followeeCnt}</div>{" "}
                </span>
              </FollowTextBox>
              {Number(sessionStorage.getItem("userId")) === userInfo?.userId ? (
                <Button
                  className="profilesetting"
                  onClick={() => {
                    navigate("/profilesetting");
                  }}
                  variant="contained"
                >
                  프로필 수정
                </Button>
              ) : (
                <Button
                  className="profilesetting"
                  variant="contained"
                  onClick={onClickFollow}
                >
                  {followBtnState ? "Follow" : "Unfollow"}
                </Button>
              )}
            </div>
            {/* ⭐ 남의방일 때만 방입장 보이게 ? */}
            {/* <button className="joinRoomBtn">방입장</button> */}
            <div className="gamestartbutton">
            <GameStartButton2 userNick={userInfo?.userNick} />
            </div>
          </Profile>
        </ProfileWrapper>
      </MypageWrapper>
      <FilterBar>
        <div
          id={status === "myNFT" ? "select" : ""}
          onClick={() => {
            setStatus("myNFT");
            getMyNFT.mutate();
          }}
          className="myNFT"
        >
          <p>내가 가진 </p>
        </div>
        <div
          id={status === "myMint" ? "select" : ""}
          onClick={() => {
            setStatus("myMint");
            getMyMint.mutate();
          }}
          className="myMint"
        >
          <p>내가 등록한</p>
        </div>
        <div
          id={status === "myLikes" ? "select" : ""}
          onClick={() => {
            setStatus("myLikes");
            getMyLikes.mutate();
          }}
          className="myLikes"
        >
          <p>좋아요한</p>
        </div>
        <div
          id={status === "history" ? "select" : ""}
          onClick={() => {
            setStatus("history");
            getMyHistory.mutate();
          }}
          className="history"
        >
          <p>활동내역</p>
        </div>
      </FilterBar>
      {isLoading && 
      <ISL>
        <IsLoading2/>
        <div className="loading">
          {randomwords}
        </div>
      </ISL>}
      {!isLoading &&
      <>
      {status === "myNFT" && (
        <ItemCards>
          {myTokens.map((item, idx) => {
            return (
              <Card  key={idx}>
                <ItemCard item={item} handleOpen={handleOpen} />
              </Card>
            );
          })}
        </ItemCards>
      )}
      {status === "myMint" && (
        <ItemCards>
          {myMint.map((item, idx) => {
            return (
              <Card key={idx}>
                <ItemCard  item={item} handleOpen={handleOpen} />
              </Card>
            );
          })}
        </ItemCards>
      )}
      {status === "myLikes" && (
        <ItemCards>
          {myLikes.map((item, idx) => {
            return (
              <Card key={idx}>
                <ItemCard  item={item} handleOpen={handleOpen} />
              </Card>
            );
          })}
        </ItemCards>
      )} </>}
      {status === "history" && (
        <List>
          <ListCategory>
            <div>Event</div>
            <div>product</div>
            <div>Price</div>
            <div>From</div>
            <div>To</div>
            <div>Date</div>
          </ListCategory>
          {myHistory.map((history, idx) => {
            return (
              <ListItem key={idx}>
                <div className="event">{dealTypeConvert(history.dealType)}</div>
                <div className="title">{history.productTitle}</div>
                <div className="price">{history.dealPrice}</div>
                <div className="from">{history.dealFromUserNick}</div>
                <div className="to">{history.dealToUserNick}</div>
                <div className="date">{history.dealCreatedAt}</div>
                {/* <div className="id">{dealTypeConvert(history.dealType)}</div> */}
              </ListItem>
            );
          })}
        </List>
      )}
      <SaleModal open={open} setOpen={setOpen} item={item} />
      <FollowModal
        visible={isOpen}
        onClose={handleModalClose}
        userId={Number(userId)}
        isFollower={isFollower}
        followers={followers}
        followees={followees}
      ></FollowModal>
    </>
  );
}
