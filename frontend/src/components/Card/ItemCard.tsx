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
`
const Image = styled.div`
  img{
    width:350px;
    height:300px ;
    border-radius: 5px 5px 0 0 ;
    object-fit: cover;    
    }
`
const CardCenter = styled.div`
  display: flex;
  height: 60px;
`;

const CardBottom = styled.div`
    height:40px;
    border-radius:0 0 5px 5px ;
    background-color: whitesmoke ;
    display: flex;
    justify-content: space-between ;
    align-items: center;
    .buy{
      visibility: hidden ;
      font-weight: 1000 ;
      color:#FF865B ;
      font-size:1.2rem ;
      margin:5px ;
      margin-left: 1.5rem ; 
    }
    .like{
      font-size:1.2rem ;
      font-weight:1000;
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
  font-weight: 1000;
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
`;
interface Iprops {
  item: {
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
  };
  handleOpen: (item) => void;
}

const ItemCard:React.FC<Iprops>= ({item, handleOpen}) => {
  const navigate = useNavigate()
  const goDetailPage = (productId)=>{
    // localStorage.setItem("item",JSON.stringify(item))
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
        console.log("좋아요 성공", res);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
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
      },
    }
  ); 

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
      <CardWrapper>
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
        <CardCenter
        // onClick={() => {
        //   goDetailPage(item.productId);
        // }}
        >
          <DesLeft>
            {/* <Artist>
              {item.name}
            </Artist> */}
            <Title>{item.productTitle}</Title>
          </DesLeft>
        </CardCenter>
        <CardBottom>
          {/* <div className='buy'> */}
          {/* <div>Buy Now</div> */}
          {/* <div>Sell</div>
            <div>판매수정</div> */}
          {/* 가격이 붙어 있고, 소유주가 아니면 buy now */}
          {/* 가격이 붙어 있고, 소유주라면 판매수정  */}
          {/* 가격이 붙어 있지 않고, 소유주라면 판매수정  */}
          {/* </div> */}
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
            {item.productState === 1 ? (
              <SaleState>경매중 {item.productPrice}NCT</SaleState>
            ) : item.productState === 2 ? (
              <SaleState>판매중 {item.productPrice}NCT</SaleState>
            ) : (
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