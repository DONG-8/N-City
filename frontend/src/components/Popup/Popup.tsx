import React from "react";
import styled from "styled-components";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page1 from "./Page1";

const PopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  min-width: 1340px;
  height: 100%;
  /* background-color: #f2dbdb; */
  background-color: black;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const Popup = () => {
  return (
    <>
      <PopupWrapper>
        <Page1></Page1>
        <Page2></Page2>
        <Page3></Page3>
        <Page3></Page3>
      </PopupWrapper>
    </>
  );
};

export default Popup;
