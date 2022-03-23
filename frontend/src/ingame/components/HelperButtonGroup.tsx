import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import StoreIcon from '@mui/icons-material/Store';
import ShareIcon from '@mui/icons-material/Share'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import CloseIcon from '@mui/icons-material/Close'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import { toggleBackgroundMode } from '../stores/UserStore'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getAvatarString, getColorByString } from '../util'
import StoreModal from './StoreModal'
import Bootstrap from '../scenes/Bootstrap'
import phaserGame from '../PhaserGame'
enum BackgroundMode {
  DAY,
  NIGHT,
}



const Backdrop = styled.div`
  position: fixed;
  display: flex;
  gap: 10px;
  bottom: 16px;
  right: 16px;
  align-items: flex-end;

  .wrapper-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const Wrapper = styled.div`
  position: relative;
  font-size: 16px;
  color: #eee;
  background: #222639;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 16px;
  padding: 15px 35px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .tip {
    margin-left: 12px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

const Title = styled.h3`
  font-size: 24px;
  color: #eee;
  text-align: center;
`

const RoomName = styled.div`
  margin: 10px 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;

  h3 {
    font-size: 24px;
    color: #eee;
  }
`

const RoomDescription = styled.div`
  margin: 0 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`

const StyledFab = styled(Fab)`
  &:hover {
    color: #1ea2df;
  }
`
const ModalWrapper = styled.div`
   position: absolute;
    bottom: 10vh;
    right: 5vw;
  width: 80vw;
  height: 80vh;
  color: #eee;
  background: white;
  box-shadow: 0px 0px 5px #0000006f;
  border-radius: 5px;
  padding: 15px 35px 15px 15px;

  .close {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .tip {
    margin-left: 12px;
  }
`
const StoreWapper = styled.div`
  .nftstore{
    margin-left: 1vw;
    margin-top: 2vh;
    width: 80vw;
    height: 78vh;
    overflow: auto;
    color: black;
    overflow-y:scroll;
    overflow-x:hidden;
    &::-webkit-scrollbar{width: 10px; height:12px;}
    &::-webkit-scrollbar-thumb{ background-color: teal; border-radius: 10px; } 
    &::-webkit-scrollbar-track{ background-color: #fbe9e1;}
  }
`

export default function HelperButtonGroup() {
  const [showControlGuide, setShowControlGuide] = useState(false)
  const [showRoomInfo, setShowRoomInfo] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [bgmstate,setBgmstate] = useState(true)
  const backgroundMode = useAppSelector((state) => state.user.backgroundMode)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomId = useAppSelector((state) => state.room.roomId)
  const roomName = useAppSelector((state) => state.room.roomName)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  const dispatch = useAppDispatch()
  const [bgm,setBgm] = useState(new Audio())
  bgm.src = ' https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-FLAC-File.flac'
  bgm.volume = 0.05
  useEffect(()=>{
    if (bgmstate){
      bgm.play()
    }
    else{
      bgm.pause()
    }
  },[bgmstate])
  return (
    <Backdrop> 
      <div className="wrapper-group">
        {showRoomInfo && (
          <Wrapper>
            <IconButton className="close" onClick={() => setShowRoomInfo(false)} size="small">
              <CloseIcon />
            </IconButton>
            <RoomName>
              <Avatar style={{ background: getColorByString(roomName) }}>
                {getAvatarString(roomName)}
              </Avatar>
              <h3>{roomName}</h3>
            </RoomName>
            <RoomDescription>
              <ArrowRightIcon /> 방 ID: {roomId}
            </RoomDescription>
            <RoomDescription>
              <ArrowRightIcon /> 방 설명: {roomDescription}
            </RoomDescription>
            <p className="tip">
              <LightbulbIcon />
              안녕 HelpButtonGroup Page야😄
            </p>
          </Wrapper>
        )}
        {showControlGuide && (
          <Wrapper>
            <Title>Controls</Title>
            <IconButton className="close" onClick={() => setShowControlGuide(false)} size="small">
              <CloseIcon />
            </IconButton>
            <ul>
              <li>
                <strong>이동키로</strong> 움직이세요
              </li>
              <li>
                <strong>E</strong> 로 앉으세요
              </li>
              <li>
                <strong>R</strong> 를 이용해 상호작용하세요
              </li>
              
              <li>
                <strong>ESC</strong> 로 채팅을 끄세요
              </li>
            </ul>
          </Wrapper>
        )}
        {showModal && (
          <ModalWrapper>
            <IconButton  className="close" onClick={() => setShowModal(false)} size="small">
              <CloseIcon />
            </IconButton>
              <StoreWapper className='StoreWapper' >
                <div className='nftstore' >
                  <StoreModal />
                </div>
              </StoreWapper>
          </ModalWrapper>
        )}
      </div>
      <ButtonGroup>
        {roomJoined && (
          <>
            <Tooltip title="Room Info">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowRoomInfo(!showRoomInfo)
                  setShowModal(false)
                  setShowControlGuide(false)
                }}
              >
                <ShareIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="Control Guide">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowControlGuide(!showControlGuide)
                  setShowModal(false)
                  setShowRoomInfo(false)}}>
                <HelpOutlineIcon />
              </StyledFab>
            </Tooltip>
            <Tooltip title="스토어">
              <StyledFab
                size="small"
                onClick={() => {
                  setShowModal(!showModal)
                  setShowControlGuide(false)
                  setShowRoomInfo(false)}}>
                <StoreIcon />
              </StyledFab>
            </Tooltip>
          </>
        )}
        <Tooltip title="배경음 ">
          <StyledFab size="small">
            <AudiotrackRoundedIcon onClick={()=>{setBgmstate(!bgmstate)}}/>
          </StyledFab>
        </Tooltip>
        <Tooltip title="메인으로 돌아가기">
          <StyledFab size="small">
            <a href="/" >
              <CottageRoundedIcon />
            </a>
          </StyledFab>
        </Tooltip>
        <Tooltip title="Switch Background Theme">
          <StyledFab size="small" onClick={() => dispatch(toggleBackgroundMode())}>
            {backgroundMode === BackgroundMode.DAY ? <DarkModeIcon /> : <LightModeIcon />}
          </StyledFab>
        </Tooltip>
      </ButtonGroup>
    </Backdrop>
  )
}

