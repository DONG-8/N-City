import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getProductAll } from "../../store/apis/Main";
import * as API from "../../store/apis/types";
const MainH = styled.div`
  width: 100%;
  height: auto;
`;

const BackgroundColorDiv = styled.div`
  width: 100%;
  height: 200px;
  background-color: pink;
  margin-bottom: 20px;
`;
const HeadContent = styled.div`
  position: relative;
  width: 1370px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  h2 {
    font-size: 40px;
    margin-left: 40px;
  }
`;

const InnreContent = styled.div`
  position: relative;
  width: 1370px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  h2 {
    font-size: 40px;
    margin-left: 40px;
  }
`;

const Cattegori = styled.div`
  width: 100%;
  height: 75px;
  /* background-color: yellow; */
  position: sticky;
  top: 80px;
  position: -webkit-sticky;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-top: 10px; */
  background-color: white;
  cursor: pointer;
  div {
    width: 33.33%;
    height: 100%;
    font-size: 2vh;
    font-weight: 600;
    /* background-color: red; */
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: solid; */
    border-bottom: 2px solid #ff865b;
    :hover {
      background-color: #f9f9f9;
      transition: 1s;
    }
  }
  .clicked {
    background-color: white;
    border-left: 2px solid #ff865b;
    border-right: 2px solid #ff865b;
    border-top: 2px solid #ff865b;
    border-bottom: none;
    color: #ff865b;
  }
`;

const ContentsDiv = styled.div`
  width: 100%;
  height: auto;
`;

const RankContent = styled.div`
  width: 100%;
  /* 임시높이 변경 필요시 변경하기 */
  height: 100%;
  /* background-color: azure; */
  margin-top: 30px;
`;

// 카테고리가 바뀔 때, 내용이 변경 --> 클릭할 때 데이터 요청

const Top5Cardwrapper = styled.div`
  width: 100%;
  height: 600px;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: row;
  h1 {
    text-decoration: underline;
    text-underline-position: under;
    margin-left: 10px;
  }
`;

const Top4Cardwrapper = styled.div`
  width: 66.6%;
  height: 50%;
  display: flex;
  flex-direction: row;
  border: 1px solid white;
  flex-wrap: wrap;
`;

const OtherCardWrapper = styled.div`
  width: 100%;
  height: 500px;
  /* background-color: #f3f3f3; */
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 90px;
`;

const Top1CardWrapper = styled.div`
  width: 33.3%;
  height: 100%;
  border: 1px solid white;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  :hover {
    border: 1px solid black;
  }

  img {
    width: 300px;
    height: 300px;
    /* margin-left: 20px; */
    margin: 0 auto;
    background-color: black;
    object-fit: cover;
  }

  .inner {
  }

  .explan {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 50px;
    width: 100%;
    max-height: 200px;
    justify-content: flex-end;
  }

  .explan h2 {
    margin: 10px 0;
    font-size: 20px;
  }

  .explan h3 {
    margin: 30px 0;
  }

  .explan h4 {
    margin: 5px 0;
  }
`;

const Top4CardDiv = styled.div`
  width: 453.328px;
  height: 298px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  :hover {
    border: 1px solid black;
  }
  img {
    width: 200px;
    height: 200px;
    /* margin-left: 20px; */
    margin-left: 30px;
    background-color: black;
    object-fit: cover;
  }

  .inner {
    display: flex;
    flex-direction: row;
  }

  .explan {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 30px;
    width: 100%;
    max-height: 200px;
    justify-content: flex-end;
  }

  .explan h2 {
    margin: 10px 0;
    font-size: 20px;
  }

  .explan h3 {
    margin: 30px 0;
  }

  .explan h4 {
    margin: 5px 0;
  }
`;

const OtherCardDiv = styled.div`
  width: 20%;
  border: 1px solid white;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    text-decoration: underline;
    text-underline-position: under;
    margin-left: 10px;
  }
  :hover {
    border: 1px solid black;
  }
  img {
    width: 200px;
    height: 200px;
    /* margin-left: 20px; */
    margin: 0 auto;
    background-color: black;
    object-fit: cover;
  }

  .inner {
  }

  .explan {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 50px;
    width: 100%;
    max-height: 200px;
    justify-content: flex-end;
  }

  .explan h3 {
    margin: 10px 0;
  }

  .explan h4 {
    margin: 5px 0;
  }
`;

const Rank = () => {
  const [items, setItems] = [
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
      id: 4,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/Cxb_lnNlgplYCULm_ZGlY9pCrxQ67GO2hmStVJTSEN3O2hNeIZoWyK3CwaCj-vZBxeQqioC-P1qT7cK6wXWc-WjjfUyjR3zXNwKN=w300",
    },
    {
      id: 5,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qeCj7NRekCZ9BUjM8c9Pk02DxmPgX483qgEkVJeLXYIDOFVTXAfCg8TTztcMMQPgYFsNDUqndF5asWPCgJVpiM6P39VzpWa3TTKrvg=w300",
    },
    {
      id: 6,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/jWonBwIV3RRzCv2xEu3pKA5buXUne_vnltLcLIfnluPuctdbTd-ScsBO94-njkA2L5VHVRA56CG5tbbxwacCvFdFWaZzuIJNUB1sVCA=w300",
    },
    {
      id: 7,
      name: "Giks Home",
      title: "#g53434",
      price: 1.37,
      liked: 52,
      url: "https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352",
    },
    {
      id: 8,
      name: "Hong Hosus",
      title: "#Hong1535",
      price: 1.24,
      liked: 35,
      url: "https://lh3.googleusercontent.com/jc4P6pZhiNsBNxErAilpkx-d3RZDpNpJbYjs2k5nou29DJGe_r27tu2i0xy0KBOIgHaQhgVOqIF4-aLpjIqLV6eo-IsIUQ98VI_jDw=w300",
    },
    {
      id: 9,
      name: "Giks Home",
      title: "#ghe23434",
      price: 1.35,
      liked: 43,
      url: "https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352",
    },
    {
      id: 10,
      name: "Giks Home",
      title: "#g53434",
      price: 1.37,
      liked: 52,
      url: "https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352",
    },
    {
      id: 11,
      name: "Giks Home",
      title: "#ghe254334",
      price: 1.2,
      liked: 24,
      url: "https://lh3.googleusercontent.com/BqScg3QwKPcNW_cxtvBws2D2cE8Us-QsN9yYmB_8UzUikBwLfOC5Nc2JgXWOB2ijx4lAU2KcYplGujimb2FUD9ArixBFeCyNPcES=w352",
    },
    {
      id: 12,
      name: "Giks Home",
      title: "#g53434",
      price: 1.37,
      liked: 52,
      url: "https://lh3.googleusercontent.com/OjwqOOt3_po4pPlTYg43Us9_pp4Ji9X8JKZY4aCsjzHISKQL-u2oSX_q4NmK5qZZn5PPYfMCpDS8OKFXBzXzXA6ljfWfaxGdEvc8DA=w300",
    },
  ];

  return (
    <MainH>
      <BackgroundColorDiv>
        <HeadContent>
          <h2>Hot Room</h2>
        </HeadContent>
      </BackgroundColorDiv>
      <InnreContent>
        <>
          {/* <Cattegori>
          <div
            className={click === "Room" ? "clicked" : ""}
            onClick={() => setClick("Room")}
          >
            오늘의 hot Room
          </div>
          <div
            className={click === "Tokken" ? "clicked" : ""}
            onClick={() => setClick("Tokken")}
          >
            오늘의 Hot Tokken
          </div>
          <div
            className={click === "Artist" ? "clicked" : ""}
            onClick={() => setClick("Artist")}
          >
            오늘의 Hot Artist
          </div>
        </Cattegori> */}
        </>
        <ContentsDiv>
          <RankContent>
            <h1>Top 5</h1>
            <Top5Cardwrapper>
              <Top1CardWrapper>
                <h1>1</h1>
                <img
                  src="https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305"
                  alt="사진없노"
                />
                <div className="inner">
                  <div className="explan">
                    <h3>제작자 : {items.name}</h3>
                    <h4>제목 : {items.title}</h4>
                    <h2>가격 : {items.price} 이더</h2>
                    <h4>♥ {items.liked}</h4>
                  </div>
                </div>
              </Top1CardWrapper>
              <Top4Cardwrapper>
                <Top4CardDiv>
                  <h1>2</h1>
                  <div className="inner">
                    <img
                      src="https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305"
                      alt="사진없노"
                    />
                    <div className="explan">
                      <h3>제작자 : {items.name}</h3>
                      <h4>제목 : {items.title}</h4>
                      <h2>가격 : {items.price} 이더</h2>
                      <h4>♥ {items.liked}</h4>
                    </div>
                  </div>
                </Top4CardDiv>
                <Top4CardDiv>
                  <h1>3</h1>
                </Top4CardDiv>
                <Top4CardDiv>
                  <h1>4</h1>
                </Top4CardDiv>
                <Top4CardDiv>
                  <h1>5</h1>
                </Top4CardDiv>
              </Top4Cardwrapper>
            </Top5Cardwrapper>
            <h1>Other</h1>
            <OtherCardWrapper>
              <OtherCardDiv>
                <h1>5</h1>
                <img
                  src="https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305"
                  alt="사진없노"
                />
                <div className="inner">
                  <div className="explan">
                    <h3>{items.name}</h3>
                    <h4>{items.title}</h4>
                    <h3>{items.price}</h3>
                    <h3>{items.liked}</h3>
                  </div>
                </div>
              </OtherCardDiv>
              <OtherCardDiv>
                <h1>6</h1>
              </OtherCardDiv>
              <OtherCardDiv>
                <h1>7</h1>
              </OtherCardDiv>
              <OtherCardDiv>
                <h1>8</h1>
              </OtherCardDiv>
              <OtherCardDiv>
                <h1>9</h1>
              </OtherCardDiv>
            </OtherCardWrapper>
          </RankContent>
        </ContentsDiv>
      </InnreContent>
    </MainH>
  );
};

export default Rank;
