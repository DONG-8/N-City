import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'
enum BackgroundMode {
  DAY,
  NIGHT,
}

interface userProductInfo {
  content:[{productFileUrl:'', productId:0, productView: true, productXCoordinate:0, productYCoordinate: 0}]
}

export function getInitialBackgroundMode() {
  const currentHour = new Date().getHours() // 시간 파악후 
  return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT // 낮밤 고르게 하기
}

export function sanitizeId(id: string) { // 살균시킨 아이디 ?
  let sanitized = id

  if (sanitized.length > 9 && sanitized.endsWith('-ss')) { //  10글자 이상이고 -ss로 끝난다면
    sanitized = sanitized.substring(0, sanitized.length - 3) // 바꿔준다?
  }
  return sanitized.replace(/[^0-9a-z]/gi, 'G') // 뭔지 모르겟음
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    backgroundMode: getInitialBackgroundMode(), // 낮밤 구분하기
    sessionId: '', // 몇번방?
    videoConnected: false, // 비디오 연결 유무
    loggedIn: false, // 로그인 되어있나
    playerNameMap: new Map<string, string>(), // 뭘까요
    userProducts: {content:[{productFileUrl:'', productId:0, productView: true, productXCoordinate:0, productYCoordinate: 0}]}
  },
  reducers: {
    toggleBackgroundMode: (state) => {  // 배경 바꿔주기
      const newMode =
        state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY
      state.backgroundMode = newMode
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap // ⭐ 모르겠어요
      bootstrap.changeBackgroundMode(newMode)
    },
    setSessionId: (state, action: PayloadAction<string>) => { // 세션id 바꾸기
      state.sessionId = action.payload
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => { //방이름 이름 저장
      state.playerNameMap.set(action.payload.id, action.payload.name)
    },
    removePlayerNameMap: (state, action: PayloadAction<string>) => { // 
      state.playerNameMap.delete(sanitizeId(action.payload))
    },
    setUserProducts: (state, action : PayloadAction<userProductInfo> ) => {
      state.userProducts = action.payload
      console.log(state.userProducts)
    }
  },
})

export const {
  toggleBackgroundMode,
  setSessionId,
  setVideoConnected,
  setLoggedIn,
  setPlayerNameMap,
  removePlayerNameMap,
  setUserProducts
} = userSlice.actions

export default userSlice.reducer
