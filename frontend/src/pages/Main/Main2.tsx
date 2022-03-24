import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { clearInterval } from 'timers';
import ItemCard2 from "../../components/Card/ItemCard2";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Popup from "../../components/Popup/Popup";
import Guide from "../../components/Popup/Guide";
import HotTokkenList from "./HotTokkenList";
import NewTokkenList from "./NewTokkenList";
import VideoGuide from "./VideoGuide";
import Profile from "./Profile";
import AOS from 'aos';

const MainBackGround = styled.div`
  /* margin-top: 80px; */
  /* top: 80px; */
  width: 100%;
  height: 650px;
`;

const MainBackImg = styled.img`
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
`;

const MainBannerWrapper = styled.div`
  width: 890px;
  height: 508px;
  color: white;
  margin: -400px 10px 0 auto;
`;

const MainBanner = styled.div`
  width: 890px;
  height: 508px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  .inner {
    width: 890px;
    height: 508px;
  }
  .inner img {
    width: 890px;
    height: 508px;
  }
`;

const MainPagenationBanner = styled.div`
  position: absolute;
  width: 890px;
  height: 70px;
  display: flex;
  margin: -70px 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  .container {
    width: 890px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }
  .inner {
    width: 182.5px;
    min-width: 182.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: translate(-250px) */
  }
  button {
    width: 40px;
    color: white;
  }
`;
const SubBannerWrraper = styled.div`
  position: relative;
  width: 448px;
  height: 509px;
  /* background-color: black; */
  color: white;
  margin: -400px auto 0 10px;
`;

const SubBanner = styled.div`
  width: 448px;
  height: 280px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: white;
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
  width: 448px;
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

const SubBottomItem = styled.div`
  width: 100%;
  background-color: rgba(28, 30, 36, 0.9);
  height: 229px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  h2 {
    margin-top: 0px;
    margin-left: 20px;
    margin-bottom: 10px;
    /* cursor: pointer; */
    font-size: 30px;
  }
  div {
    margin-left: 40px;
    margin-top: 13px;
    font-size: 20px;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }

  .plus {
    position: absolute;
    top: 270px;
    right: 20px;
    color: white;
    font-size: 50px;
    cursor: pointer;
  }
`;

const HotTokkenWrraper = styled.div`
  width: 100%;
  height: auto;
  min-width: 1236px;
  background-color: #fffbd8;
`;

const HotTokken = styled.div`
  width: 1320px;
  height: 100%;
  margin: 0 auto;
  min-width: 1320px;
  h1 {
    width: 1320px;
    padding-top: 40px;
    /* font-family: "DungGeunMo"; */
    font-size: 40px;
  }
`;

const HotTokkenDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  justify-content: center;
`;

const MainWord = styled.div`
  position: absolute;
  height: 100px;
  top: 15%;
  left: 50%;
  z-index: 1;
  margin: 0 auto;
  font-size: 100px;
  /* font-family: "DungGeunMo"; */
  .typing {
    text-transform: capitalize;
    white-space: nowrap;
    color: transparent;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 텍스트를 정 가운데에 고정시키려면 필수
    &::before {
      content: "Welcome N-City";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 100%;
      color: black;
      overflow: hidden;
      border-right: 3px solid black;
      // 커서역할을 하는것
      animation: typing 8s steps(30) infinite;
    }
  }
  @keyframes typing {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
`;

const GuideWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Cash = styled.div`
  width: 500px;
  height: 200px;
  position: sticky;
  position: -webkit-sticky;
  bottom: 20px;
  right: 20px;
  /* background-image: ;
  background-size: 100%; */
  z-index: 100;
`;

const MainH = styled.div`
  width: 100%;
  height: auto;
`;

const NewTokken = styled.div`
  width: 100%;
  height: 70vh;
  border: 1px solid black;
  
  .title{
    font-size: 3.5rem;
    color: #333;
    margin-left: 10vw;
  }
  .sub{
    color: #333;
    margin-left: 10vw;
    p{
      margin: 1px;
    }
  }
  .itemCards{
    display: flex;
    margin-left: 10vw;
  } 
  .down{
    margin-top: 10vh;
  }
`


export interface IState {
  item: {
    id: number;
    name: string;
    title: string;
    price: number;
    liked: number;
    url: string;
  }[];
  artist: {
    name: string;
    profileImg: string;
    verified: boolean;
    sumnailImg: string;
    descreption: string;
  }[];
}

export default function Main2() {
  useEffect(()=>{
    // (window as any).game.destroy(true)
    AOS.init()
  },[])
  const [position, setPosition] = useState<number>(0);
  const [eventNumber, setEventNumber] = useState<number>(0);
  const [pageTextPosition, setPageTextPosition] = useState<number>(0);
  const [check, setCheck] = useState<number>(0);

  // 오늘의 방 (투데이 많은 방기준!)
  const [subPosition, setSubPosition] = useState<number>(0);
  const [subEventNumber, setSubEventNumber] = useState<number>(0);
  const [subCheck, setSubCheck] = useState<number>(0);

  // 나중에 DB 기반의 데이터 형성시켜주고 이미지 받아오기 아니면 그냥 여기서 사용
  const images = [
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
      pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg",
      ID: 2,
      name: "로아 프레딧 룩",
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
    {
      pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg",
      ID: 2,
      name: "로아 프레딧 룩",
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

  const moveRight = () => {
    // console.log(e)
    // clearTimeout(1000)
    const len = images.length;
    const idx = Math.floor((eventNumber + 1) % len);
    if ((len - 1) * -890 === position) {
      setPosition(0);
    } else {
      setPosition(position - 890);
    }
    setEventNumber(idx);

    if (idx === 0) {
      setPageTextPosition(0);
    } else if (2 < idx && idx < len - 1) {
      setPageTextPosition(pageTextPosition - 182.5);
    }
    console.log(eventNumber, "우");
  };

  const moveLeft = () => {
    const len = images.length;
    const idx = Math.floor((eventNumber - 1) % len);
    if (0 === position) {
      setPosition((len - 1) * -890);
    } else {
      setPosition(position + 890);
    }
    if (idx < 0) {
      setEventNumber(len - 1);
    } else {
      setEventNumber(eventNumber - 1);
    }
    console.log(Math.floor(idx % 4));
    if (idx < 0) {
      setPageTextPosition(
        -182.5 * (len - 1) + (2 - Math.floor(idx % 4)) * 182.5
      );
    } else if (2 < idx && idx < len - 2) {
      setPageTextPosition(pageTextPosition + 182.5);
    } else if (idx === len - 2) {
      // console.log('옆으로 밀어주때욤')
    } else {
      setPageTextPosition(0);
    }

    // console.log(eventNumber,'좌')
  };

  const clickToMove = (e: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout();
    // setCheck(true)
    const len = images.length;
    const num = parseInt(e.currentTarget.id);
    const dif = num - eventNumber;
    if (dif < 0) {
      console.log(eventNumber, "클릭 이벤트넘버 현재위치");
      console.log(dif, "차이");
      const di = Math.abs(dif);
      const idx = Math.floor(eventNumber - di);
      console.log(idx, "idx");
      setPosition(position + 890 * di);
      setEventNumber(eventNumber - di);
      // setPageTextPosition(pageTextPosition + 250*(di))
      if (di === 1) {
        if (idx === len - 2) {
          console.log("들어옴");
        } else {
          if (idx < 2) {
          } else {
            setPageTextPosition(pageTextPosition + 182.5);
          }
        }
      } else if (di === 2) {
        if (idx === len - 3) {
          setPageTextPosition(pageTextPosition + 182.5);
        } else if (idx < 2) {
          setPageTextPosition(pageTextPosition + 182.5);
        } else {
          setPageTextPosition(pageTextPosition + 500);
        }
      } else if (di === 3) {
        setPageTextPosition(pageTextPosition + 500);
      }
    } else {
      const idx = Math.floor(eventNumber + dif);
      setPosition(position - 890 * dif);
      setEventNumber(eventNumber + dif);
      // console.log(idx,'idx')
      if (dif === 1) {
        if (idx === 0) {
          setPageTextPosition(0);
        } else if (1 < idx && idx <= len - 2) {
          setPageTextPosition(pageTextPosition - 182.5);
        } else if (idx === len - 2) {
          setPageTextPosition(pageTextPosition - 182.5);
        }
      } else if (dif === 2) {
        if (idx === 2) {
        } else {
          setPageTextPosition(pageTextPosition - 182.5);
        }
      } else if (dif === 3) {
        setPageTextPosition(pageTextPosition - 182.5);
      }
    }
  };

  const moveAuto = () => {
    const len = images.length;
    const idx = Math.floor((eventNumber + 1) % len);
    if ((len - 1) * -890 === position) {
      setPosition(0);
    } else {
      setPosition(position - 890);
    }
    setEventNumber(idx);

    if (idx === 0) {
      setPageTextPosition(0);
    } else if (2 < idx && idx < len - 1) {
      setPageTextPosition(pageTextPosition - 182.5);
    }
    // console.log(eventNumber,'우')
    if (check === 0) {
      setTimeout(() => {
        setCheck(1);
      }, 4000);
    } else {
      setTimeout(() => {
        setCheck(0);
      }, 4000);
    }
  };

  // 타이핑 글씨 효과

  useEffect(() => {
    moveAuto();
  }, [check]);

  useEffect(() => {
    moveSubAuto();
  }, [subCheck]);

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

  const [items, setItems] = useState<IState["item"]>([
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
      id: 5,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 4,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300",
    },
  ]);

  return (
    <MainH>
      {/* <MainWord>
        <div className="typing">Welcome N-City</div>
      </MainWord> */}
      <MainBackGround>
        <MainBackImg src="https://post-phinf.pstatic.net/MjAyMDEyMjJfMjc0/MDAxNjA4NjQ0MzExMzM4.BKpiZi7BKqbKceFNFAg0mB1JUZXGsGiDZsB2shTf2NYg.w-SkrTWCzjoyLu_-9moNkS3ZUGu0FljmpuuE-JMJRRwg.GIF/tumblr_nm6j1ghB7C1qze3hdo1_500.gif?type=w1200" />
      </MainBackGround>
      <MainWrapper>
        <MainBannerWrapper>
          <MainBanner>
            {images.map((value, idx) => {
              return (
                <div
                  className="inner"
                  style={{
                    transform: `translate(${position}px)`,
                    transition: `transform 0.5s`,
                  }}
                >
                  <img src={value.pic} key={idx + value.name} alt="사진없노" />
                </div>
              );
            })}
          </MainBanner>
          <MainPagenationBanner>
            <button
              onClick={() => {
                moveLeft();
              }}
            >
              <ArrowBackIcon></ArrowBackIcon>
            </button>
            <div className="container">
              {images.map((value, idx) => {
                const id = String(idx);
                //transform: `translate(${sub}px)`, transition: `transform 0.5s`
                if (idx === eventNumber) {
                  return (
                    <div
                      className="inner"
                      id={id}
                      onClick={(e) => {
                        clickToMove(e);
                      }}
                      style={{
                        color: "white",
                        transform: `translate(${pageTextPosition}px)`,
                        transition: `transform 0.5s`,
                      }}
                    >
                      {value.name}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="inner"
                      id={id}
                      onClick={(e) => {
                        clickToMove(e);
                      }}
                      style={{
                        color: "gray",
                        transform: `translate(${pageTextPosition}px)`,
                        transition: `transform 0.5s`,
                      }}
                    >
                      {value.name}
                    </div>
                  );
                }
              })}
            </div>
            <button
              onClick={() => {
                moveRight();
              }}
            >
              <ArrowForward></ArrowForward>
            </button>
            <button>
              {eventNumber + 1}/{images.length}
            </button>
            <button>
              <ListAltIcon></ListAltIcon>
            </button>
          </MainPagenationBanner>
        </MainBannerWrapper>
        <Profile></Profile>
      </MainWrapper>
      <GuideWrapper>
        <Guide></Guide>
      </GuideWrapper>
      <NewTokken>
        <div data-aos="fade-up"
            data-aos-duration="2000"   >
        <h1 className="title">
          New Tokken
        </h1>
        <div className="sub">
          <p>방금 막 새로 민팅된 작품들입니다. 누구보다 빠르게 작품을 구경하세요</p>
          <p>N-city 의 상점 기능을 이용해 구입하고, 자신의 방에 전시할 수 있습니다. </p>
        </div>
        </div>
        <div  className="itemCards">
          <div data-aos="fade-up"
            data-aos-duration="2000"   >
            <ItemCard2 item={items[0]}/>
          </div  >
          <div data-aos="fade-up"
            data-aos-duration="1000"  className="down">
            <ItemCard2 item={items[1]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="1500">
          <ItemCard2 item={items[2]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="1500" className="down">
            <ItemCard2 item={items[3]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="1800">
            <ItemCard2 item={items[4]}/>
          </div>
        </div>
      </NewTokken>
    </MainH>
  );
}