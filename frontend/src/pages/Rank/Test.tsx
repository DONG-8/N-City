import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getProductAll,
  getRoomTop5,
  postAuthetication,
  postLogin,
  postProductLike,
  getProductLike,
  getProductDetail,
  getUserInfo,
  getUserTradeInfo,
  getUsercollectedInfo,
  getUsercreatedInfo,
  getUserfavoritesInfo,
  getUserduplicateInfo,
} from "../../store/apis/Main";

import { postRoomJoin } from "../../store/apis/myRoom";
import { useAppSelector, useAppDispatch } from "../../ingame/hooks";
import { UserMapInfo } from "../../ingame/stores/EditStore";

import * as API from "../../store/apis/types";

const Test = () => {
  const userId = useAppSelector((state) => state.edit.userId);
  const dispatch = useAppDispatch();
  console.log(userId);

  const {
    data,
    isLoading,
    mutate: RoomInfo,
  } = useMutation<any, Error>(
    "postRoomInfo",
    async () => {
      return await postRoomJoin(1);
    },
    {
      onSuccess: (res) => {
        // console.log(res, "성공해쪄염");
        console.log(res.myRoomBackground, "백그라운드 데이터");
        dispatch(UserMapInfo(res.myRoomBackground));
      },
      onError: (err: any) => {},
    }
  );

  const GameStart = () => {
    RoomInfo();
  };

  return (
    <>
      {/* <button onClick={postData}> 버튼</button> */}
      {/* <button onClick={loginAccess}>로그인요청</button> */}
      <button onClick={() => GameStart}>게임스타토</button>
      <div>하이하이</div>
    </>
  );
};

export default Test;

// useEffect(() => {
//   if (isLoading) {
//     console.log("로딩중");
//   }
// }, [isLoading]);

// //// 상품 정보 모두 가져오기
// // const { isLoading, data } = useQuery<API.TypeProductGetAll, Error>(
// //   "query-prouductAll",
// //   async () => {
// //     return await getProductAll({ page: 1, size: 3 });
// //   },
// //   {
// //     enabled: true,
// //     onSuccess: (res) => {
// //       setGetResult(fortmatResponse(res));
// //     },
// //     onError: (err: any) => {
// //       setGetResult(fortmatResponse(err.response?.data || err));
// //     },
// //   }
// // );

// ///// 아직 에러
// // const {
// //   isLoading,
// //   data,
// //   mutate: postTutorial,
// // } = useMutation<any, Error>(
// //   "query-AutPost",
// //   async () => {
// //     return await postAuthetication({
// //       name: "동준",
// //       body: {
// //         authEmail: "qkrehdwns96@naver.com",
// //         authName: "동준",
// //         authRegAt: "dfe",
// //         authType: 3,
// //         authUrl: "xxx",
// //       },
// //       authFile: "./essets/",
// //     });
// //   },
// //   {
// //     onSuccess: (res) => {
// //       const result = fortmatResponse(res);
// //       console.log(result);
// //     },
// //     onError: (err: any) => {
// //       console.log(err, "요청 실패");
// //     },
// //   }
// // );

// //////---- 버튼 클릭 시 요청을 보내기 위한 함수
// // function postData() {
// //   try {
// //     postTutorial();
// //   } catch (err) {
// //     setPostResult(fortmatResponse(err));
// //   }
// // }

// function loginAccess() {
//   try {
//     Login();
//   } catch (err) {
//     setPostResult(fortmatResponse(err));
//   }
// }

// const {
//   isLoading,
//   data,
//   mutate: Login,
// } = useMutation<any, Error>(
//   "query-Login",
//   async () => {
//     return await postLogin("0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A");
//   },
//   {
//     onSuccess: (res) => {
//       const result = fortmatResponse(res);
//       console.log(result, "로그인 성공");
//       sessionStorage.setItem("userToken", res.accessToken);
//     },
//     onError: (err: any) => {
//       console.log(err, "로그인 요청 실패");
//     },
//   }
// );

// // const {
// //   isLoading: PostLoginLoading,
// //   data: PostLoginData,
// //   mutate: postTutorial,
// // } = useMutation<any, Error>(
// //   "productLike",
// //   async () => {
// //     return await postProductLike(9);
// //   },
// //   {
// //     onSuccess: (res) => {
// //       const result = fortmatResponse(res);
// //       console.log(result, "좋아요 결과");
// //       // 여기서 이 result로 하고싶은 추가 작업을 실행시켜준다.
// //     },
// //     onError: (err: any) => {
// //       console.log(err, "요청 실패");
// //     },
// //   }
// // );

// // 방 탑 5 조회
// const { isLoading: TopRoomLoading, data: TopRoomData } = useQuery<any, Error>(
//   "getTop5",
//   async () => {
//     return await getRoomTop5();
//   },
//   {
//     onSuccess: (res) => {
//       fortmatResponse(res);
//       console.log(res, "top5 방정보 조회");
//     },
//     onError: (err: any) => {
//       setGetResult(fortmatResponse(err.response?.data || err));
//     },
//   }
// );

// // const { isLoading: getLikeLoading, data: getLikeData } = useQuery<any, Error>(
// //   "getLike",
// //   async () => {
// //     return await getProductLike(9);
// //   },
// //   {
// //     onSuccess: (res) => {
// //       fortmatResponse(res);
// //       console.log(res, "좋아요 한 상품 조회");
// //     },
// //     onError: (err: any) => {
// //       console.log(err, "좋아요한작품불러오기에러");
// //     },
// //   }
// // );

// const { isLoading: getDetailLoading, data: getDetailData } = useQuery<
//   any,
//   Error
// >(
//   "ProductDetail",
//   async () => {
//     return await getProductDetail(9);
//   },
//   {
//     onSuccess: (res) => {
//       fortmatResponse(res);
//       console.log(res, "좋아요 한 상품 조회");
//     },
//     onError: (err: any) => {
//       console.log(err, "좋아요한작품불러오기에러");
//     },
//   }
// );

// const { isLoading: getUserInfoLoading, data: getUserInfoData } = useQuery<
//   any,
//   Error
// >(
//   "getUserInfo",
//   async () => {
//     return await getUserInfo(1);
//   },
//   {
//     onSuccess: (res) => {
//       fortmatResponse(res);
//     },
//     onError: (err: any) => {},
//   }
// );

// const { isLoading: getUserTradeInfoLoading, data: getUserTradeInfoData } =
//   useQuery<any, Error>(
//     "getUserTradeInfo",
//     async () => {
//       return await getUserTradeInfo(1);
//     },
//     {
//       onSuccess: (res) => {
//         fortmatResponse(res);
//       },
//       onError: (err: any) => {},
//     }
//   );

// const {
//   isLoading: getUsercollectedInfoLoading,
//   data: getUsercollectedInfoData,
// } = useQuery<any, Error>(
//   "getUserTradeInfo",
//   async () => {
//     return await getUsercollectedInfo(1);
//   },
//   {
//     onSuccess: (res) => {
//       fortmatResponse(res);
//       console.log(res);
//     },
//     onError: (err: any) => {},
//   }
// );

// //상품 정보 모두 가져오기
// const { isLoading, data } = useQuery<API.TypeProductGetAll, Error>(
//   "query-prouductAll",
//   async () => {
//     return await getProductAll({ page: 1, size: 3 });
//   },
//   {
//     enabled: true,
//     onSuccess: (res) => {
//       setGetResult(fortmatResponse(res));
//       console.log(res, "모든상품정보");
//     },
//     onError: (err: any) => {
//       setGetResult(fortmatResponse(err.response?.data || err));
//     },
//   }
// );

//---------------------------원본

//   const [getResult, setGetResult] = useState<string | null>(null);
//   const [postResult, setPostResult] = useState<string | null>(null);
//   const fortmatResponse = (res: any) => {
//     return JSON.stringify(res, null, 2);
//   };

//   // 요청 성공 시 다른 api 요청 보내기 test
//   const PrLike = useMutation<any, Error>(
//     "productLike",
//     async () => {
//       return await postProductLike(9);
//     },
//     {
//       onSuccess: (res) => {
//         const result = fortmatResponse(res);
//         console.log(result, "좋아요 결과");
//         // 여기서 이 result로 하고싶은 추가 작업을 실행시켜준다.
//       },
//       onError: (err: any) => {
//         console.log(err, "요청 실패");
//       },
//     }
//   );

//   const {
//     isLoading,
//     data,
//     mutate: Login,
//   } = useMutation<any, Error>(
//     "query-Login",
//     async () => {
//       return await postLogin("0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A");
//     },
//     {
//       onSuccess: (res) => {
//         const result = fortmatResponse(res);
//         console.log(result, "로그인 성공");
//         // sessionStorage.setItem("userToken", res.accessToken);
//       },
//       onError: (err: any) => {
//         console.log(err, "로그인 요청 실패");
//       },
//     }
//   );

//   const { isLoading: getLikeLoading, data: getLikeData } = useQuery<any, Error>(
//     "getLike",
//     async () => {
//       return await getProductLike(9);
//     },
//     {
//       onSuccess: (res) => {
//         fortmatResponse(res);
//         console.log(res, "좋아요 한 상품 조회");
//         console.log("조회 이후 좋아요 요청 시작");
//         PrLike.mutate();
//         console.log();
//       },
//       onError: (err: any) => {
//         console.log(err, "좋아요한작품불러오기에러");
//         console.log("조회 이후 좋아요 요청 시작");
//         PrLike.mutate();
//       },
//     }
//   );

//   function loginAccess() {
//     try {
//       Login();
//     } catch (err) {
//       setPostResult(fortmatResponse(err));
//     }
//   }

//   function postData() {
//     try {
//       // postTutorial();
//     } catch (err) {
//       setPostResult(fortmatResponse(err));
//       console.log("에러에러에러에러에러ㅔㅓ");
//     }
//   }
