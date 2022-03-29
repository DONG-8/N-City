import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from 'phaser';
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

enum GameMode {
  GAME,
  EDIT
}

export const EditSlice = createSlice({
  name : 'edit',
  initialState : {
    EditMode : GameMode.GAME,
    Categori : 0,
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
    }
  }
})

export const {
  EditModeChange,
  CategoriChange
} = EditSlice.actions

export default EditSlice.reducer