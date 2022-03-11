import React from "react";
import styled from "styled-components";

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
      <PopupPage></PopupPage>
      <PopupPage></PopupPage>
      <PopupPage></PopupPage>
    </PopupWrapper>
  );
};

export default Popup;
