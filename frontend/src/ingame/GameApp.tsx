import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "./hooks";
// typescript에서 useSelector 사용 하려면 hooks를 만들어서 불러와야한다.

import MainDialog from "./components/MainDialog"; // 캐릭터 고르는 화면
import ComputerDialog from "./components/ComputerDialog"; // 컴퓨터 사용
import WhiteboardDialog from "./components/WhiteboardDialog"; // 화이트보드 사용
// import VideoConnectionDialog from './components/VideoConnectionDialog' // 캐릭터 고를때 웹캠 연결됐나 확인용
import Chat from "./components/Chat"; // 채팅 관련
import phaserGame from "./PhaserGame";
import VendingMachineDialog from "./components/VendingMachineDialog";

import Bootstrap from "./scenes/Bootstrap";
import Game from "./scenes/Game";
import Start from "./scenes/Start";
import EditBar from "./components/EditBar";
import UIBar from "./components/Bar/UIBar";
import { IRoomData } from "../types/Rooms";

import { UserMapInfo } from "./stores/EditStore";
import { setUserProducts } from "./stores/UserStore";

// 쿼리
import { postRoomJoin, getCharacter } from "../store/apis/myRoom";
import { getUsercollectedInfo } from "../store/apis/user";
import { useMutation } from "react-query";
import basicData from "./scenes/map.json";
import Editmap from "./scenes/Editmap";
import GameLoading from "../components/Popup/GameLoading";

const Backdrop = styled.div``;

window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      // e.preventDefault();
    }
  },
  false
);
const LoadingBox = styled.div`
  
`
const GameApp: Function = () => {
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(0)
  const [total, setTotal] = useState(0)

  const { userId } = useParams();
  const roomuserId = Number(userId);
  const stringId = String(roomuserId);
  let map = basicData;
  let characterIdx = "1";
  const dispatch = useAppDispatch();
  // 유저 아이디를 통한 방 정보 요청 --> 로딩시간중 안불러와지면? 로딩이 필요하겠다.
  // 쿼리를 사용해야겠음
  const userNick = sessionStorage.getItem("userNickname") || "noname";
  const myId = sessionStorage.getItem("userId")?  sessionStorage.getItem("userId") : "0";
 

  const { mutate: RoomInfo } = useMutation<any, Error>( // 방 정보 가져오기 
    "postRoomInfo",
    async () => {
      return await postRoomJoin(roomuserId);
    },
    {
      onSuccess: async (res) => {
        setToday(res.myRoomTodayCnt)
        setTotal(res.myRoomTotalCnt)
        if (res.myRoomBackground === null) {
          console.log('없음')
          map = basicData;
        } else {
          
          map = res.myRoomBackground;
        }
        dispatch(UserMapInfo(res.myRoomBackground));
        console.log("방 정보 불러오기", res);
      },
      onError: (err: any) => {
      },
    }
  );

  const { // 내 캐릭터 가져오기 
    mutate: getCharacterIndex,
    } = useMutation<any, Error>(
    "getCharacter",
    async () => {
      return await getCharacter(Number(myId));
    },
    {
      onSuccess: (res) => {
        characterIdx = res.myRoomCharacter
        console.log(res)
        console.log(characterIdx)
      },
      onError: (err: any) => {
        characterIdx = "1"
        console.log('userId를 받아오지 못했습니다.',err)
      },
    }
  );

  let myArts = {
    content: [
      {
        productThumbnailUrl: "",
        productId: 0,
        productView: true,
        productXCoordinate: 0,
        productYCoordinate: 0,
      },
    ],
  };

  const { mutate: getMyArts } = useMutation<any, Error>(
    "getUsercollectedInfo",
    async () => {
      return await getUsercollectedInfo(roomuserId);
    },
    {
      onSuccess: async (res) => {
        myArts = res;
        dispatch(setUserProducts(res));
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const Setting = useAppSelector((state) => state.edit.EditMode);

  useEffect(() => {
    (window as any).game = phaserGame;
    // 필요한 API 불러오기 
    setLoading(true); // 로딩 페이지 
    getMyArts();
    RoomInfo();
    getCharacterIndex();

    // 게임 연결 
    setTimeout(() => ConnectStart(), 3000);
    setTimeout(() => {ConnectBootstrap();}, 4000); // Bootstrap 연결
    setTimeout(() => {
      ConnectGame();
      setLoading(false);
    },5000); // 게임 접속
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
  const VendingMachineDialogOpen = useAppSelector(
    (state) => state.vendingMachine.vendingMachineDialogOpen
  );

  let game = phaserGame.scene.keys.game as Game;
  let bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
  let start = phaserGame.scene.keys.start as Start;

  async function ConnectStart() {
    // 부트스트랩 시작시키기
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    bootstrap.mapInfo = map;
    bootstrap.myArtList = myArts;

    start = phaserGame.scene.keys.start as Start;
    start.launchBootstrap();

    game = phaserGame.scene.keys.game as Game;
    game.myArtList = myArts;

    const editmap = phaserGame.scene.keys.Editmap as Editmap;
    editmap.myArtList = myArts;
  }

  async function ConnectBootstrap() {
    // ⭐ bootstrap 연결하기
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;

    await bootstrap.network
      .joinRoom(stringId)
      .then(() => bootstrap.launchGame(Setting))
      .catch((error) => console.error(error));
  }

  async function ConnectGame() {
    // 게임 접속
    game = phaserGame.scene.keys.game as Game;
    console.log('character', characterIdx)
    game.registerKeys(); // 키 설정
    game.myPlayer.setPlayerName(userNick); // ❗ 내이름 설정해주기
    game.myPlayer.setPlayerTexture(characterIdx); // 캐릭터 종류 설정 (❗ 저장되어 있는 캐릭터 경로나 인덱스 넣어주기)
    game.network.readyToConnect(); // 네트워크 연결
  }

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
    // 그 외의 모든 상황에서는 채팅을 띄워준다.
    ui = (
      <div>
        <Chat />
      </div>
    );
  }

  return (
    // ui 는 상황별로 다르게 열리고 , 컴퓨터/화이트 보드가 안열린 이상 우측아래 버튼들 활성화
    <>
      <Backdrop>
       {loading && <GameLoading/>}
        {Setting ? <EditBar></EditBar> : <UIBar today={today} total={total}></UIBar>}
        {Setting ? null : <>{ui}</>}
      </Backdrop>
    </>
  );
};

export default GameApp;
