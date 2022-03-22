import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'
import { getAvatarString, getColorByString } from '../util'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

SwiperCore.use([Navigation]) // 스와이퍼 ->  캐릭터 고르는 캐러셀

const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`

const Title = styled.p`
  margin: 5px;
  font-size: 20px;
  color: #c2c2c2;
  text-align: center;
`

const RoomName = styled.div`
  max-width: 500px;
  max-height: 120px;
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
  max-width: 500px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`

const SubTitle = styled.h3`
  width: 160px;
  font-size: 16px;
  color: #eee;
  text-align: center;
`

const Content = styled.div`
  display: flex;
  margin: 36px 0;
`

const Left = styled.div`
  margin-right: 48px;

  --swiper-navigation-size: 24px;

  .swiper-container {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #dbdbe0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`

const Right = styled.div`
  width: 300px;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const avatars = [
  { name: 'adam', img: "/essets/login/Adam_login.png" },
  { name: 'ash', img:"/essets/login/Ash_login.png" },
  { name: 'lucy', img: "/essets/login/Lucy_login.png" },
  { name: 'nancy', img: "/essets/login/Nancy_login.png" },
]


for (let i = avatars.length - 1; i > 0; i--) { // 아바타 랜덤으로 보여주기
  const j = Math.floor(Math.random() * (i + 1))
  ;[avatars[i], avatars[j]] = [avatars[j], avatars[i]]
}

export default function LoginDialog() {
  const [name, setName] = useState<string>('') // 이름 정하기
  const [avatarIndex, setAvatarIndex] = useState<number>(0) // 몇번째 캐릭터 선택
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false) // 이름이 비었어요
  const dispatch = useAppDispatch() 
  const videoConnected = useAppSelector((state) => state.user.videoConnected) 
  const roomJoined = useAppSelector((state) => state.room.roomJoined) // 방에 들어왔음
  const roomName = useAppSelector((state) => state.room.roomName) // 들어가려는 방 이름
  const roomDescription = useAppSelector((state) => state.room.roomDescription) // 들어가려는 방설명
  const game = phaserGame.scene.keys.game as Game 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { // 제출하게 되면
    event.preventDefault() 
    if (name === '') {
      setNameFieldEmpty(true) 
    } else if (roomJoined) { // 이름이 입력되어있고 방에 들어왔다면
      console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
      game.registerKeys() // ⭐
      game.myPlayer.setPlayerName(name) // 내이름 설정해주기
      game.myPlayer.setPlayerTexture(avatars[avatarIndex].name) // 캐릭터 종류 설정
      game.network.readyToConnect() // 네트워크 연결
      dispatch(setLoggedIn(true)) // 로그인 되어있다 true
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>어서오세요</Title>
      <RoomName>
        <Avatar style={{ background: getColorByString(roomName) }}>
          {getAvatarString(roomName)}
        </Avatar>
        <h3>{roomName}</h3>
      </RoomName>
      <RoomDescription>
        <ArrowRightIcon /> {roomDescription}
      </RoomDescription>
      <Content>
        <Left>
          <SubTitle>캐릭터를 고르세요</SubTitle>
          <Swiper
            navigation
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setAvatarIndex(swiper.activeIndex)
            }}
          >
            {avatars.map((avatar) => (
              <SwiperSlide key={avatar.name}>
                <img src={avatar.img} alt={avatar.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Left>
        <Right>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            variant="outlined"
            color="secondary"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && '이름을 입력하세요'}
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value)
            }}
          />
          {!videoConnected && (
            <Warning>
              <Alert variant="outlined" severity="warning">
                <AlertTitle>Warning</AlertTitle>
                No webcam/mic connected - <strong>connect one for best experience!</strong>
              </Alert>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  game.network.webRTC?.getUserMedia()
                }}
              >
                Connect Webcam
              </Button>
            </Warning>
          )}

          {videoConnected && (
            <Warning>
              <Alert variant="outlined">Webcam connected!</Alert>
            </Warning>
          )}
        </Right>
      </Content>
      <Bottom>
        <Button variant="contained" color="secondary" size="large" type="submit">
          Join
        </Button>
      </Bottom>
    </Wrapper>
  )
}
