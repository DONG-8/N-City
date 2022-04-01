import axios from "axios"
import * as API from "./types" 

const apiClient = axios.create({
  // baseURL: "https://j6e106.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
});


// 로그 api

// 로그인 요청
export const postLogin = async (userAddress : string)=> {
  const response = await apiClient.post<any>(
    '/users/login',
    {
      "userAddress" : userAddress
    }
  ) 
  console.log('로그인진행중')
  return response.data
}

export const getLogout = async () => {
  const response = await apiClient.get<any>(
    '/users/logout',
  ) 
  console.log('로그아웃진행중')
  return response.data
}

