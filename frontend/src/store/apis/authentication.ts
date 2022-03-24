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

// file update 이용 시 사용되는  axios
const fileApiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
  'Content-Type': 'multipart/form-data'
},
});


// 인증요청 api

// 인증요청 등록
export const postAuthentiaction = async (formdata: any) => {
  const response = await fileApiClient.post<any>(
    '/authentication', {
      formdata
    },
  )
  console.log("인증요청 등록")
  return response.data
}

// 인증요청 수락 및 거절
export const patchAutentication = async (authId : number, authType : number) => {
  const response = await apiClient.patch<any>(
    `/authentication/${authId}/detail`,
    {
      authId,authType
    }
    )
  return response.data
  }
    
// 인증요청 내역 전체 조회

export const getAllAuthentication = async (authType : number, page?:number,size?:number) => {
  const response = await apiClient.get<API.TypeAutGetAll>(
    // 이거 에러나면 params 지워주고 데이터만 다 받아오는걸로 변경
    `/authentication/${authType}?page=${page}&size=${size}`,
  )
  return response.data
}

// 인증요청 내역 상세 조회
export const getDetailAuthentication = async (authId : number) => {
  const response = await apiClient.get<API.TypeAutGetDetail>(
    `/authentication/${authId}`
  )
  return response.data
}