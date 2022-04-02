import React, { useEffect, useState } from "react";
import styled from "styled-components";
// x 아이콘 넣기
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// api 요청
import { useMutation, useQuery } from "react-query";
import { getUserInfo } from "../../../src/store/apis/user"; //  유저정보 가져오기
import { postRoomJoin } from "../../store/apis/myRoom";
import { getGuestBook } from "../../../src/store/apis/gestbook";
// 스토어 state, dispatch
import { useAppSelector, useAppDispatch } from "../hooks";

// 방명록 개별 콘텐츠
import Visitbook from "./Visitbook";

const Wrapper = styled.div`
  width: 100%;
`;

const ColorBar = styled.div`
  margin: auto;
  margin-top: 0;
  width: 100%;
  height: 200px;
  div {
    margin: auto;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const Head = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  background-color: red;
`;

const Body = styled.div`
  width: 100%;
  height: 520px;
  color: black;
  background-color: yellow;
`;

const InputLine = styled.div`
  width: 100%;
  height: 80px;
  background-color: green;
  position: relative;
  bottom: 10px;
`;

const VisitModal = () => {
  // 스토어에서 받아온 유저정보
  const userId = useAppSelector((state) => state.edit.userId);
  const dispatch = useAppDispatch();

  // 파라미터에서 userid를 받아온다
  // 현재는 임시 데이터이다.
  const { data: userInfo, isLoading: userInfoLoading } = useQuery<any>(
    "userInfo",
    async () => {
      return await getUserInfo(userId);
    }
  );
  const {
    data: Room,
    isLoading: RoomInfoLoading,
    mutate: RoomInfo,
  } = useMutation<any, Error>("postRoomInfo", async () => {
    return await postRoomJoin(userId);
  });

  const { data: guestbookdata, isLoading: guestbookLoaing } = useQuery<any>(
    "guestbook",
    async () => {
      return await getGuestBook(userId);
    }
  );

  useEffect(() => {
    // 컴포넌트 생성 시 방의 정보를 불러온다
    RoomInfo();
  }, []);

  if (userInfoLoading === true) {
    return <div>로딩중</div>;
  }
  console.log(guestbookdata.content);

  return (
    <Wrapper>
      <ColorBar>
        <Head>
          <img src={userInfo.userImgUrl} alt="사진없노" />
          <div>방 주인장 : {userInfo.userNick}</div>
          <div>팔로워 수 : {userInfo.followerCnt}</div>
          <div>팔로잉 수 : {userInfo.followeeCnt}</div>
        </Head>
      </ColorBar>
      <Body>
        {guestbookdata.content.map((obj, i) => {
          return <Visitbook key={i} book={obj}></Visitbook>;
        })}
      </Body>
      <InputLine></InputLine>
    </Wrapper>
  );
};

export default VisitModal;
