import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useMutation } from 'react-query'
import { delProductLike, getProductLike, postProductLike } from '../../store/apis/favorite'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getProductDetail } from '../../store/apis/product'
import { deleteFollow, getFollowee, postFollow } from '../../store/apis/follow'
import GameBidBox from '../../pages/NFTStore/GameBidBox'
import DealModal from '../../pages/NFTStore/DealModal'
import { closeVendingMachineDialogOpen } from '../stores/VendingMachineStore'
import { useAppDispatch } from '../hooks'
import store from '../stores'
import GameDealModal from '../../pages/NFTStore/GameDealModal'
import { useNavigate } from 'react-router-dom'


const ModalWrapper = styled.div`
    position: absolute;
    top:130px;
    right: 180px;
    width: 980px;
    height: 580px;
    background-color: white;
    border-radius: 10px;
    padding: 4px;
    overflow-y: scroll;
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
`
const Wrapper = styled.div`
  width: 950px;
  height: 570px;
  .loadingbox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -20vh;
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

const TopR = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);
  background-color: #f7f8fa;
  margin-left: 3vw;
  border-radius: 10px;
  .top {
    height: 400px;
    display: flex;
    overflow-y: hidden;
  }
  .top-left {
    /* background-color: yellowgreen; */
    width: 50%;
    .itemtitle {
      font-size: 30px;
      font-weight: 600;
      margin-top: 1vh;
      text-align: center;
    }
    .content2 {
      /* background-color: red; */
      margin-left: 2vw;
      margin-top: 3vh;
      font-size: 17px;
      height: 120px;
    }
  }
  .preview {
    display: flex;    
    align-items: center;
    border-left: 0.5px solid #e0dede;
  }
  .img {
    height: 350px;
    width: 350px;
    border-radius: 10px;
    border: 1px solid #e0dede;
    margin-left: 40px;
  }
  .mediaBox {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    video {
      width: 300px;
      margin: 4vh 5vw 0 0;
    }
  }
`;

const StoreWapper = styled.div`
  .nftstore {
    margin-left: 1vw;
    margin-top: 2vh;
    width: 80vw;
    height: 78vh;
    overflow: hidden;
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
const Description = styled.div`
  border-top: 0.5px solid #a9a9a9;
  h3 {
    margin-left: 2vw;
    font-size: 25px;
    margin-bottom: 10px;
  }
  .box {
    /* width: 250px; */
    height: 19vh;
    margin-left: 2vw;
    border-radius: 10px;
    padding-right: 20px;
    p {
      margin: 5px 0;
      font-size: 15px;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  height: 150px;
  .right {
    flex: 1;
    border-top: 0.5px solid #e0dede;
    .content {
      font-size: 15px;
      font-weight: 500;
    }
  }

`;
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

const VendingMachineDialog = () => {
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
  const [productId, setProductId] = useState(store.getState().vendingMachine.productNum);
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
  const [isImg, setIsImg] = useState(true)
  const [isLoading, setIsloading] = useState(true)
  const { ethereum } = window
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


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
        setIsloading(false)
      },
      onError: (err: any) => {
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
          navigate("/login");
        }
      },
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
          navigate("/login");
        }
      },
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
        navigate("/login");
      }
    },
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
      onError: (err: any) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
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
  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }
  useEffect(() => {
    getStatus();
    isImage()
  }, [item]);

  useEffect(() => {
    getProduct.mutate();
    getLiked.mutate();
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

  

  return (
    <ModalWrapper>
        <Wrapper>
      {isLoading ? (
        <div className="loadingbox">
            <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
            <p className="text">작품 불러오는중...</p>{" "}
        </div>
      ) : (
        <>
            {item !== undefined && (
              <TopR>
                <IconButton
                  aria-label="close dialog"
                  className="close"
                  onClick={() => dispatch(closeVendingMachineDialogOpen())}
                >
                  <CloseIcon />
                </IconButton>
                <div className="ITEM">
                  <div className="top">
                    <div className="top-left">
                      <div className="itemtitle">{item.productTitle}</div>
                      <div className="content2">
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
                      <GameBidBox setOpen={setOpen} item={item} />
                    </div>
                  </Bottom>
                </div>
              </TopR>
            )}
         
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
                  <GameDealModal
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
    </ModalWrapper>
      
  )
}

export default VendingMachineDialog