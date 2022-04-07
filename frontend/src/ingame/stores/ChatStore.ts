import { createSlice, PayloadAction } from '@reduxjs/toolkit' // 툴킷 사용하기
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { Schema } from '@colyseus/schema'

export interface IChatMessage extends Schema { // 타입설정해주기
  author: string
  createdAt: number
  content: string
}

export enum MessageType { // enum : 그냥 열거형이라는 뜻
  PLAYER_JOINED,
  PLAYER_LEFT,
  REGULAR_MESSAGE,
}

export const chatSlice = createSlice({ // 본격적 store 만들기 
  name: 'chat', 
  initialState: { // state 초기값
    chatMessages: new Array<{ messageType: MessageType; chatMessage: IChatMessage }>(),
    focused: false,
    showChat: false,
  },
  reducers: { // 함수들 
    pushChatMessage: (state, action: PayloadAction<IChatMessage>) => { // 새 메세지 추가
      state.chatMessages.push({
        messageType: MessageType.REGULAR_MESSAGE,
        chatMessage: action.payload,
      })
    },
    pushPlayerJoinedMessage: (state, action: PayloadAction<string>) => { // 들어왔다
      state.chatMessages.push({
        messageType: MessageType.PLAYER_JOINED,
        chatMessage: {
          createdAt: new Date().getTime(),
          author: action.payload,
          content: '님이 들어왔습니다.',
        } as IChatMessage,
      })
    },
    pushPlayerLeftMessage: (state, action: PayloadAction<string>) => { // 나갔다.
      state.chatMessages.push({
        messageType: MessageType.PLAYER_LEFT,
        chatMessage: {
          createdAt: new Date().getTime(),
          author: action.payload,
          content: '님이 떠났습니다.',
        } as IChatMessage,
      })
    },
    setFocused: (state, action: PayloadAction<boolean>) => { // 인풋창 클릭? 
      const game = phaserGame.scene.keys.game as Game
      action.payload ? game.disableKeys() : game.enableKeys()
      state.focused = action.payload
    },
    setShowChat: (state, action: PayloadAction<boolean>) => { // 채팅열기
      state.showChat = action.payload
    },
  },
})

export const {  // actions로 내보내기
  pushChatMessage,
  pushPlayerJoinedMessage,
  pushPlayerLeftMessage,
  setFocused,
  setShowChat,
} = chatSlice.actions

export default chatSlice.reducer 
