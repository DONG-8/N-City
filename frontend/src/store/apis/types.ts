//--- 권한요청 api 별 필요 type

// 권한요청 POST
export interface TypeAutPost {
  name: string;
  body : {
    authEmail: string,
    authName: string,
    authRegAt: string,
    authType: number,
    authUrl: string
  };
  authFile : any;
}

// 인증요청 전체 내역 조회
export interface TypeAutGetAll {
  size ?: number;
  page ?: number;
  authType : number;
}

export interface TypeAutGetDetail {
  authId : number;
}

//---- 팔로우 컨트롤 api type

export interface TypeFollowPostDelApply {
  followFollowee : number;
  followName : string;
}

// 팔로워 팔로이 조회를 위한 타입
export interface TypeFollowGetLookup {
  name: string;
}

// -- 로그인 로그아웃 (log-controller)

export interface TypeLoginPost {
  userAddress : object;
  // 예시
  // {
  //   "userAddress": "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A"
  // }
}
// 로그아웃은 따로 파람스안필요함 요청만 보내기

// -------- Room 관련 API
export interface TypeRoomJoinPost {
  userId : number;
}


// ------ 상품 관련 CRUD (product-controller)

// export  interface TypeProductGetAll {
//   param : {
//     page : number; // 페이지 수
//     size : number; // 페이지당 게시글 수
//     }
// }
export interface TypeProductGetAll {
    page : number; // 페이지 수
    size : number; // 페이지당 게시글 수
}

export interface TypeProductPutInfo {
  productModify: {
    productCode: number,
    productDesc: string,
    productId: number,
    productState: number,
    productTitle: string,
    productView: boolean,
    productXCoordinate: number,
    productYCoordinate: number
  }
}

export interface TypeProductDelete {
  productId : number;
}

export interface TypeProductGetDetail {
  productId : number;
}


// --- 유저가 가진 정보 및 작품 좋아요 등 유저관련기능
// --- user-controller

// 유저 정보 조회, 거래내역, 작품, 생성작품,
// 좋아요 작품 조회에 쓰이는 타입
export interface TypeGetUserInfo {
  userId : number;
  integer?: number;
  size ?: number;
}

export interface TypeGetUserNick {
  userNick : string;
}

export interface TypeChangeUserInfoPatch {
  body: object
}


// request body --> 바디 속성에 들어가야하는 데이터
export interface TypeUserEmailChangePost {
  body : {
    emailAuthEmail: string,
    userId: number
  }
}

export interface TypeUserEmailGet {
  email : string;
  authToken : string;
}


