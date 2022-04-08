import React, { useState } from "react";
import styled from "styled-components";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const PopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  min-width: 1340px;
  height: 100%;
  /* background-color: #f2dbdb; */
  background-color: black;
  color: black;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const Exit = styled.div`
  position: absolute;
  right: 10%;
  /* background-color: red; */
  width: 100px;
  height: 100px;
  font-size: 50px;
  text-align: center;
  z-index: 100;
  cursor: pointer;
`;

const Popup = () => {
  const [exitPopup, setExitPopup] = useState<Boolean>(true);

  const clickExit = () => {
    setExitPopup(!exitPopup);
  };

  return (
    <>
      {exitPopup ? (
        <PopupWrapper>
          <Exit onClick={() => clickExit()}>X</Exit>
          <Page2></Page2>
          <Page3></Page3>
          <Page4></Page4>
        </PopupWrapper>
      ) : null}
    </>
  );
};

export default Popup;
