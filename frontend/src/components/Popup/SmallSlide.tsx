import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import RankArtistCard from "./RankArtistCard";

const SubBannerWrraper = styled.div`
  position: relative;
  width: 448px;
  height: 300px;
  /* background-color: black; */
  color: white;
  /* margin: -400px auto 0 10px; */
`;

const SubBanner = styled.div`
  width: 420px;
  height: 300px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: white;
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

const SmallSlide = () => {
  const [subPosition, setSubPosition] = useState<number>(0);
  const [subEventNumber, setSubEventNumber] = useState<number>(0);
  const [subCheck, setSubCheck] = useState<number>(0);

  const subImages = [
    {
      pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg",
      ID: 1,
      name: "구찌",
    },
    {
      pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg",
      ID: 2,
      name: "로아 프레딧 룩",
    },
    {
      pic: "https://cdn-lostark.game.onstove.com/uploadfiles/banner/93964914d8904123a71323313b1a95ba.jpg",
      ID: 3,
      name: "로아 도화가",
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
      }, 8000);
    } else {
      setTimeout(() => {
        setSubCheck(0);
      }, 8000);
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

  // useEffect(() => {
  //   moveSubAuto();
  // }, [subCheck]);

  return (
    <>
      <SubBannerWrraper>
        <SubBanner>
          {subImages.map((value, idx) => {
            return (
              <div className="inner">
                <img
                  src={value.pic}
                  key={idx + value.name}
                  alt="사진없노"
                  style={{
                    transform: `translate(${subPosition}px)`,
                    transition: `transform 0.5s`,
                  }}
                />
              </div>
            );
          })}
          {/* <RankArtistCard></RankArtistCard> */}
        </SubBanner>
        <SubPagenationBanner>
          <button
            onClick={() => {
              moveSubLeft();
            }}
          >
            <ArrowBackIcon></ArrowBackIcon>
          </button>
          <button>
            {subEventNumber + 1}/{subImages.length}
          </button>
          <button
            onClick={() => {
              moveSubRight();
            }}
          >
            <ArrowForward></ArrowForward>
          </button>
        </SubPagenationBanner>
      </SubBannerWrraper>
    </>
  );
};

export default SmallSlide;
