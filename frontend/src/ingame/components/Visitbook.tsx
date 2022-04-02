import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";

// api 요청
import { useMutation, useQuery } from "react-query";
import { getUserInfo } from "../../store/apis/user";

interface IguestInfo {
  book: {
    guestbookContents: string;
    guestbookCreatedAt: string;
    guestbookId: number;
    guestbookOwnerId: number;
    guestbookWriterId: number;
  };
}

const Visitbook: React.FC<IguestInfo> = ({ book }) => {
  const [deletebtn, setDeletebtn] = useState(false);
  const [modifybtn, setModifybtn] = useState(false);
  const [clickDel, setClickdel] = useState(false);
  const [clickModify, setClickModify] = useState(false);

  const myid = JSON.parse(localStorage.getItem("userId") || "");

  // 작성자 정보 불러오기
  const { data: writerInfo, isLoading: writerInfoLoading } = useQuery<any>(
    "witerInfo",
    async () => {
      return await getUserInfo(book.guestbookWriterId);
    }
  );

  const deletButtonSetting = () => {};

  const modifyButtonSetting = () => {};

  // 로딩시 현재 접속한 userid를 불러온다.
  useEffect(() => {
    if (myid === book.guestbookOwnerId || myid === book.guestbookWriterId) {
      setModifybtn(true);
      setDeletebtn(true);
    }
  }, []);

  return (
    <>
      <div>{book.guestbookId} 번째 게시글</div>
      <div>{book.guestbookContents}</div>
      <div>{book.guestbookCreatedAt}</div>
      {deletebtn ? <div>삭제버튼</div> : null}
      {modifybtn ? <div>수정버튼</div> : null}
      {writerInfo ? <div>{writerInfo.userNick}</div> : "로딩중"}
      {writerInfo ? <div>{writerInfo.userImgUrl}</div> : "로딩중"}
      <br></br>
    </>
  );
};

export default Visitbook;
