import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "./hooks";
// typescript에서 useSelector 사용 하려면 hooks를 만들어서 불러와야한다.

import MainDialog from "./components/MainDialog"; // 캐릭터 고르는 화면
import ComputerDialog from "./components/ComputerDialog"; // 컴퓨터 사용
import WhiteboardDialog from "./components/WhiteboardDialog"; // 화이트보드 사용
// import VideoConnectionDialog from './components/VideoConnectionDialog' // 캐릭터 고를때 웹캠 연결됐나 확인용
import Chat from "./components/Chat"; // 채팅 관련
import HelperButtonGroup from "./components/HelperButtonGroup"; // 우측 하단 버튼들
import phaserGame from "./PhaserGame";
import VendingMachineDialog from "./components/VendingMachineDialog";

import Bootstrap from "./scenes/Bootstrap";
import Game from "./scenes/Game";
import EditBar from "./components/EditBar";
import Background from "./scenes/Background";
import Editmap from "./scenes/Editmap";
import { render } from "react-dom";
import EditPhaserGame from "./EditPhaserGame";
import store from "./stores";

enum GameMode {
  GAME,
  EDIT,
}

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const avatars = [
  { name: "adam", img: "/essets/login/Adam_login.png" },
  { name: "ash", img: "/essets/login/Ash_login.png" },
  { name: "lucy", img: "/essets/login/Lucy_login.png" },
  { name: "nancy", img: "/essets/login/Nancy_login.png" },
];

window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

const GameApp: Function = () => {
  const availableRooms = useAppSelector((state) => state.room.availableRooms);

  const Setting = useAppSelector((state) => state.edit.EditMode);

  useEffect(() => {
    (window as any).game = phaserGame;
    setTimeout(() => ConnectBootstrap(), 1000); // Bootstrap 연결
    setTimeout(() => ConnectGame(), 1500); // 게임 접속
    console.log(availableRooms, "로드중?!");
    return () => {
      (window as any).game.destroy(true);
    };
  }, []);

  const computerDialogOpen = useAppSelector(
    (state) => state.computer.computerDialogOpen
  );
  const whiteboardDialogOpen = useAppSelector(
    (state) => state.whiteboard.whiteboardDialogOpen
  );
  // const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const VendingMachineDialogOpen = useAppSelector(
    (state) => state.vendingMachine.vendingMachineDialogOpen
  );

  const gameMode = useAppSelector((state) => state.edit.EditMode);
  let game = phaserGame.scene.keys.game as Game;
  let bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;

  const ConnectBootstrap = async () => {
    // ⭐ bootstrap 연결하기
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;

    await bootstrap.network
      .joinOrCreatePublic()
      .then(() => bootstrap.launchGame(Setting))
      .catch((error) => console.error(error));
  };

  const ConnectGame = () => {
    // 게임 접속
    game = phaserGame.scene.keys.game as Game;
    game.registerKeys(); // 키 설정
    game.myPlayer.setPlayerName("임현홍"); // ❗ 내이름 설정해주기
    game.myPlayer.setPlayerTexture(avatars[1].name); // 캐릭터 종류 설정 (❗ 저장되어 있는 캐릭터 경로나 인덱스 넣어주기)
    game.network.readyToConnect(); // 네트워크 연결
    console.log(availableRooms, "ConnectGame?!");
  };

  useEffect(() => {
    console.log(availableRooms, "있는방인가염?!");
  }, [availableRooms]);

  let ui: JSX.Element;
  ui = <MainDialog />;
  if (computerDialogOpen) {
    // 화면 공유
    ui = <ComputerDialog />;
  } else if (whiteboardDialogOpen) {
    // 화이트보드
    ui = <WhiteboardDialog />;
  } else if (VendingMachineDialogOpen) {
    ui = <VendingMachineDialog />; // 작품
  } else {
    // 그 외의 모든 상황에서는 채팅 과 비디오 화면을 띄워준다.
    ui = (
      <div>
        <Chat />

        {/* {!videoConnected && <VideoConnectionDialog />} */}
      </div>
    );
  }

  return (
    // ui 는 상황별로 다르게 열리고 , 컴퓨터/화이트 보드가 안열린 이상 우측아래 버튼들 활성화
    <>
      <Backdrop>
        {ui}
        {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
        {gameMode === GameMode.EDIT ? <EditBar></EditBar> : null}
      </Backdrop>
    </>
  );
};

export default GameApp;
