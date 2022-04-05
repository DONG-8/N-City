import axios from "axios"
import * as API from "./types" 

const apiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
});

// 방문수가 높은 방 5개 반환
export const getRoomTop5 = async ()  => {
  const response  = await apiClient.get<any>(
    '/myroom'
  )
  return response.data
}

// 해당 유저의 방 입장
// 해당 방 유저의 id
export const postRoomJoin = async (roomUserId : number)  => {
  const response  = await apiClient.post<any>(
    `/myroom/${roomUserId}`
  )
  return response.data
}

// 유저 방 배경 변경 요청
// 이거 배경 파일이 json이면 변경될 수 있음
export const putBackGroundChange = async (myRoomBackGround : string) => {
  const response = await apiClient.put<any>(
    `/myroom/background`, {
      myRoomBackGround
    }
  )
  return response.data
}

// 캐릭터 변경
export const putCharacterChange = async (myRoomCharacter : string) => {
  const response = await apiClient.put<any>(
    `/myroom/character`,{
      myRoomCharacter
    }
  )
  return response.data
}

// 랜던 유저 방 입장

export const postRandomJoin = async ()=> {
  const response = await apiClient.post<any>(
    `/myroom/random`
  )
}

export const getCharacter= async (userId:number)=> {
  const response = await apiClient.get<any>(
    `/myroom/${userId}`
  )
  return response.data
}