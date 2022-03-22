import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'

import { useAppSelector } from './hooks'
// typescript에서 useSelector 사용 하려면 hooks를 만들어서 불러와야한다.

import RoomSelectionDialog from './components/RoomSelectionDialog' // 처음의 퍼블릭 or create room 화면
import LoginDialog from './components/LoginDialog' // 캐릭터 고르는 화면
import ComputerDialog from './components/ComputerDialog' // 컴퓨터 사용
import WhiteboardDialog from './components/WhiteboardDialog' // 화이트보드 사용
import VideoConnectionDialog from './components/VideoConnectionDialog' // 캐릭터 고를때 웹캠 연결됐나 확인용 
import Chat from './components/Chat' // 채팅 관련 
import HelperButtonGroup from './components/HelperButtonGroup' // 우측 하단 버튼들 
import phaserGame from './PhaserGame'

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
const  GameApp: Function = ()=> {
  useEffect(()=>{
    (window as any).game = phaserGame
    return()=>{
      (window as any).game.destroy(true)
    }
  },[])
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  // 로그인 했는지 확인해주는 state
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)

  let ui: JSX.Element
  if (loggedIn) { // ui가 비어있는데 컴퓨터가 연결이 되었으면 ui로 컴퓨터 화면이 뜬다.
    if (computerDialogOpen) { 
      ui = <ComputerDialog />
    } else if (whiteboardDialogOpen) {
      ui = <WhiteboardDialog />
    } else {  // 그 외의 모든 상황에서는 채팅 과 비디오 화면을 띄워준다.
      ui = (
        <div>
          <Chat />
          {!videoConnected && <VideoConnectionDialog />}
        </div>
      )
    }
  } else if (roomJoined) { // 만일 로그인이 안되어있는 상황  + 퍼블릭/로컬 첫화면 선택하면?
    ui = <LoginDialog /> // 로그인 화면을 보여준다.
  } else { // === if (roomJoined === false)  // 만일 로그인이 안되어있고 + 퍼블릭/로컬 첫화면 선택을 안했다면?
    ui = <RoomSelectionDialog /> // 퍼블릭/로컬 첫화면 선택
  }

  return (
    // ui 는 상황별로 다르게 열리고 , 컴퓨터/화이트 보드가 안열린 이상 우측아래 버튼들 활성화
      <>
        <Backdrop>
          {ui}
          {!computerDialogOpen && !whiteboardDialogOpen && (
            <HelperButtonGroup />
          )}
        </Backdrop>
      </>  
  );
}

export default GameApp
