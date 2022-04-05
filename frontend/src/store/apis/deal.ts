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

// 팔로우 API
// 서빈 변경 후  코드만 변경

// 지난 거래내역 조회
export const getPastHistory = async (productId : number) => {
  const response = await apiClient.get<any>(
    `/deals/${productId}`
  )
  return response.data
}

// 경매참가
export const postAuctionBid = async (dealPrice : number, productId:number) => {
  const body = {
    "dealPrice": dealPrice,
    "productId": productId
  }
  const response = await apiClient.post<any>(
    `/deals/auction`,
    body
  )
  return response.data
}

// 경매 입찰(마감구매)
export const postAuctionConfirm = async (productId:number) => {
  const response = await apiClient.post<any>(
  `/deals/buy/auction/${productId}`
  )
  return response.data
}

// 즉시 구매
export const postPurchase = async (productId:number) => {
  const response = await apiClient.post<any>(
    `/deals/buy/now/${productId}`
  )
  return response.data
}

// 경매 등록
export const postRegisterAuction = async (dealPrice: number, productId:number, period:number) => {
  const today = new Date();
  today.setHours(today.getHours() + period * 24)
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const hours = ('0' + today.getHours()).slice(-2); 
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2); 
  const dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;

  const body = {
    "dealPrice": dealPrice,
    "productAuctionEndTime": dateString,
    "productId": productId
  }
  const response = await apiClient.post<any>(
    `/deals/register/auction`,
    body
  )
  return response.data
}

// 경매 취소
export const postCancelAuction = async (productId:number) => {
  const response = await apiClient.post<any>(
    `/deals/auction/cancel/${productId}`
  )
  return response.data
}

// 즉시 구매 등록
export const postRegisterPurchase = async (dealPrice: number, productId:any) => {
  const body = {
    "dealPrice": dealPrice,
    "productId": productId
  }
  const response = await apiClient.post<any>(
    `/deals/register/buyNow`,
    body
  )
  return response.data
}

// 즉시 구매 취소
export const postCancelPurchase = async (productId:number) => {
  const response = await apiClient.post<any>(
    `/deals/buy/cancel/${productId}`
  )
  return response.data
}