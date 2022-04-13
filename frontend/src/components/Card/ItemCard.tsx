import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'
import ether from './ethereum.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMutation } from 'react-query';
import { delProductLike, postProductLike } from '../../store/apis/favorite';
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import Tooltip from "@mui/material/Tooltip";
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"
import 'moment/locale/ko';
const CardWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  height: 420;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  border:0.5px solid #E9E4E4;
  margin: 30px ;
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    .buy{
      visibility: visible ;
      transition: 1s ;
    }
    .card_bottom{
      background-color: #f8ede9;
      transition: 0.1s ;
    }
  }
  &#character{
    border:2px solid #636dffcd ;

  }
  &#normal{
  border:0.5px solid #E9E4E4;
  }
`
const Image = styled.div`
  img{
    width:350px;
    height:300px ;
    border-radius: 10px 10px 0 0 ;
    object-fit: cover;    
    }
`
const CardCenter = styled.div`
  display: flex;
  height: 60px;
`;

const CardBottom = styled.div`
    height:40px;
    border-radius:0 0 10px 10px ;
    background-color: whitesmoke ;
    display: flex;
    justify-content: space-between ;
    align-items: center;
    .buy{
      visibility: hidden ;
      font-weight: 600;
      color:#FF865B ;
      font-size:1.2rem ;
      margin:5px ;
      margin-left: 1.5rem ; 
    }
    .like{
      font-size:1.2rem ;
      font-weight: 600;
      margin: 7px ;
      display: flex;
    }
    .icon{
    cursor: pointer;
    margin-right: 0.5vw;
    margin-top:0.2vh;
    &:hover{
      transform: scale(1.1);
    }
  }
`
const DesLeft = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Artist = styled.div`
  margin: 0.2rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;
const DesRight = styled.div`
  flex: 4;
  margin-left: 70px;
  margin-top: -25px;
  font-weight: 600;
  font-size: 30px;

`;


const SaleState = styled.div`
  margin-right: 15px;
  font-weight: 500;
`
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  img{
    position: absolute;
  }
`;
interface Iprops {
  item: {
    userId: number;
    productId: number;
    productTitle: string;
    productPrice: number;
    productThumbnailUrl: string;
    productFavorite: number;
    productRegDt: Object;
    productCode: number;
    productState: number;
    productFavoriteCount: number;
    favorite: boolean;
    tokenId?: number;
    userRole: string;
    productAuctionEndTime: string
  };
  handleOpen: (item) => void;
}

const ItemCard:React.FC<Iprops>= ({item, handleOpen}) => {
  const moment = require('moment')
  const navigate = useNavigate()
  const goDetailPage = (productId)=>{
    // sessionStorage.setItem("item",JSON.stringify(item))
    navigate(`/store/detail/${productId}`)
  }
  const [liked,setLiked] = useState(item.favorite)
  const [likes,setLikes] = useState(Number(item.productFavoriteCount))

  const addLike = useMutation<any, Error>(
    "addLike",
    async () => {
      return await postProductLike(item.productId);
    },
    {
      onSuccess: async (res) => {
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  ); 

  const cancelLike = useMutation<any, Error>(
    "cancelLike",
    async () => {
      return await delProductLike(item.productId);
    },
    {
      onSuccess: async (res) => {
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  ); 

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

  const onClickAddLike = async () => {
    addLike.mutate();
  }

  const onClickCancelLike = () => {
    cancelLike.mutate()
  }

  const onClickCard = (productId) => {
    navigate(`/store/detail/${productId}`)
  }

  return (
    <>
      <CardWrapper id={item.productCode === 7 ? "character" : "normal"}>
        <Image
          onClick={() => {
            goDetailPage(item.productId);
          }}
        >
          <img
            onClick={() => onClickCard(item.productId)}
            alt="pic"
            src={item.productThumbnailUrl}
          />
        </Image>
        <CardCenter>
          <DesLeft>
            <Title>
              <span>{item.productTitle}</span>
              {getVerifiedMark(item.userRole)}
            </Title>
          </DesLeft>
        </CardCenter>
        <CardBottom>
          <div className="like">
            <div
              onClick={() => {
                setLiked(!liked);
              }}
              className="icon"
            >
              {liked ? (
                <FavoriteIcon
                  onClick={() => {
                    onClickCancelLike();
                    setLikes(likes - 1);
                  }}
                  color="error"
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => {
                    onClickAddLike();
                    setLikes(likes + 1);
                  }}
                  color="error"
                />
              )}
            </div>
            {likes}
          </div>
          <div>
            {item.productState === 1 && item.productAuctionEndTime && (moment(item.productAuctionEndTime).isBefore(moment()) && <SaleState>경매종료</SaleState>)}
            {item.productState === 1 && item.productAuctionEndTime && !moment(item.productAuctionEndTime).isBefore(moment()) &&<SaleState>경매중 {item.productPrice}NCT</SaleState>}
            {item.productState === 2 && (
              <SaleState>판매중 {item.productPrice}NCT</SaleState>
            )}
            {item.productState === 3 &&
              item.userId === Number(sessionStorage.getItem("userId")) && (
                <div>
                  <Button onClick={() => handleOpen(item)}>
                    <Tooltip title="판매하기">
                      <SellIcon />
                    </Tooltip>
                  </Button>
                </div>
              )}
          </div>
        </CardBottom>
      </CardWrapper>
    </>
  );
}

export default ItemCard