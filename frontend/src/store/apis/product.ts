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
  baseURL: "http://localhost:8080/api",
  // baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
  'Content-Type': 'multipart/form-data'
  },
});

// 전체 조회 --> 변수 필요없을 수 있음 변경가능
export const getProductAll =async ({page,size}:API.TypeProductGetAll) => {
  const response = await apiClient.get<API.TypeProductGetAll>(
    '/products/all', 
    {"params" :{page,size}}
  );
  return response.data
}



// 상품등록
export const postProduct = async (formdata : any) => {
  const response = await fileApiClient.post<any>(
    `/products`, 
    formdata
  )
  console.log("상품등록")
  return response.data
}

// 상품정보업데이트
export const putTokenID = async (data : any) => {
  const response = await apiClient.put<any>(
    `/products/token`,
    data
  )
  console.log("상품정보업데이트")
  return response.data
}


// 카테고리별 조회
export const getProductCategori = async (productCode : number) => {
  const response = await fileApiClient.post<any>(
    `/products/${productCode}`, 
  )
  return response.data
}
export const getliketop10 = async () => {
  const response = await fileApiClient.get<any>(
    `/products/rank`, 
  )
  return response.data
}
// 상품삭제 --> 이거 상품 삭제를 못하지않나? 페이지 등록 삭제라고하는게 더 맞지않을까
export const deleteProduct = async (productId : number) => {
  const response = await fileApiClient.delete<any>(
    `/products/${productId}`, 
  )
  return response.data
}

// 상품판매 전체 조회
export const getSellProduct = async () => {
  const response = await apiClient.get<any>(
    `/products/deal?size=1000`
  )
  return response.data
}

// 카테고리별 판매중인 상품 조회
export const getSellProductCategori = async (productCode : number) => {
  const response = await apiClient.get<any>(
    `/products/deal/${productCode}`
  )
  return response.data
}


// 상세정보 조회
export const getProductDetail = async (productId : number) => {
  const response = await apiClient.get<any>(
    `/products/detail/${productId}`
  )
  return response.data
}

// 상품이름으로 검색
export const getProductSearch = async (productTitle : string) => {
  const response = await apiClient.get<any>(
    `/products/search/${productTitle}`
  )
  return response.data
}

