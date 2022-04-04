import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// x 아이콘 넣기
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// api 요청
import { useMutation, useQuery } from "react-query";
import { getUserInfo } from "../../../src/store/apis/user"; //  유저정보 가져오기
import { postRoomJoin } from "../../store/apis/myRoom";
import { getGuestBook, postGuestBook } from "../../../src/store/apis/gestbook";
import { client } from "../../../src/index";
// 스토어 state, dispatch
import { useAppSelector, useAppDispatch } from "../hooks";

// 방명록 개별 콘텐츠
import Visitbook from "./Visitbook";
import { Book } from "@mui/icons-material";
import { dividerClasses } from "@mui/material";

// 버튼
import PagenationButton from "./PagenationButton";
import { queryByTitle } from "@testing-library/react";

const Wrapper = styled.div`
  position: absolute;
  width: 1000px;
  right: 100px;
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all 0.3s ease;
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
  overflow-y: scroll;
  margin-bottom: 10px;
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
  const [pagenumber, setPagenumber] = useState(1);
  const [pageArr, setPageArr] = useState<number[]>([]);
  const refscroll = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const myid = JSON.parse(localStorage.getItem("userId") || "");
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

  const postBook = useMutation<any, Error>(
    "postBookinput",
    async () => {
      return await postGuestBook(inputValue, userId, myid);
    },
    {
      onSuccess: (res) => {
        console.log(res, "작성하기 성공");
        client.invalidateQueries("guestbook");
      },
    }
  );

  const {
    data: guestbookdata,
    isLoading: guestbookLoaing,
    refetch: action,
  } = useQuery<any>(
    ["guestbook"],
    async () => {
      return await getGuestBook(userId, pagenumber);
    },
    {
      onSuccess: (res) => {
        console.log(res.totalPages);
      },
    }
  );
  const scrollTop = () => {
    refscroll.current?.scrollTo(0, 0);
  };

  // 입력 변경
  const ChangeInputValue = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const InputBook = () => {
    setInputValue("");
    console.log(inputRef.current, "레프");
    postBook.mutate();
  };

  useEffect(() => {
    console.log(pagenumber, "페이지변경");
    action();
    scrollTop();
  }, [pagenumber]);

  useEffect(() => {
    // 컴포넌트 생성 시 방의 정보를 불러온다
    console.log(pageArr);
    RoomInfo();
  }, []);

  if (userInfoLoading === true) {
    return <div>로딩중</div>;
  }

  return (
    <Wrapper>
      {/* <ColorBar>
        <Head>
          <img src={userInfo.userImgUrl} alt="사진없노" />
          <div>방 주인장 : {userInfo.userNick}</div>
          <div>팔로워 수 : {userInfo.followerCnt}</div>
          <div>팔로잉 수 : {userInfo.followeeCnt}</div>
        </Head>
      </ColorBar> */}
      <Body ref={refscroll}>
        <div>
          {guestbookdata.content.map((obj, i) => {
            return <Visitbook key={i} book={obj}></Visitbook>;
          })}
        </div>
        <div>
          <PagenationButton
            number={guestbookdata.totalPages}
            setValue={setPagenumber}
          />
        </div>
      </Body>
      <InputLine>
        <div>방명록을 입력하세용</div>
        <input
          type="text"
          onChange={(e) => {
            ChangeInputValue(e);
          }}
          ref={inputRef}
          // value={input}
        />
        <button
          onClick={() => {
            InputBook();
          }}
        >
          입력하기
        </button>
      </InputLine>
    </Wrapper>
  );
};

export default VisitModal;

// {guestbookLoaing ? null : (
//   <div>
//     {arr.map((obj, i) => {
//       return <div key={i}>{i + 1}</div>;
//     })}
//     1
//   </div>
// )}
