// import { useEffect, useState } from "react";
// import EditPhaserGame from "./EditPhaserGame";
// import styled from "styled-components";
// import { useAppSelector } from "./hooks";
// import ComputerDialog from "./components/ComputerDialog"; // 컴퓨터 사용
// import WhiteboardDialog from "./components/WhiteboardDialog"; // 화이트보드 사용
// // import VideoConnectionDialog from './components/VideoConnectionDialog' // 캐릭터 고를때 웹캠 연결됐나 확인용
// import Chat from "./components/Chat"; // 채팅 관련
// import HelperButtonGroup from "./components/HelperButtonGroup"; // 우측 하단 버튼들
// import phaserGame from "./PhaserGame";
// import VendingMachineDialog from "./components/VendingMachineDialog";

// import Bootstrap from "./scenes/Bootstrap";
// import Game from "./scenes/Game";
// const Backdrop = styled.div`
//   position: absolute;
//   height: 100%;
//   width: 100%;
// `;

// window.addEventListener(
//   "keydown",
//   function (e) {
//     if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
//       e.preventDefault();
//     }
//   },
//   false
// );

// const EditGameApp = () => {
//   const Setting = useAppSelector((state) => state.edit.EditMode);

//   useEffect(() => {
//     (window as any).game = EditPhaserGame;
//     // setTimeout(() => ConnectBootstrap(), 1000); // Bootstrap 연결
//     // setTimeout(() => ConnectGame(), 1500); // 게임 접속
//     // console.log(availableRooms, "로드중?!");
//     return () => {
//       (window as any).game.destroy(true);
//     };
//   });

//   return (
//     // ui 는 상황별로 다르게 열리고 , 컴퓨터/화이트 보드가 안열린 이상 우측아래 버튼들 활성화
//     <>
//       <Backdrop>
//         {ui}
//         {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
//         {/* <EditBar></EditBar> */}
//       </Backdrop>
//     </>
//   );
// };

// export default EditGameApp;

import React from "react";

const EditGameApp = () => {
  return <div>EditGameApp</div>;
};

export default EditGameApp;
