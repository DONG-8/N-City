import React, { Component, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard2 from "../../components/Card/ItemCard2";
import { useMutation, useQuery } from "react-query";
import { getliketop10, getProductAll } from "../../store/apis/product";
import { getUserfollowTop5 } from "../../store/apis/user";
import IsLoading2 from "../NFTStore/IsLoading2";
// interface Iprops{
//   items :{
//     productId: Number,
//     productTitle: string,
//     productPrice: Number,
//     productThumbnailUrl: string,
//     productFavorite: Number,
//     productRegDt:Object, 
//     productCode: Number,
//   }[]
// }

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
  /* background-color: red; */
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
  width: 1400px;
  height: 600px;
  color: black;
  margin: 0 auto;
`;
interface Istate{
  item :{
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
      userTokenRequest?:boolean|null,
    }[],
    userRole: string,
    productState:number
  }
}

const NewTokkenList:React.FC = () => {

  const { isLoading:ILC, data:allitems } = useQuery<any>(
    "getliketop10",
    async () => {return (await (getliketop10()))
      },
    { onSuccess:(res)=>{
      console.log('🎶',res)
    },
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );

  return (
    <MainBannerWrapper>
      <div>
        {ILC ?<IsLoading2/>:
        <>
        <h1>Hot Token</h1>
        <Slider {...settings}>
         {allitems.map((item,idx) => {
            return <ItemCard2 key={idx} item={item} />;
          })}
        </Slider>
        </>}
      </div>
    </MainBannerWrapper>
  );
};

export default NewTokkenList;
