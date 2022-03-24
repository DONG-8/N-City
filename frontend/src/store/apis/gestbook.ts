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

// 방명록 api

// 방명록 수정
export const putGuestBook = async (guestbookContents : string, guestbookId: number) => {
  const response = await apiClient.put<any>(
    `guestbooks`,
    {
      guestbookContents,
      guestbookId
    }
  )
  return response.data
}

// 방명록 작성
export const postGuestBook = async (guestbookContents : string, guestbookId: number,guestbookWiterId:number) => {
  const response = await apiClient.post<any>(
    `guestbooks`,
    {
      guestbookContents,
      guestbookId,
      guestbookWiterId
    }
  )
  return response.data
}

// 방명록 삭제

export const delGuestBook = async (guestbookId: number) => {
  const response = await apiClient.delete<any>(
    `guestbooks/${guestbookId}`,
  )
  return response.data
}

// 방명록 조회 
export const getGuestBook = async (getGuestBookOwnerId : number) => {
  const response = await apiClient.get<any>(
    `guestbooks/get-${getGuestBookOwnerId}`,
  )
  return response.data
}

