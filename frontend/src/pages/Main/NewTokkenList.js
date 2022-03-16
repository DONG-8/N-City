import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "../../components/Card/ItemCard";

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
  /* background-color: red; */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z'/%3E%3C/svg%3E");
  position: absolute;
  top: 200px;
  right: -80px;
`;

const LCricle = styled.div`
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
  slidesToShow: 3,
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
  width: 1236px;
  height: 600px;
  color: black;
  margin: 0 auto;
`;

const NewTokkenList = () => {
  const items = [
    {
      id: 1,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305",
    },
    {
      id: 2,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 3,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300",
    },
    {
      id: 1,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305",
    },
    {
      id: 2,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 3,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300",
    },
    {
      id: 1,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305",
    },
    {
      id: 2,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 3,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300",
    },
    {
      id: 1,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305",
    },
    {
      id: 2,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 3,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300",
    },
  ];

  return (
    <MainBannerWrapper>
      <div>
        <Slider {...settings}>
          {items.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
        </Slider>
      </div>
    </MainBannerWrapper>
  );
};

export default NewTokkenList;
