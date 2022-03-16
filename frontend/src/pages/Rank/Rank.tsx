import React, { useState } from "react";
import styled from "styled-components";

const MainH = styled.div`
  width: 100%;
  height: auto;
`;

const BackgroundColorDiv = styled.div`
  width: 100%;
  height: 200px;
  background-color: pink;
`;

const InnreContent = styled.div`
  position: relative;
  width: 1370px;
  height: 100%;
  /* background-color: pink; */
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
  top: 90px;
  position: -webkit-sticky;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
  div {
    width: 33.33%;
    height: 100%;
    /* background-color: red; */
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: solid; */
    border-bottom: 2px solid #ff865b;
  }
  .clicked {
    background-color: white;
    border-left: 2px solid #ff865b;
    border-right: 2px solid #ff865b;
    border-top: 2px solid #ff865b;
    border-bottom: none;
    :hover {
      background-color: #f9f9f9;
      transition: 1s;
    }
  }
`;

const ContentsDiv = styled.div`
  width: 100%;
  height: 1000px;
  /* background-color: black; */
  display: flex;
`;

const Rank = () => {
  const [click, setClick] = useState<string>("Room");

  return (
    <MainH>
      <BackgroundColorDiv>
        <InnreContent>
          <h2>Ranking</h2>
        </InnreContent>
      </BackgroundColorDiv>
      <InnreContent>
        <Cattegori>
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
        </Cattegori>
        <ContentsDiv></ContentsDiv>
      </InnreContent>
    </MainH>
  );
};

export default Rank;
