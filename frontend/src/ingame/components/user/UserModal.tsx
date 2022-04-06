import React, { useState, useEffect } from "react";
import styled from "styled-components";

// api 요청
import { useMutation, useQuery } from "react-query";
import { getUsercollectedInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { client } from "../../../../src/index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMusicList } from "../../stores/RoomStore";
const Wrapper = styled.div`
  position: absolute;
  width: 360px;
  height: 460px;
  background-color: white;
  right: 30px;
  border-radius: 10px;
  padding: 20px;
`;

const Head = styled.div`
  width: 100%;
  height: 20%;
  background-color: antiquewhite;
`;

// 뮤직 리스트
const Body = styled.div`
  width: 100%;
  height: 60%;
  background-color: #b9aef1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

// pagenation & 설명?
const Foot = styled.div`
  width: 100%;
  height: 20%;
  background-color: #f5cbd4;
`;

const MusicItem = styled.div`
  width: 100%;
  height: 50px;
  background-color: #e381ba;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
  img {
    width: 45px;
    height: 45px;
    border-radius: 25px;
  }

  audio {
    width: 50%;
    height: 30px;
    margin-left: auto;
  }

  div {
    flex-direction: column;
  }
`;

const MusicModal = () => {
  const [playList, setPlayList] = useState<Array<object>>([]);
  // 임시 userid params 의 데이터를 넘겨주는걸 생각해봐야할듯
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.edit.userId);
  console.log(userId, "유저아이디");
  const tracks = useAppSelector((state) => state.room.roomMusicList);
  const [musicList, setMusic] = useState();
  // 작품 조회
  // productcode === 1 : 음악코드

  console.log(musicList, "뮤직리스트");

  return (
    <Wrapper>
      <Head>Play List</Head>
      <Body></Body>
      <Foot>
        <button>리스트 변경</button>
      </Foot>
    </Wrapper>
  );
};

export default MusicModal;
