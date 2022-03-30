import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Game } from 'phaser';
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'
import Editmap from '../scenes/Editmap'
import Game from "../scenes/Game"

enum GameMode {
  GAME,
  EDIT
}

enum MakingMode {
  CREATE, 
  DELETE
}

// export function getInitialMakingMode() {
//   const 
// }


export const EditSlice = createSlice({
  name : 'edit',
  initialState : {
    EditMode : GameMode.GAME,
    Categori : 0,
    makingMode : MakingMode.CREATE 
  },
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
      state.Categori = action.payload
    },
    // 생성, 삭제에 따른 변경
    // MakingModeChange : (state,action : PayloadAction<number>) => {
    //   state.EditMode = action.payload
    // },
    MakingModeChange : (state,action : PayloadAction<number>) => {
      const mkMode = action.payload === MakingMode.CREATE ? MakingMode.CREATE : MakingMode.DELETE
      state.makingMode = mkMode
      console.log()
      console.log(mkMode,' mkmode')
      const game = phaserGame.scene.keys.Editmap as Editmap
      game.modeChange(mkMode)
      console.log('게임모드는 들어왔습니다')
    }
  }
})

export const {
  EditModeChange,
  CategoriChange,
  MakingModeChange
} = EditSlice.actions

export default EditSlice.reducer