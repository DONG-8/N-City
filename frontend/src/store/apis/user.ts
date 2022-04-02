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
const fileApiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  // baseURL: "https://j6e106.p.ssafy.io/api",
  baseURL: "http://localhost:8080/api",
  headers: {
  'Content-Type': 'multipart/form-data'
  },
});
export const getUserAll= async () => {
  const response = await apiClient.get<any>(
    `/users/all`
  )
  return response.data
}
// 유저 정보 조회
export const getUserInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}`
  )
  return response.data
}

// 해당 유저의 거래내역 조회
export const getUserTradeInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/activities?size=30`
  )
  return response.data
}

// 유저가 가진 작품 조회
export const getUsercollectedInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/collected?size=50`
  )
  return response.data
}

// 유저가 생성한 작품 조회
export const getUsercreatedInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/created?size=50`
  )
  return response.data
}

// 유저가 좋아요 한 작품 조회
export const getUserfavoritesInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/favorites?size=50`
  )
  return response.data
}

// 닉네임 중복 체크
export const getUserduplicateInfo = async (userNick : string ) => {
  const response = await apiClient.get<any>(
    `/users/${userNick}/duplicate`
  )
  return response.data
}

// 해당 유저의 회원정보 변경

//{
//   "userDescription": "string",
//   "userEmail": "string",
//   "userId": 0,
//   "userImgUrl": "string",
//   "userNick": "string"
// } -- 이와같은 key value의 formdata를 생성시켜준다.

export const patchUserInfoChange = async(formdata : any) => {
  const response = await fileApiClient.patch<any>(
    `users/change-info`
  )
  return response.data
}

// 이메일 인증 요청하기
export const postConfirmEmail = async (emailAuthEmail : string) => {
  // userid는 자동으로 들어갈 것 같아서 빼놓음
  const response = await apiClient.post<any>(
    `users/confirm`, {
      emailAuthEmail
    }
  )
  return response.data
}

// 이메일 인증 수락
export const getComfirmEmail = async (email: string, authToken : string) => {
  const response = await apiClient.get<any>(
  `users/confirm-email`
  )
  return response.data
}

// 유저 닉네임으로 검색
export const getSearchUserNick = async (userNick : string) => {
  const response = await apiClient.get<any>(
    `users/search/${userNick}`
  )
  return response.data
}