import axios from "axios"
import * as API from "./types" 

const apiClient = axios.create({
  baseURL: "https://j6e106.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
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
  return response.data
}

export const getLogout = async () => {
  const response = await apiClient.get<any>(
    '/users/logout',
  ) 
  return response.data
}

