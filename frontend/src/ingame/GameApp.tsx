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
import store from "./stores";

enum GameMode {
  GAME,
  EDIT,
}

enum MakingMode {
  CREATE,
  DELETE,
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

export interface IRoomData {
  roomId: string;
  name: string;
  description: string;
  password: null;
  autoDispose: boolean;
}

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

  const [values, setValues] = useState<IRoomData>({
    // 방이름 방설명 패스워드
    roomId: "userId", // userId 넣어주기
    name: "혀농이방",
    description: "혀농이방이야",
    password: null,
    autoDispose: false, // 마지막 사용자가 나오면 자동으로 방 없애기 (화이트보드 때문에 지금은 false)
  });

  const availableRooms = useAppSelector((state) => state.room.availableRooms); //가능한 방들 표시 해주기
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
  // const makingMode = useAppSelector((state) => state.edit.makingMode)

  let game = phaserGame.scene.keys.game as Game;
  let bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
  let isAvaliable = false;

  const checkRoomIsAvaliable = () => {
    console.log(availableRooms);
    for (var roomId in availableRooms) {
      console.log(roomId, "roomID");
      if (roomId === "test") {
        return true;
      }
    }
    return false;
  };

  const ConnectBootstrap = async () => {
    // ⭐ bootstrap 연결하기
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    console.log(checkRoomIsAvaliable());

    // if(isAvaliable) { // 방이 이미 존재한다면 참가
    await bootstrap.network
      .createRoom(values)
      .then(() => bootstrap.launchGame())
      .catch((error) => console.error(error));
    // } else {  // 방 없었다면 만들기
    //   // setValues({ ...values, ['roomId']: 'useasrId'}) // 방 아이디 => 유저 아이디
    //   // setValues({ ...values, ['name']: 'asdfasdfasdf'}) // 방 이름
    //   // setValues({ ...values, ['description']: '혀농이 방이얌'}) // 방 설명

    //   await bootstrap.network
    //     .createRoom(values)
    //     .then(() => bootstrap.launchGame())
    //     .catch((error) => console.error(error))
    //   isAvaliable = true

    // }
    setTimeout(() => console.log(availableRooms), 10000);
  };

  const ConnectGame = () => {
    // 게임 접속
    game = phaserGame.scene.keys.game as Game;
    game.registerKeys(); // 키 설정
    game.myPlayer.setPlayerName("임현홍"); // ❗ 내이름 설정해주기
    game.myPlayer.setPlayerTexture(avatars[1].name); // 캐릭터 종류 설정 (❗ 저장되어 있는 캐릭터 경로나 인덱스 넣어주기)
    game.network.readyToConnect(); // 네트워크 연결

    console.log(availableRooms);
  };

  let ui: JSX.Element;

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
        <MainDialog></MainDialog>
        {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
      </Backdrop>
    </>
  );
};

export default GameApp;
