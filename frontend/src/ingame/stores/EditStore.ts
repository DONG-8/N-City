import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Game } from 'phaser';
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'
import Editmap from '../scenes/Editmap'
import Game from "../scenes/Game"
import axios from 'axios';

enum GameMode {
  GAME,
  EDIT
}

enum MakingMode {
  CREATE, 
  DELETE
}

enum ItemCategory {
  GROUND,
  CHAIR,
  WHITEBOARD,
  WALL,
}

interface ILocationInfo {
  locationInfo : {
    x : number,
    y : number,
    gid : number,
  }
}

export async function JoinUserRoomAPI(userId : number) {
  const result = await axios
  .post(`http://localhost:8080/api/myroom/${userId}`)

  return result
}

const initialState = {
  EditMode : GameMode.GAME,
  Categori : ItemCategory.GROUND ,
  makingMode : MakingMode.CREATE,
  locationInfo : {
    x : 0,
    y : 0,
    gid: 0,
  },
  userId : 1,
  userMap : {},
  arts : {}
}


export const EditSlice = createSlice({
  name : 'edit',
  initialState,
  reducers : { 
    // 에딧모드를 시작하게 해주세요
    EditModeChange : (state) => {
      const NewMode = state.EditMode === GameMode.GAME ? GameMode.EDIT : GameMode.GAME
      state.EditMode = NewMode;
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.changeGameMode(NewMode)
    },
    // 에딧바에서 카테고리 변경 이슈
    CategoriChange: (state,action : PayloadAction<number>) => {
      const NewCategori = action.payload
      state.Categori = NewCategori
      const Editmap = phaserGame.scene.keys.Editmap as Editmap
      // Editmap.changeCategori(NewCategori)
    },
    // 생성, 삭제에 따른 변경
    // MakingModeChange : (state,action : PayloadAction<number>) => {
    //   state.EditMode = action.payload
    // },
    MakingModeChange : (state,action : PayloadAction<number>) => {
      const mkMode = action.payload === MakingMode.CREATE ? MakingMode.CREATE : MakingMode.DELETE
      state.makingMode = mkMode
      const game = phaserGame.scene.keys.Editmap as Editmap
      // game.modeChange(mkMode)
    },

    LocationInfoChange : (state, action : PayloadAction<ILocationInfo["locationInfo"]>) => {
      // store의 location info 변경
      state.locationInfo.x = action.payload.x
      state.locationInfo.y = action.payload.y
      state.locationInfo.gid = action.payload.gid
    },
    UserMapInfo: (state,action : PayloadAction<object>) => {
      // 유저 맵 정보에 대해서 한번 요청이 들어오면 이 정보를 저장한다.
      // 이렇게 하면 한번 불러 온 맴에 대해서는 사용이 가능하다.
      const M = action.payload
      state.userMap = action.payload
      const Bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
    },

    GetUserArts: (state,action : PayloadAction<object>) => {
      // 유저가 가진 작품 정보에 대해서 한번 요청이 들어오면 이 정보를 저장한다.
      state.arts = action.payload
    }
  }
})

export const {
  EditModeChange,
  CategoriChange,
  MakingModeChange,
  LocationInfoChange,
  UserMapInfo,
  GetUserArts
} = EditSlice.actions

export default EditSlice.reducer