import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import RankArtistCard from "./RankArtistCard";
import Img1 from './image/1.png'
import Img2 from './image/2.png'
import { useNavigate } from "react-router-dom";
const SubBannerWrraper = styled.div`
  position: relative;
  width: 448px;
  height: 300px;
  /* background-color: black; */
  color: white;
  /* margin: -400px auto 0 10px; */
`;

const SubBanner = styled.div`
  border: 1px solid #dfdfdf;
  width: 420px;
  height: 280px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  .inner {
    width: 448px;
  }
  .inner img {
    width: 100%;
    height: 280px;
    /* height: 100%; */
    object-fit: cover;
  }
`;

const SubPagenationBanner = styled.div`
  position: absolute;
  width: 420px;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  margin: -35px 0 auto;

  /* background-color: rgba(0,0,0,0.5); */
  color: white;
  .container {
    width: 448px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }
  .inner {
    width: 250px;
    min-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: translate(-250px) */
  }

  button {
    background-color: rgba(0, 0, 0, 0.5);
    width: 35px;
    height: 35px;
    color: white;
  }
`;

const GuideSlide = () => {
  const [subPosition, setSubPosition] = useState<number>(0);
  const [subEventNumber, setSubEventNumber] = useState<number>(0);
  const [subCheck, setSubCheck] = useState<number>(0);

  const subImages = [
    {
      pic: Img1,
      ID: 1,
      name: "로그인가이드",
    },
    {
      pic: Img2,
      ID: 2,
      name: "네트워크가이드",
    },
  ];
  const moveSubAuto = () => {
    const len = subImages.length;
    const idx = Math.floor((subEventNumber + 1) % len);
    setSubEventNumber(idx);
    if (idx === 0) {
      setSubPosition(0);
    } else {
      setSubPosition(subPosition - 448);
    }
    if (subCheck === 0) {
      setTimeout(() => {
        setSubCheck(1);
      }, 3000);
    } else {
      setTimeout(() => {
        setSubCheck(0);
      }, 3000);
    }
  };

  const moveSubRight = () => {
    const len = subImages.length;
    const idx = Math.floor((subEventNumber + 1) % len);
    setSubEventNumber(idx);
    if (idx === 0) {
      setSubPosition(0);
    } else {
      setSubPosition(subPosition - 448);
    }
  };

  const moveSubLeft = () => {
    const len = subImages.length;
    const idx = Math.floor((subEventNumber - 1) % len);
    if (0 === subPosition) {
      setSubPosition((len - 1) * -448);
    } else {
      setSubPosition(subPosition + 448);
    }
    if (idx < 0) {
      setSubEventNumber(len - 1);
    } else {
      setSubEventNumber(subEventNumber - 1);
    }
  };

  useEffect(() => {
    moveSubAuto();
  }, [subCheck]);

  const navigate = useNavigate()
  return (
    <>
      <SubBannerWrraper>
        <SubBanner onClick={()=>{navigate('/guide')}}>
          {subImages.map((value, idx) => {
            return (
              <div key={idx} className="inner">
                <img
                  src={value.pic}
                  key={idx + value.name}
                  alt="이미지"
                  style={{
                    transform: `translate(${subPosition}px)`,
                    transition: `transform 0.5s`,
                  }}
                />
              </div>
            );
          })}
        </SubBanner>
      </SubBannerWrraper>
    </>
  );
};

export default GuideSlide;
