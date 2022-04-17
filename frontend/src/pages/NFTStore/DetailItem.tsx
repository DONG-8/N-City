import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import {
  getProductAll,
  getProductDetail,
  getSellProduct,
} from "../../store/apis/product";
import { getUsercollectedInfo, getUserInfo } from "../../store/apis/user";
import {
  delProductLike,
  getProductLike,
  postProductLike,
} from "../../store/apis/favorite";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import ItemCard2 from "../../components/Card/ItemCard2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DealModal from "./DealModal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BidBox from "./BidBox";
import { deleteFollow, getFollowee, postFollow } from "../../store/apis/follow";
import { getPastHistory, postCancelPurchase } from "../../store/apis/deal";
import { createSaleContract, SaleFactoryContract } from "../../web3Config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReplayIcon from '@mui/icons-material/Replay';
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"

function NextArrow(props) {
  const { className, style, onClick } = props;
  return <RCricle onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return <LCricle onClick={onClick} />;
}

const RCricle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z'/%3E%3C/svg%3E");
  position: absolute;
  top: 200px;
  right: -80px;
  cursor: pointer;
`;

const LCricle = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z'/%3E%3C/svg%3E");
  position: absolute;
  top: 200px;
  left: -80px;
`;

const settings = {
  dots: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const MainBannerWrapper = styled.div`
  padding-top: 5vh;
  width: 90vw;
  height: 450px;
  color: black;
  margin: 0 auto;
  background-color: #f7f8fa;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin-bottom: 10vh;
`;

const Wrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  .loadingbox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin-top: -60px;
      font-size: 38px;
      font-weight: 600;
    }
    img {
      width: 300px;
      height: 300px;
    }
  }
  .title2{
    margin-left: 5vw;
  }
  .color{
    color:#6225E6  ;
  }
`;

const Top = styled.div`
  width: 90vw;
  height: 70vh;
  margin: auto;
  margin-top: 10vh;
  display: flex;
  margin-bottom: 10vh;
`;
const TopL = styled.div`
  flex: 4;
`;
const UserBox = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);
  height: 55%;
  background-color: #f7f8fa;
  border-radius: 30px;
  overflow-y: scroll;
  .top {
    display: flex;
    align-items: center;
    margin-left: 2vw;
    /* justify-content: center; */
  }
  .mid {
    margin-left: 2vw;
    display: flex;
    font-size: 1.8vh;

    .mid-l {
      .left {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-weight: 500;
      }
      flex: 1;
      button {
        font-size: 1.5vh;
      }
      span {
        font-weight: 600;
      }
    }
  }
  .profile { 
    border-radius: 100%;
    height: 12vh;
    width: 120px;
    margin: 5vh;
    margin-bottom: 2vh;
  }
  .nextpofileimg2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    button {
      width: 80%;
    }

  }
  .nextprofileimg {
    display: flex;
    position: relative;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin: 5px
    }
  }
  .name {
    color: #272793;
    font-size: 4vh;
    font-weight: 800;
  }
`;

const UserDescription = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);

  height: 26vh;
  margin-top: 5vh;
  background-color: #f7f8fa;
  border-radius: 30px;
  .title {
    padding-top: 2vh;
    margin-left: 2vw;
    font-size: 3.5vh;
    font-weight: 600;
  }
  .content {
    width: 90%;
    height: 15vh;
    font-size: 2vh;
    margin-left: 2vw;
    margin-top: 2vh;
    overflow-y: scroll;
  }
`;
const TopR = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);
  flex: 6;
  background-color: #f7f8fa;
  margin-left: 3vw;
  border-radius: 30px;
  .top {
    height: 50vh;
    display: flex;
    overflow-y: hidden;
  }
  .top-left {
    width: 25vw;
    .title {
      font-size: 5vh;
      font-weight: 600;
      margin-top: 3vh;
      margin-left: 2vw;
    }
    .content {
      margin-top: 3vh;
      margin-left: 2vw;
      display: flex;
      font-size: 2vh;
      font-weight: 500;
    }
  }
  .preview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    height: 40vh;
    width: 40vh;
    margin: 1vh 1vw;
    border-radius: 30px;
    border: 1px solid #e0dede;
  }
  .mediaBox {
    display: flex;
    justify-content: center;
    align-items: flex-start;
   
    video {
      width: 45vh;
      margin: 4vh 5vw 0 0;
    }
  }
`;

const Mid = styled.div`
  h1 {
    margin-top: 7vw;
    margin-left: 7vw;
    margin-bottom: 3vw;
  }
`;
const Description = styled.div`
  h3 {
    margin-left: 2vw;
    font-size: 3vh;
    margin-bottom: 10px;
  }
  .box {
    width: 26vw;
    height: 16.5vh;
    margin-left: 2vw;
    border-radius: 10px;
    overflow-y: scroll;
    p {
      /* margin-left: 1vw; */
      margin: 5px 0;
      font-size: 2vh;
      font-weight: 500;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  height: 20vh;
  .right {
    flex: 1;
    border-top: 0.5px solid #e0dede;
    .content {
      font-weight: 500;
    }
  }
`;
const ModalWrapper = styled.div`
  position: absolute;
  bottom: 10vh;
  right: 5vw;
  width: 80vw;
  height: 80vh;
  color: #eee;
  background: white;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 5px;
  padding: 15px 35px 15px 15px;

  .close {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .tip {
    margin-left: 12px;
  }
`;
const StoreWapper = styled.div`
  .nftstore {
    margin-left: 1vw;
    margin-top: 2vh;
    width: 80vw;
    height: 78vh;
    overflow: auto;
    color: black;
  }
`;

const FavoriteBox = styled.div`
  display: flex;
  align-items: center;
  .icon {

  }
  svg {
    cursor: pointer;
    margin-right: 5px;
  }
`;

const List = styled.div`
  background-color: #F7F8FA ;
  border-radius: 10px;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  max-height: 50vh;
  width: 91vw;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  margin: auto;
  overflow-y: auto;
  font-weight: bold;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  margin-bottom: 0.5vh;
  width: 89vw;
  padding: 10px;     
  border-radius: 5px;
           
  div{
    flex:1;
    text-align: center;
    font-weight: 500;
  }
  .event{
    text-align: start;
    margin-left: 3vw;
  }
  .price{
    margin-left: -3vw;
  }

`;

const ListCategory = styled.div`
  border: 1px solid #333;
  width: 90vw;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 2vh;
  border-bottom: 2px solid #333;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 2vh;
  div{
    flex: 1;
    text-align: center;
  }
`

interface Istate {
  item: {
    productId: number;
    productTitle: string;
    productPrice: Number;
    productThumbnailUrl: string;
    productFavorite: Number;
    productRegDt: Object;
    productCode: Number;
    productFavoriteUser: {
      authId: Number;
      userAddress: string;
      userDescription: string;
      userEmail: string;
      userEmailConfirm: boolean;
      userId: number;
      userImgUrl: string;
      userNick: string;
      userRole: string;
    }[];
  };
  itemdetail: {
    productId: Number;
    userId: Number;
    productTitle: string;
    productDesc: string;
    productCode: Number;
    productXCoordinate: Number;
    productYCoordinate: Number;
    productView: Boolean;
    productState: Number;
    productPrice: Number;
    productRegDt: string;
    productFileUrl: string;
    productThumbnailUrl: string;
    favoriteCount: Number;
  }; // 작가, 작가 정보, 거래 관련..
  user: {
    authId: Number;
    followeeCnt: Number;
    followerCnt: Number;
    userAddress: String;
    userDescription: String;
    userEmail: String;
    userEmailConfirm: Boolean;
    userId: Number;
    userImgUrl: String;
    userNick: String;
    userRole: String;
    mintUserId : String;
  };
  history: {
    dealCreatedAt: number[];
    dealFrom: number;
    dealFromNickName: string;
    dealPrice: number;
    dealTo: number;
    dealToNickName: string;
    dealType: number;
  };
}
const DetailItem = () => {
  // const [localitem, setLocalitem] = useState<Istate["item"]>(
  //   JSON.parse(sessionStorage.getItem("item") || "")
  // );
  const [likes, setLikes] = useState(Number(0));
  const [followers, setFollowers] = useState(0);
  const [followees, setFollowees] = useState(0);
  const [liked, setLiked] = useState(false); // 내가 좋아요 했나
  const [user, setUser] = useState<Istate["user"]>({
    authId: 0,
    followeeCnt: 0,
    followerCnt: 0,
    userAddress: "",
    userDescription: "",
    userEmail: "",
    userEmailConfirm: false,
    userId: 0,
    userImgUrl: "",
    userNick: "",
    userRole: "",
    mintUserId: ""
  });
  const [items, setItems] = useState<Istate["item"][]>([
  ]);
  const [followBtnState, setFollowBtnState] = useState<boolean | null>(null);

  // 모달창
  const [open, setOpen] = useState(false);

  // 1: bid , 2:sell , 3:normal
  const CATEGORY =['All','Music',' Picture','Video','Art','Celebrity','Sports','Character','Animation']
  const [status, setStatus] = useState("bid");
  const [MyAddress, setMyAddress] = useState(sessionStorage.getItem("userId"));
  const [productId, setProductId] = useState(useParams().productId);
  const [item, setItem] = useState({
    productId: -1,
    mintUserId: "",
    userId: 0,
    tokenId: 0,
    productTitle: "",
    productDesc: "",
    productCode: 0,
    productXCoordinate: 0,
    productYCoordinate: 0,
    productView: false,
    productState: 2,
    productPrice: 0,
    productRegDt: "",
    productFileUrl: "",
    productThumbnailUrl: "",
    productAuctionEndTime: null,
    favoriteCount: 0,
    userNick: ""
  });
  const [history, setHistory] = useState<Istate["history"][]>([])
  const [isImg, setIsImg] = useState(true)
  const [isLoading, setIsloading] = useState(true)
  const { ethereum } = window
  const navigate = useNavigate();

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

  const getVerifiedMark = (userType: string) => {
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

  const { isLoading: ILA, data: newItem } = useQuery<any>( // 추가 // 추천 데이터
    "getProductAll",
    async () => {
      return await getProductAll({ page: 1, size: 5 });
    },
    {
      onError: (err: any) => {
      },
    }
  );
  const getHistory = useMutation<any>( // 추가 // 추천 데이터
    "getPastHistory",
    async () => {
      if (!productId) return;
      return await getPastHistory(Number(productId));
    },
    {
      onSuccess: (res) => {
        const temp = res.content
        setHistory(temp)
      },
      onError: (err: any) => {
      },
    }
  );

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (var i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

  const { isLoading: ILC, data: collection } = useQuery<any>( // 이 유저가 가진 그림
    "getUserCollection",
    async () => {
      return await getUsercollectedInfo(Number(item.mintUserId));
    },
    {
      onError: (err) => {
      },
    }
  );

  const getLiked = useMutation<any, Error>(
    "getProductLike",
    async () => {
      return await getProductLike(Number(productId));
    },
    {
      onSuccess: (res) => {
        setLiked(res);
      },
    }
  );

  const getProduct = useMutation<any, Error>(
    "productDetail",
    async () => {
      return await getProductDetail(Number(productId));
    },
    {
      onSuccess: (res) => {
        setItem(res);
        setLikes(res.favoriteCount);
        getUser.mutate()
        setIsloading(false)
      },
      onError: (err: any) => {
      },
    }
  );

  const getUser = useMutation<any, Error>(
    "getuserdetail",
    async () => {
      if (!item.mintUserId) {
        return
      }
      return await getUserInfo(Number(item.mintUserId));
    },
    {
      onSuccess: (res) => {
        setUser(res);
        setFollowees(res.followeeCnt);
        setFollowers(res.followerCnt);
        getUserFollower.mutate()
      },
    }
  );

  const LikeIt = useMutation<any, Error>(
    "postProductLike",
    async () => {
      return await postProductLike(Number(productId));
    },
    {
      onSuccess: (res) => {
        setLiked(true);
      },
      onError: (err:any) => {
      if (err.response.status === 401) { 
        navigate("/login")
      }},
    }
  );

  const cancelLikeIt = useMutation<any, Error>(
    "delProductLike",
    async () => {
      return await delProductLike(Number(productId));
    },
    {
      onSuccess: (res) => {
        setLiked(false);
      },
      onError: (err:any) => {
      if (err.response.status === 401) { 
        navigate("/login")
      }},
    }
  );

  const follow = useMutation<any, Error>(
    "follow",
    async () => {
      return await postFollow(Number(item.mintUserId));
    },
    {
      onSuccess: (res) => {
        setFollowBtnState(false);
      },
      onError: (err:any) => {
      if (err.response.status === 401) { 
        navigate("/login")
      }},
      
    }
  );

  const unFollow = useMutation<any, Error>(
    "follow",
    async () => {
      return await deleteFollow(Number(item.mintUserId));
    },
    {
      onSuccess: (res) => {
        setFollowBtnState(true);
      },
      onError: (err:any) => {
      if (err.response.status === 401) { 
        navigate("/login")
      }}
    }
  );

  const getUserFollower = useMutation<any, Error>(
    "getFollower",
    async () => {
      if (!item.mintUserId) return;
      return await getFollowee(Number(item.mintUserId));
    },
    {
      onSuccess: async (res) => {
        // await setFollowers(res)
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

  const Like = () => {
    setLikes(likes + 1);
    LikeIt.mutate();
  };

  const cancelLike = () => {
    setLikes(likes - 1);
    cancelLikeIt.mutate();
  };

  const onClickFollow = () => {
    setFollowers(followers + 1);
    follow.mutate();
  };

  const onClickUnFollow = () => {
    setFollowers(followers - 1);
    unFollow.mutate();
  };

  const getStatus = () => {
    if (item.productState === 1) {
      setStatus("bid");
    }
    if (item.productState === 2) {
      setStatus("sell");
    }
    if (item.productState === 3) {
      setStatus("normal");
    }
  };

  const isImage = () => {
    const URL = item.productFileUrl.split(".")
    const temp = URL[URL.length - 1]
    const imgArr = ["jpg","JPG", "jpeg", "JPEG", "png", "PNG", "gif", "GIF", "bmp", "BMP", "tif", "TIF", "tiff", "TIFF"]
    if (imgArr.includes(temp)) {
      setIsImg(true)
    } else {
      setIsImg(false)
    }
  }

  useEffect(() => {
    getStatus();
    isImage()
  }, [item]);

  useEffect(() => {
    getProduct.mutate();
    getLiked.mutate();
    getHistory.mutate();
    window.scrollTo(0, 0);
  }, [productId]);
  
  useEffect(() => {
    getLiked.mutate();
  }, [likes]);

  const convertDate = (dateArray) => {
    const year = String(dateArray[0]);
    const month = String(dateArray[1]);
    const day = String(dateArray[2]);
    const hour = String(dateArray[3])
    const minute = String(dateArray[4])
    const second = String(dateArray[5] ? dateArray[5] : "00")
    return year + "-" + leadingZeros(month, 2) + "-" + leadingZeros(day, 2) + " " + leadingZeros(hour, 2) + ":" + leadingZeros(minute, 2)+ ":" + leadingZeros(second, 2)
  }

  useEffect(() => {
  }, [user]);

  if (newItem && collection) {
    if (items.length < 5) {
      setItems(items.concat(collection.content));
      setItems(items.concat(newItem.content));
    }
  }
  return (
    <Wrapper>
      {isLoading ? (
        <div className="loadingbox">
            <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
            <p className="text">작품 불러오는중...</p>{" "}
        </div>
      ) : (
        <>
          <Top>
            <TopL>
              {user !== undefined && (
                <>
                  <UserBox>
                    <div className="top">
                      <div className="nextpofileimg2">
                        {user.userImgUrl ? (
                          <img
                            className="profile"
                            src={user.userImgUrl as any}
                            alt="profile"
                          />
                        ) : (
                          <img
                            className="profile"
                            src="https://www.taggers.io/common/img/default_profile.png"
                            alt="profile"
                          />
                        )}
                        {sessionStorage.getItem("userId") &&
                          (Number(sessionStorage.getItem("userId")) ===
                          Number(item.mintUserId) ? null : followBtnState ? (
                            <Button
                              color="info"
                              variant="contained"
                              onClick={onClickFollow}
                            >
                              Follow
                            </Button>
                          ) : (
                            <Button
                              color="info"
                              variant="contained"
                              onClick={onClickUnFollow}
                            >
                              Unfollow
                            </Button>
                          ))}
                      </div>
                      <div className="nextprofileimg">
                        <p className="name">{user.userNick}</p>
                        {getVerifiedMark(String(user.userRole))}
                      </div>
                    </div>
                    <div className="mid">
                      <div className="mid-l">
                        <div>
                          <div className="left">
                            <div className="email"> email:{user.userEmail}</div>
                            {/* <div>userId:{item.mintUserId}</div> */}
                            {/* <div>직업:{user.userRole}</div> */}
                            <div className="followtext">
                              팔로워: <span>{followers}</span>
                            </div>
                            <div className="followtext">
                              팔로잉: <span>{followees}</span>
                            </div>
                          </div>
                          <div className="right"></div>
                        </div>
                      </div>
                    </div>
                  </UserBox>
                  <UserDescription>
                    <div className="title">User Description</div>
                    {user.userDescription ? (
                      <div className="content">{user.userDescription}</div>
                    ) : (
                      <div className="content">아직 소개 글이 없어요~ 😀</div>
                    )}
                  </UserDescription>
                </>
              )}
            </TopL>
            {item !== undefined && (
              <TopR>
                <div className="ITEM">
                  <div className="top">
                    <div className="top-left">
                      <div className="title">{item.productTitle}</div>
                      <div className="content">
                        <div className="left">
                          <div>카테고리 : {CATEGORY[item.productCode]}</div>
                          <div>등록일자 : {item.productRegDt.replaceAll("-", "/")}</div>
                          <div>NFT 소유자 : {item.userNick}</div>
                          <div className="right">
                            {/* <div>상품상태 : {status}</div> */}
                            <FavoriteBox className="icon">
                              {liked ? (
                                <FavoriteIcon
                                  onClick={() => {
                                    cancelLike();
                                  }}
                                  color="error"
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  onClick={() => {
                                    Like();
                                  }}
                                  color="error"
                                />
                              )}
                              {likes}
                            </FavoriteBox>
                          </div>
                        </div>
                      </div>
                      <Description>
                        <h3>작품설명</h3>
                        <div className="box">
                          <p>{item.productDesc}</p>
                        </div>
                      </Description>
                    </div>
                    <div className="preview">
                      {isImg ? (
                        <img
                          className="img"
                          alt="작품"
                          src={item.productThumbnailUrl}
                        />
                      ) : (
                        <div className="mediaBox">
                          <video src={item.productFileUrl} controls></video>
                        </div>
                      )}
                    </div>
                  </div>

                  <Bottom>
                    <div className="right">
                      <BidBox setOpen={setOpen} item={item} />
                    </div>
                  </Bottom>
                </div>
              </TopR>
            )}
          </Top>
          <h1 className="title2">
            <span className="color">{item.productTitle}</span>의 거래내역
          </h1>
          <List>
            <ListCategory>
              <div>Event</div>
              <div>Price</div>
              <div>From</div>
              <div>To</div>
              <div>Date</div>
            </ListCategory>
            {history.map((his, idx) => {
              return (
                <ListItem key={idx}>
                  <div className="event">{dealTypeConvert(his.dealType)}</div>
                  <div className="price">{his.dealPrice}</div>
                  <div className="from">{his.dealFromNickName}</div>
                  <div className="to">{his.dealToNickName}</div>
                  <div className="date">{convertDate(his.dealCreatedAt)}</div>
                  {/* <div className="id">{dealTypeConvert(history.dealType)}</div> */}
                </ListItem>
              );
            })}
          </List>

          <Mid>
            {items.length > 0 && (
              <>
                <h1>이 작가의 다른 작품 & 새로나온 작품</h1>
                <MainBannerWrapper onClick={() => {}}>
                  <Slider {...settings}>
                    {items.length > 0 &&
                      items.map((item, idx) => {
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setProductId(item.productId as any);
                            }}
                          >
                            <ItemCard2 key={idx} item={item} />{" "}
                          </div>
                        );
                      })}
                  </Slider>
                </MainBannerWrapper>
              </>
            )}
          </Mid>
          {open && (
            <ModalWrapper>
              <IconButton
                className="close"
                onClick={() => setOpen(false)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
              <StoreWapper className="StoreWapper">
                <div className="nftstore">
                  <DealModal
                    item={item}
                    status={status}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>
              </StoreWapper>
            </ModalWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default DetailItem;
