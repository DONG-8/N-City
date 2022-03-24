import axios from "axios"
import * as API from "./types" 

const apiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

// 팔로우 API
// 서빈 변경 후  코드만 변경

// 팔로우 요청
export const postFollow = async (follow : number) => {
  const response = await apiClient.post<any>(
    `follow/${follow}`
  )
  return response.data
}

// 팔로우 취소
export const deleteFollow = async (follow : number) => {
  const response = await apiClient.delete<any>(
    `follow/${follow}`
  )
  return response.data
}

// 팔로워 조회
export const getFollowee = async () => {
  const response = await apiClient.get<API.TypeFollowGetLookup>(
  `follow/followee`
  )
  return response.data
}

// 팔로우 조회
export const getFollower = async () => {
  const response = await apiClient.get<API.TypeFollowGetLookup>(
  `follow/follower`
  )
  return response.data
}


