import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getAvatarString, getColorByString } from "../util";

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  background-color: yellow;
  left: 0px;
  color: black;
`;

const XButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 20px;
  top: 10px;
  background-color: red;
`;

const CategoriWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const CategoriBar = styled.div`
  position: relative;
  width: 100px;
  height: 100%;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-content: center;

  div {
    width: 100%;
    height: 12.5%;
  }
`;

const EditBar = () => {
  return (
    <Sidebar>
      <h1>맵 수정</h1>
      <XButton>X</XButton>
      <CategoriWrapper>
        <CategoriBar>
          <div>ground</div>
          <div>Chair</div>
          <div>Basement</div>
          <div>computer</div>
          <div>GenericObjects</div>
          <div>ObjectsOnCollide</div>
          <div>Object</div>
          <div>Wall</div>
        </CategoriBar>
      </CategoriWrapper>
    </Sidebar>
  );
};

export default EditBar;
