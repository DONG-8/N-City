import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
// api 요청
import { useMutation, useQuery } from "react-query";
import { getUsercollectedInfo } from "../../../store/apis/user"; //  유저정보 가져오기
import { client } from "../../../index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMusicList } from "../../stores/RoomStore";

const Wrapper = styled.div`
  position: absolute;
  width: 340px;
  height: 460px;
  background-color: #e4e4e4d7;
  /* background-color: #656565a5; */
  right: 30px;
  border-radius: 10px;
  padding: 10px;
`;
 
const Head = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: center;
  .name{
    /* color:white; */
    margin-top: 20px;
    font-size: 30px;
  }
`;

// 뮤직 리스트
const Body = styled.div`
  .subtitle{
    font-size: 13px;
    padding-bottom:10px;
    /* border-bottom: 0.5px solid white; */
    border-bottom: 0.5px solid #333;
    /* color: white; */
    margin-bottom: 20px;
  }
  margin: auto;
  width: 90%;
  height: 60%;
  /* background-color: #6b6a72; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

// pagenation & 설명?
const Foot = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: #f5cbd4; */
`;

const UserItem = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: #e381ba; */
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
  margin-top: 2px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 25px;
  }
  .subTitle{
    width: 190px ; 
    /* color: white; */
    font-weight: 400;
    margin-left: 10px;
  }
  .buyBtn{
    color: #6262f1 ;
    :hover{
      color: #3838e9 ;

    }
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

const UsersModal = () => {
  const [playList, setPlayList] = useState<Array<object>>([]);
  // 임시 userid params 의 데이터를 넘겨주는걸 생각해봐야할듯
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.edit.userId);
  console.log(userId, "유저아이디");
  const tracks = useAppSelector((state) => state.room.roomMusicList);
  const [userList, setUser] = useState();
  // 작품 조회
  // productcode === 1 : 음악코드

  const {
    data: Alldata,
    isLoading: AllLoading,
    refetch: ALL,
  } = useQuery<any>(
    "ALLNFT",
    async () => {
      const size = 1000;
      return await getUsercollectedInfo(userId, size);
    },
    {
      onSuccess: (res) => {
        // 성공하면 db에 뮤직 string List를 만들어서 넘겨준다.
        let arr;
        console.log(res, "앱창에서 불러온 정보");
        const UserArray = res.content.map((obj, i) => {
          if (obj.productCode === 1) {
            return {
              title: obj.productTitle,
              artist: obj.productDesc,
              audioSrc: obj.productFileUrl,
              image: obj.productThumbnailUrl,
              color: "#6225E6",
            };
          } else {
            return null;
          }
        });
        const result = UserArray.filter((obj, i) => obj !== null);
        console.log(result, "새 결과");
        dispatch(setMusicList(result));
        setUser(result);
      },
    }
  );

  console.log(userList, "뮤직리스트");

  return (
    <Wrapper>
      <Head><div className="name">Tracks</div></Head>
      <Body>
        <div className="subtitle">All Tracks</div>
        {Alldata &&
          Alldata.content.map((obj, i) => {
            if (obj.productCode === 1) {
              console.log('🎶',obj)
              return (
                <UserItem>
                  <img src={obj.productThumbnailUrl} alt="사진없노~" />
                  <div className="subTitle">{obj.productTitle}</div>
                  {/* <audio controls src={obj.productFileUrl}></audio> */}
                  {(obj.productState===1 || obj.productState===2 )&& (userId!==obj.productUserId)&& // 내가 이 작품의 주인이 아닐경우,
                  <button className="buyBtn">구매하기</button>}
                </UserItem>
              );
            }
          })}
      </Body>
      <Foot>
        <button>리스트 변경</button>
      </Foot>
    </Wrapper>
  );
};

export default UsersModal;
