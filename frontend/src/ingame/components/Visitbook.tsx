import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks";

// api 요청
import { useMutation, useQuery, QueryClient } from "react-query";
import { getUserInfo } from "../../store/apis/user";
import { delGuestBook, putGuestBook } from "../../store/apis/gestbook";
import { client } from "../../../src/index";
import { dividerClasses } from "@mui/material";
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

  const [inputValue, setInputValue] = useState(book.guestbookContents);
  const myid = JSON.parse(localStorage.getItem("userId") || "");

  // 작성자 정보 불러오기
  const { data: writerInfo, isLoading: writerInfoLoading } = useQuery<any>(
    "witerInfo",
    async () => {
      return await getUserInfo(book.guestbookWriterId);
    }
  );

  const PutApi = useMutation<any, Error>(
    "putBook",
    async () => {
      return await putGuestBook(inputValue, book.guestbookId);
    },
    {
      onSuccess: (res) => {
        client.invalidateQueries("guestbook");
      },
    }
  );

  const DeleteApi = useMutation<any, Error>(
    "DeleteBook",
    async () => {
      return await delGuestBook(book.guestbookId);
    },
    {
      onSuccess: (res) => {
        // queryClient.setQueryData(["guestbook", book.guestbookOwnerId]);
        // todo로 시작하는 모든 쿼리를 무효화한다. ex) ['todos', 1], ['todos', 2], ...
        client.invalidateQueries("guestbook");
      },
    }
  );

  const changeModify = () => {
    setClickModify(!clickModify);
  };

  const deleteRequets = () => {
    console.log("삭제실행");
    DeleteApi.mutate();
  };

  const ChangeInputValue = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };
  // 로딩시 현재 접속한 userid를 불러온다.
  useEffect(() => {
    if (myid === book.guestbookOwnerId || myid === book.guestbookWriterId) {
      setModifybtn(true);
      setDeletebtn(true);
    }
  }, []);

  return (
    <>
      {/* 상단 */}
      <div>{book.guestbookId} 번째 게시글</div>
      {writerInfo ? <div>{writerInfo.userNick}</div> : "로딩중"}
      {writerInfo ? <div>{writerInfo.userImgUrl}</div> : "로딩중"}

      {/* 바디 */}
      <div>{book.guestbookCreatedAt}</div>
      {clickModify ? (
        <div>
          <input
            type="text"
            placeholder={book.guestbookContents}
            onChange={(e) => {
              ChangeInputValue(e);
            }}
            value={inputValue}
          />
        </div>
      ) : (
        <div>{book.guestbookContents}</div>
      )}
      {/* 버튼라인 */}
      {deletebtn ? <div onClick={() => deleteRequets()}>삭제버튼</div> : null}
      {modifybtn ? (
        <>
          {clickModify ? (
            <div
              onClick={() => {
                PutApi.mutate();
                changeModify();
              }}
            >
              수정완료
            </div>
          ) : (
            <div
              onClick={() => {
                changeModify();
              }}
            >
              수정
            </div>
          )}
        </>
      ) : null}
      <br></br>
    </>
  );
};

export default Visitbook;
