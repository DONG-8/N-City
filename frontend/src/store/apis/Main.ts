import axios from "axios"

// API 로 모든 타입들을 들고온다.
import * as API from "./types" 


// axios 요청 baseinstance 생성
const apiClient = axios.create({
  baseURL: "https://j6e106.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
});

// const BASE_URL = `j6e106.p.ssafy.io:8443`;
// const BASE_URL = `localhost:8080`;

export const getProductAll =async ({page,size}:API.TypeProductGetAll) => {
  const response = await apiClient.get<API.TypeProductGetAll>(
    '/products', 
    {"params" :{page,size}}
  );
  return response.data
}

export const getProductDetail = async (productId : number) => {
  const response = await apiClient.get<any>(
    `/products/detail/${productId}`
  )
  return response.data
}

export const postAuthetication = async ( {authFile,body}: API.TypeAutPost, name ?: API.TypeAutPost ) => {
  const response = await apiClient.post<any>(
    '/authentication',
    {
      name,authFile,body
    }
  )
  console.log('post 요청중')
  return response.data
}

export const postLogin = async (userAddress : string)=> {
  const response = await apiClient.post<any>(
    '/users/login',
    {
      userAddress
    }
  )
  console.log('로그인진행중')
  return response.data
}


// 상품 좋아요 추가 --> 보류 : 로그인
export const postProductLike = async (productId : number ) => {
  const response = await apiClient.post<any>(
    `/favorites/${productId}`,
    {
      productId
    }
  )
  console.log('상품 좋아요 추가 진행중')
  return response.data
}

// 방문수가 높은 방 5개 반환
export const getRoomTop5 = async ()  => {
  const response  = await apiClient.get<any>(
    '/myroom'
  )
  return response.data
}

// 보류 : 로그인
export const getProductLike = async (productId : number) => {
  // const accessToken = sessionStorage.getItem("userToken")
  //{ headers: {Authorization: `Bearer ${accessToken}`}}
  // const accessToken = sessionStorage.getItem("userToken")
  const response =await apiClient.get<any>(
    `/favorites/${productId}`
  )

  console.log('여기와쪄염')
  return response.data
}

export const getUserInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}`
  )
  return response.data
}

export const getUserTradeInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/activities`
  )
  return response.data
}


export const getUsercollectedInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/collected`
  )
  return response.data
}

export const getUsercreatedInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/created`
  )
  return response.data
}

export const getUserfavoritesInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/favorites`
  )
  return response.data
}


export const getUserduplicateInfo = async (userId : number ) => {
  const response = await apiClient.get<any>(
    `/users/${userId}/duplicate`
  )
  return response.data
}




