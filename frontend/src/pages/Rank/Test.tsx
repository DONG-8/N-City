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
import { useNavigate } from "react-router-dom";

const Test = () => {
  const userId = useAppSelector((state) => state.edit.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        // dispatch(UserMapInfo(res.myRoomBackground));
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
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