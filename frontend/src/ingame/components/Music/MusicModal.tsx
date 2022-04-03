import React from "react";
import styled from "styled-components";

// api 요청
import { useMutation, useQuery } from "react-query";
import { getUsercollectedInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { client } from "../../../../src/index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";

const Wrapper = styled.div`
  position: absolute;
  width: 360px;
  height: 460px;
  background-color: white;
  left: 200px;
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
`;

// pagenation & 설명?
const Foot = styled.div`
  width: 100%;
  height: 20%;
  background-color: #f5cbd4;
`;

const MusicModal = () => {
  // 임시 userid params 의 데이터를 넘겨주는걸 생각해봐야할듯
  const userId = useAppSelector((state) => state.edit.userId);
  console.log(userId, "유저아이디");
  // 작품 조회
  // productcode === 1 : 음악코드
  const {
    data: Alldata,
    isLoading: AllLoading,
    refetch: ALL,
  } = useQuery<any>("ALLNFT", async () => {
    const size = 1000;
    return await getUsercollectedInfo(userId, size);
  });

  return (
    <Wrapper>
      <Head></Head>
      <Body>
        {Alldata &&
          Alldata.content.map((obj, i) => {
            if (obj.productCode === 1) {
              console.log(obj, i);
              return (
                <>
                  <div>{obj.productTitle}</div>
                  <div>{obj.productThumbnailUrl}</div>
                  <div>{obj.productFileUrl}</div>
                </>
              );
            }
          })}
      </Body>
      <Foot></Foot>
    </Wrapper>
  );
};

export default MusicModal;
