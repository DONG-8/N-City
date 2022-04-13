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

const Wrapper = styled.div`
  #character{
    border:2px solid #636dffcd ;
  }
  #normal{
  border:0.5px solid #E9E4E4;
  }
`

const CardWrapper = styled.div`
  cursor: pointer;
  height: 278px;
  width: 210px;
  background-color: #ffffff;
  border-radius: 10px;  
  margin: 30px ;
  border:0.5px solid #E9E4E4;
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
`

const Image = styled.div`
  img{
    width: 210px;
    height: 210px;
    border-radius: 10px 10px 0 0 ;
    object-fit: cover;    
  }
`
const CardCenter = styled.div`
  display: flex;
  height: 50px;
  display: flex;
  border-radius: 0 0 2px 2px ;
`;

const CardBottom = styled.div`
  margin-top: -14px;
  height: 27px;
  border-radius: 0 0 10px 10px;
  background-color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .like {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 7px;
    display: flex;
    align-items: center;
  }
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 0.2vw;
    svg {
      height: 20px;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
const DesLeft = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SaleState = styled.div`
  margin-right: 5px;
  font-weight: 500;
  font-size: 13px;
`
const Title = styled.div`
  margin-top: -15px;
  font-size: 1rem;
  font-weight: 600;
  img{
    position: absolute;
    width: 15px;
    height: auto;
  }
`;
interface Iprops {
  item: {
    productFavoriteUser: Array<any>;
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
    productAuctionEndTime: string;
  }; 
  setMode :React.Dispatch<React.SetStateAction<string>>
}

const SmallItemCard:React.FC<Iprops>= ({item,setMode}) => {
  const goDetailPage = (productId)=>{
    sessionStorage.setItem("item",JSON.stringify(item))
    setMode('detail')
  }
  const [liked,setLiked] = useState(item.favorite)
  const [likes,setLikes] = useState(item.productFavoriteUser.length)
  const navigate = useNavigate();
  const moment = require('moment')
  
  const addLike = useMutation<any, Error>(
    "addLike",
    async () => {
      return await postProductLike(item.productId);
    },
    {
      onSuccess: async (res) => {
        console.log("좋아요 성공", res);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
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
        console.log("좋아요 취소 성공", res);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
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

  function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
  
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  }
  
  const convertDate = (dateArray) => {
    const year = String(dateArray[0]);
    const month = String(dateArray[1]);
    const day = String(dateArray[2]);
    const hour = String(dateArray[3])
    const minute = String(dateArray[4])
    const second = String(dateArray[5] ? dateArray[5] : "00")
    return year + "-" + leadingZeros(month, 2) + "-" + leadingZeros(day, 2) + " " + leadingZeros(hour, 2) + ":" + leadingZeros(minute, 2)+ ":" + leadingZeros(second, 2)
  }

  const onClickAddLike = async () => {
    addLike.mutate();
  }

  const onClickCancelLike = () => {
    cancelLike.mutate()
  }

  const onClickCard = (productId) => {
    sessionStorage.setItem("item",JSON.stringify(item))
    setMode('detail')
  }

  return (
    <Wrapper>
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
            {item.productState === 1 &&
              convertDate(item.productAuctionEndTime) &&
              moment(convertDate(item.productAuctionEndTime)).isBefore(
                moment()
              ) && <SaleState>경매종료</SaleState>}
            {item.productState === 1 &&
              convertDate(item.productAuctionEndTime) &&
              !moment(convertDate(item.productAuctionEndTime)).isBefore(
                moment()
              ) && <SaleState>경매중 {item.productPrice}NCT</SaleState>}
            {item.productState === 2 && (
              <SaleState>판매중 {item.productPrice}NCT</SaleState>
            )}
          </div>
        </CardBottom>
      </CardWrapper>
    </Wrapper>
  );
}

export default SmallItemCard