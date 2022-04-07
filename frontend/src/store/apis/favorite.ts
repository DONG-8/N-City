import axios from "axios"
import * as API from "./types" 

const apiClient = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
});


// 좋아요 api

// 내가 좋아요 한 여부
export const getProductLike = async (productId : number) => {
  const response =await apiClient.get<any>(
    `/favorites/${productId}`,
  )
  return response.data
}


// 상품 좋아요 추가
export const postProductLike = async (productId : number ) => {
  const response = await apiClient.post<any>(
    `/favorites/${productId}`,
  )
  return response.data
}

// 좋아요 취소
export const delProductLike = async (productId : number ) => {
  const response = await apiClient.delete<any>(
    `/favorites/${productId}`,
  )
  return response.data
}

// 좋아요 수 가져오기
export const getCountProductLike = async (productId : number) => {
  const response = await apiClient.get<API.TypeLike>(
    `/favorites/${productId}/count`
  )
  return response.data
}




