import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/Card/ItemCard";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SaleModal from "../../components/Store/SaleModal";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Tooltip from "@mui/material/Tooltip";
import { items as itm } from "../NFTStore/items";
import { QueryClient, useMutation, useQuery } from "react-query";
import FollowModal from "../../components/Mypage/FollowModal";
import { deleteFollow, getFollowee, getFollower, postFollow } from "../../store/apis/follow";
import { getUsercollectedInfo, getUsercreatedInfo, getUserfavoritesInfo, getUserTradeInfo, getUserInfo } from "../../store/apis/user";
import bg from "../../essets/images/login_background.png"

const MypageWrapper = styled.div`
  box-shadow: 1px 3px 7px;
`;
const Background = styled.div`
  width: 100%;
  height: 50vh;
  img {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;
const ProfileWrapper = styled.div`
  box-shadow: 1px 1px 3px;

  background-color: #faf3f399;
  position: absolute;
  top: 20vh;
  left: 8vw;
  width: 85vw;
  height: 30vh;
  border-radius: 10px;
`;
const Wallet = styled.div`
  background-color: white;
  position: absolute;
  top: 2vh;
  left: 54vw;
  width: 30vw;
  height: 15vh;

  .border {
    display: flex;
    border: 1px solid gray;
    width: 98%;
    height: 90%;
    margin: auto;
    margin-top: 0.5vh;
    div {
      flex: 2.5;
      height: 100%;
      border-right: 1px solid gray;
      justify-content: center;
      text-align: center;
      .number {
        font-weight: 1000;
        font-size: 3vh;
      }
      .description {
        font-size: 2vh;
        color: gray;
      }
    }
  }
`;
const FilterBar = styled.div`
  margin: auto;
  margin-top: 3vh;
  width: 70%;
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
      font-weight: 1000;
    }
  }
  div {
    /* background-color: #F5B6A0; */
    border-bottom: 2px solid #f43b00;
  }

  #select {
    background-color: white;
    border-left: 2px solid #f43b00;
    border-right: 2px solid #f43b00;
    border-top: 2px solid #f43b00;
    border-bottom: none;
    color: #ff7248;
    &:hover {
      background-color: #f9f9f9;
      transition: 0.3s;
    }
  }
`;
const ProfileImg = styled.div`
  margin: 3vh;
  img {
    width: 13vw;
    height: 25vh;
    border-radius: 100%;
  }
`;
const Profile = styled.div`
  position: absolute;
  top: 2vh;
  left: 18vw;
  h1 {
    font-size: 5vh;
  }
  h2 {
    font-size: 3vh;
  }
  button {
    font-weight: 1000;
    background-color: #e89669;
    width: 14vw;
    height: 5vh;
    font-size: 2.2vh;
    &:hover {
      transition: 0.2s;
      background-color: #f08850;
    }
  }
`;
const ItemCards = styled.div`
  margin: auto;
  margin-top: 10vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Card = styled.div`
  button {
    position: absolute;
    margin-left: 10rem;
    margin-top: -4rem;
    font-size: 1.5rem;
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
  width: 80%;
  padding: 10px;
  .id {
    width: 12%;
    margin-left: 20px;
  }
  .name {
    width: 12%;
  }
  .email {
    width: 30%;
  }
`;

const ListCategory = styled.div`
  border: 1px solid teal;
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Event = styled.div`
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
interface Iitem{
  productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
    productFavoriteUser:{
      authId: Number,
      userAddress: string,
      userDescription: string,
      userEmail: string,
      userEmailConfirm: boolean,
      userId: number,
      userImgUrl: string,
      userNick: string,
      userRole: string,
    }[]
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
  const [dealTypeMean, setDealTypeMean] = useState<string>("");
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
        if (userIds.includes(Number(localStorage.getItem("userId")))) {
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
      return await getUsercollectedInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가가진 NFT들", res);
        setMyTokens(res.content)
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  ); 

  const getMyMint = useMutation<any, Error>(
    "getMyMint",
    async () => {
      return await getUsercreatedInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가민팅한 NFT들", res);
        setMyMint(res.content)
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  ); 

  const getMyLikes = useMutation<any, Error>(
    "getMyLikes",
    async () => {
      return await getUserfavoritesInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("내가좋아요한 NFT들", res);
        setMyLikes(res.content)
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  ); 

  const getMyHistory = useMutation<any, Error>(
    "getMyHistory",
    async () => {
      return await getUserTradeInfo(Number(userId));
    },
    {
      onSuccess: async (res) => {
        console.log("나의 활동내역", res);
        setMyHistory(res.content)
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
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
        return <Event><ShoppingCartIcon /><div>Create auction</div></Event>
      case 2: // 판매등록
        return <Event><ShoppingCartIcon /><div>Create Sale</div></Event>
      case 3: // 경매참여
        return <Event><LocalOfferIcon /><div>Bid</div></Event>
      case 5: // 소유권 전달
        return <Event><CompareArrowsIcon /><div>Transfer</div></Event>
      case 6: // 민팅
        return <Event><ChildFriendlyIcon /><div>Minted</div></Event>
      default:
        return "알수없는 dealType"
    }
  };

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
        <Background>
          <img alt="배경" src={bg} />
        </Background>
        <ProfileWrapper>
          <ProfileImg>
            <img
              src={userInfo?.userImgUrl? userInfo.userImgUrl : "http://kaihuastudio.com/common/img/default_profile.png"}
              alt="프로필"
            />
          </ProfileImg>
          <Profile>
            <h1>{userInfo?.userNick}</h1>
            <div>
              <span onClick={() => handleModalOpen("follower")}>팔로워 {userInfo?.followerCnt} </span>
              <span onClick={() => handleModalOpen("followee")}>팔로우 {userInfo?.followeeCnt} </span>
            </div>
            {Number(localStorage.getItem("userId")) === userInfo?.userId ? 
            <Button
              onClick={() => {
                navigate("/profilesetting");
              }}
              color="warning"
              variant="contained"
            >
              프로필 수정
            </Button> : 
            <button onClick={onClickFollow}>{followBtnState?"팔로우":"언팔로우"}</button>
            }
          <button>방입장</button>
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
      {status === "myNFT" &&
      <ItemCards>
        {myTokens.map((item, idx) => {
          return (
            <Card>
              <ItemCard key={idx} item={item} />
              {
                item.productState === 3 ? <Tooltip title="판매하기">
                <Button onClick={() => handleOpen(item)}>
                  <SellIcon />
                </Button>
              </Tooltip> :
                (item.productState === 1 ? <div>경매중 {item.productPrice}NCT</div> : <div>판매중 {item.productPrice}NCT</div>)
              }
            </Card>
          );
        })}
      </ItemCards>}
      {status === "myMint" &&
      <ItemCards>
        {myMint.map((item, idx) => {
          return (
            <Card>
              <ItemCard key={idx} item={item} />
            </Card>
          );
        })}
      </ItemCards>}
      {status === "myLikes" &&
      <ItemCards>
        {myLikes.map((item, idx) => {
          return (
            <Card>
              <ItemCard key={idx} item={item} />
            </Card>
          );
        })}
      </ItemCards>}
      {status === "history" && (
        <List>
        <ListCategory>
          <div>Event</div>
          <div>Price</div>
          <div>From</div>
          <div>To</div>
          <div>Date</div>
        </ListCategory>
        {myHistory.map((history, idx) => {
          return (
            <ListItem key={idx}>
              <div>{dealTypeConvert(history.dealType)}</div>
              <div>{history.dealPrice}</div>
              <div>{history.dealFromUserNick}</div>
              <div>{history.dealToUserNick}</div>
              <div>{history.dealCreatedAt}</div>
              {/* <div className="id">{dealTypeConvert(history.dealType)}</div> */}
            </ListItem>
          );
        })}
      </List>
      )}
      <SaleModal open={open} setOpen={setOpen} item={item}/>
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
