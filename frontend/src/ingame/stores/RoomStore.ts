import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoomAvailable } from 'colyseus.js'

export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'skyoffice',
  CUSTOM = 'custom',
}

interface RoomInterface extends RoomAvailable {
  name?: string
}

interface RoomMusicInterface {
  title: string,
  artist: string,
  audioSrc: string,
  image:  string,
  color: string
}

const isCustomRoom = (room: RoomInterface) => { // room 이름이 만든 방인지 아닌지 알수있는 함수
  return room.name === RoomType.CUSTOM
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    lobbyJoined: false, 
    roomJoined: false,
    roomId: '',
    roomName: '',
    roomDescription: '',
    availableRooms: new Array<RoomAvailable>(),
    roomMusicList : new Array<RoomMusicInterface>()
  },
  reducers: {
    setLobbyJoined: (state, action: PayloadAction<boolean>) => { //payloadAction => 들어온 값을 사용할 수 있는 함수 
      state.lobbyJoined = action.payload  // 로비에 들어왔는지 정하는 함수
    },
    setRoomJoined: (state, action: PayloadAction<boolean>) => {
      state.roomJoined = action.payload // 방에 들어왔는지 정하는 함수
    },
    setJoinedRoomData: (state,action: PayloadAction<{ id: string; name: string; description: string }>) => {
      // id 와 이름 , 설명이 들어오면 방설정 바꾸기 
      state.roomId = action.payload.id
      state.roomName = action.payload.name
      state.roomDescription = action.payload.description
    },
    setAvailableRooms: (state, action: PayloadAction<RoomAvailable[]>) => {
      // 모든 방을 filter 써서 isCustomRoom만 보여주기
      // state.availableRooms = action.payload.filter((room) => isCustomRoom(room))
    },
    addAvailableRooms: (state, action: PayloadAction<{ roomId: string; room: RoomAvailable }>) => {
      // if (!isCustomRoom(action.payload.room)) return // 들어온 값이 직접 만든방이 아니라면 추가해주지 않고
      // const roomIndex = state.availableRooms.findIndex(  // 직접 만든 방일 경우 => 
      //   (room) => room.roomId === action.payload.roomId // 들어온 방의 번호와 같은 방의 값을 찾아준다 
      // )
      // if (roomIndex !== -1) {  // 그 번호가 있다면 ?  => 그 번호의 방을 새걸로 바꿔준다 
      //   state.availableRooms[roomIndex] = action.payload.room
      // } else {  // findIndex 가 없다면 -1 을 return 한다 => 방번호가 없는 번호라면 추가해준다.
        state.availableRooms.push(action.payload.room)
      // }
    },
    removeAvailableRooms: (state, action: PayloadAction<string>) => { // 방 삭제하기
      state.availableRooms = state.availableRooms.filter((room) => room.roomId !== action.payload)
    },
    setMusicList : (state, action :PayloadAction<Array<RoomMusicInterface>>) => {
      state.roomMusicList = action.payload
      console.log(state.roomMusicList,'스토어에 넘어온 뮤직리스트')
    }
  },
})

export const {
  setLobbyJoined,
  setRoomJoined,
  setJoinedRoomData,
  setAvailableRooms,
  addAvailableRooms,
  removeAvailableRooms,
  setMusicList
} = roomSlice.actions

export default roomSlice.reducer
