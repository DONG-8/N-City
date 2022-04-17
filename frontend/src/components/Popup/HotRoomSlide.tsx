import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import RankArtistCard from "./RankArtistCard";
import { useMutation, useQuery } from 'react-query';
import {getRoomTop5} from '../../store/apis/myRoom'

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

const HotRoomSlide = () => {
  const [subPosition, setSubPosition] = useState<number>(0);
  const [subEventNumber, setSubEventNumber] = useState<number>(0);
  const [subCheck, setSubCheck] = useState<number>(0);

  
  const moveSubAuto = () => {
    const len = characters.length;
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
    const len = characters.length;
    const idx = Math.floor((subEventNumber + 1) % len);
    setSubEventNumber(idx);
    if (idx === 0) {
      setSubPosition(0);
    } else {
      setSubPosition(subPosition - 448);
    }
  };

  const moveSubLeft = () => {
    const len = characters.length;
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
    if (characters!==undefined ){
    moveSubAuto();}
  }, [subCheck]);
  interface IState{
    user:{
      myRoomCharacter: string
      myRoomTodayCnt: number
      myRoomTotalCnt: number
      userId: number
      userNick:string
    }
  }
  const { isLoading:ILC, data:characters } = useQuery<any>(
    "getSellProductCategori",
    async () => {return (await (getRoomTop5( )))
      },
    { onSuccess:(res)=>{
    },
      onError: (err: any) => {
      },
    }
  );
  return (
    <>
    {characters!==undefined &&
      <SubBannerWrraper>
        <SubBanner>
          
          {characters.map((value, idx) => {
            return (
              <div className="inner"
              key={idx}
              style={{ transform: `translate(${subPosition}px)`,transition: `transform 0.5s`,}}>
                <RankArtistCard user={value}/>
              </div>
            );
          })}
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
            {subEventNumber + 1}/{characters.length}
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
      }
    </>
  );
};

export default HotRoomSlide;
