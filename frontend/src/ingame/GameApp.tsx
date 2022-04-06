import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppSelector, useAppDispatch  } from "./hooks";
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
import Start from "./scenes/Start";
import EditBar from "./components/EditBar";
import UIBar from "./components/Bar/UIBar";
import { IRoomData } from '../types/Rooms'

import { UserMapInfo } from "./stores/EditStore";
// 쿼리
import { postRoomJoin } from "../store/apis/myRoom";
import { getUsercollectedInfo } from "../store/apis/user";
import {useMutation} from "react-query";
import basicData from './scenes/map.json';
import Editmap from "./scenes/Editmap";

const Backdrop = styled.div`

`;

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
  const userId = useAppSelector((state) => state.edit.userId);
  const availableRooms = useAppSelector((state) => state.room.availableRooms); //가능한 방들 표시 해주기
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)
  let map = basicData
  const dispatch = useAppDispatch();
  // 유저 아이디를 통한 방 정보 요청 --> 로딩시간중 안불러와지면? 로딩이 필요하겠다.
  // 쿼리를 사용해야겠음
  const [rooms, setRooms] = useState<any[]>([])

  const {
    mutate: RoomInfo,
  } = useMutation<any, Error>(
    "postRoomInfo",
    async () => {
      return await postRoomJoin(userId);
    },
    {
      onSuccess: async (res) => {
        map = res.myRoomBackground
        dispatch(UserMapInfo(res.myRoomBackground));

      },
      onError: (err: any) => {
      },
    }
  );

  let myArts = {content:[{productThumbnailUrl:'', productId:0, productView: true, productXCoordinate:0, productYCoordinate: 0}]}
  const {
    mutate: getMyArts,
    } = useMutation<any, Error>(
    "getUsercollectedInfo",
    async () => {
      return await getUsercollectedInfo(1);
    },
    {
      onSuccess: async (res) => {
        console.log('불러오기 완료')
        myArts = res
      },
      onError: (err: any) => {
        console.log(err)
      },
    }
  );

  const Setting = useAppSelector((state) => state.edit.EditMode);
  const [values, setValues] = useState<IRoomData>({ // 방이름 방설명 패스워드
    roomId : 'userId',  // userId 넣어주기 
    name: '혀농이방',
    description: '혀농이방이야',
    password: null,
    autoDispose: false, // 마지막 사용자가 나오면 자동으로 방 없애기 (화이트보드 때문에 지금은 false)
  });

  const progress = async () => {
    // await ConnectStart()
    // await isAvaliable1()
    // await ConnectBootstrap()
    // await ConnectGame()
    setTimeout(() =>  ConnectStart(), 3000);
    setTimeout(() => isAvaliable1(), 5500)
    setTimeout(() => ConnectBootstrap(), 6000); // Bootstrap 연결
    setTimeout(() => ConnectGame(), 7000); // 게임 접속
    setTimeout(() => isAvaliable1(), 9000)
  }

  useEffect(() => {
    (window as any).game = phaserGame;
    getMyArts()
    RoomInfo()

    setTimeout(() => progress(), 3000);
    // setTimeout(() => isAvaliable1(), 5500)
    // setTimeout(() => ConnectBootstrap(), 6000); // Bootstrap 연결
    // setTimeout(() => ConnectGame(), 7000); // 게임 접속
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

  let game = phaserGame.scene.keys.game as Game;
  let bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
  let start = phaserGame.scene.keys.start as Start

  const [ok, setOk] = useState(false)

  async function isAvaliable1() {
    console.log(availableRooms)
    availableRooms.map((room, idx) => {
      if (room.roomId === values.roomId) {
        setOk(true)
        return
      }
    })
  }

  async function ConnectStart ()  {  // 부트스트랩 시작시키기 
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    bootstrap.mapInfo = map
    bootstrap.myArtList = myArts

    start = phaserGame.scene.keys.start as Start
    start.launchBootstrap()

    // game = phaserGame.scene.keys.game as Game;
    // game.myArtList = myArts

    // const editmap = phaserGame.scene.keys.Editmap as Editmap
    // editmap.myArtList = myArts
  }

  async function ConnectBootstrap ()  {    // ⭐ bootstrap 연결하기
    bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
    
    console.log('입장할 시간')
    if (ok) {
      await bootstrap.network
      .joinRoom("userId")
      .then(() => bootstrap.launchGame(Setting))
      .catch((error) => console.error(error))
    } else {
      await bootstrap.network
      .createRoom(values)
      .then(() => bootstrap.launchGame(Setting))
      .catch((error) => console.error(error))
    }
  };

  async function ConnectGame() {    // 게임 접속
    console.log('겜접')
    console.log(availableRooms)
    
    game = phaserGame.scene.keys.game as Game;
    // game.myArtList = myArts

    game.registerKeys(); // 키 설정
    game.myPlayer.setPlayerName("임현홍"); // ❗ 내이름 설정해주기
    game.myPlayer.setPlayerTexture("adam"); // 캐릭터 종류 설정 (❗ 저장되어 있는 캐릭터 경로나 인덱스 넣어주기)
    game.network.readyToConnect(); // 네트워크 연결
  };

  useEffect(() => {
    console.log("useEffect");
    console.log(availableRooms)
    setRooms(availableRooms)
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
        {Setting ? <EditBar></EditBar> : <UIBar></UIBar>}
        <h1>{rooms.map((room, idx) => {
          return <div>
            {room.name}
          </div>
        })}</h1>
      </Backdrop>
    </>
  );
};

export default GameApp;
