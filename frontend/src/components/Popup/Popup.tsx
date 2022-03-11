import React from "react";
import styled from "styled-components";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 10;
  position: absolute;
  display: flex;
  flex-direction: row;
`;

const PopupPage = styled.div`
  width: 100%;
  min-width: 100%;
  height: 100%;
  color: white;
`;

const Popup = () => {
  return (
    <PopupWrapper>
      <PopupPage>
        <Page1></Page1>
      </PopupPage>
      <PopupPage>
        <Page2></Page2>
      </PopupPage>
      <PopupPage>
        <Page3></Page3>
      </PopupPage>
    </PopupWrapper>
  );
};

export default Popup;
