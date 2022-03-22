import axios from "axios"

// API 로 모든 타입들을 들고온다.
import * as API from "./types" 


export default interface UserAddress {
  userAddress : string
}

// axios 요청 baseinstance 생성
const apiClient = axios.create({
  baseURL: "http://localhost:8443/api",
  headers: {
    "Content-type": "application/json",
  },
});

// const BASE_URL = `j6e106.p.ssafy.io:8443`;
// const BASE_URL = `localhost:8080`;

export const getProductAll =async (param : API.TypeProductGetAll) => {
  const response = await apiClient.get<API.TypeProductGetAll>('/products', {'params': param});
  return response.data
}


