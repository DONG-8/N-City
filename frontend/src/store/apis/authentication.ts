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

// file update 이용 시 사용되는  axios
const fileApiClient = axios.create({
  baseURL: "https://j6e106.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
  headers: {
  'Content-Type': 'multipart/form-data'
},
});


// 인증요청 api

// 인증요청 등록
export const postAuthentiaction = async (formdata: any) => {
  const response = await fileApiClient.post<any>(
    '/authentication', 
    formdata
  )
  return response.data
}

// 인증요청 수락 및 거절
export const patchAutentication = async (authId : number, authType : number, isConfirm: number) => {
  const response = await apiClient.patch<any>(
    `/authentication/confirm`,
    {
      "authId": authId,
      "authType": authType,
      "isConfirm": isConfirm
    }
    )
  return response.data
  }
    
// 인증요청 내역 전체 조회

export const getAllAuthentication = async (authType : number, page?:number,size?:number) => {
  const response = await apiClient.get<API.TypeAutGetAll>(
    // 이거 에러나면 params 지워주고 데이터만 다 받아오는걸로 변경
    `/authentication/${authType}?page=1&size=1000`,
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

// 파일 다운로드
export const getAuthFileDownload = async (file : string) => {
  const body = {
    "authUrl": file
  }
  const response = await apiClient.get<any>(
    `/authentication/download/file`,
    {data : body}
  )
  return response.data
}

// 토큰 재신청
export const putAuthApplyToken = async (userId: number) => {
  const response = await apiClient.put<any>(
    `/users/token/request/${userId}`,
  )
  return response.data
}

// 신규유저 or 재신청유저 받아오기
export const getAuthNewUsers = async (userRole: string) => {
  const response = await apiClient.get<any>(
    `/authentication/user/${userRole}?size=1000`,
  )
  return response.data
}

// 신규유저 토큰 지급
export const putAuthSendToken = async (userId:number) => {
  const response = await apiClient.put<any>(
    `/authentication/token/${userId}`,
  )
  return response.data
}