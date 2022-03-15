import { ContactlessOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const SearchBarWrapper = styled.div`
  position: relative;
  width: 900px;
  min-width: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .row {
    margin-top: 24px;
  }

  .none {
    margin: 0;
  }
`;

const SearchBarDiv = styled.div`
  width: 90%;
  min-width: 500px;
  height: 50px;
  border-radius: 10px;
  border: solid 1px rgba(100, 100, 111, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  :focus-within {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
  }
  .hide {
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    animation: fadein 1s;
  }
`;

const SearchInput = styled.input`
  width: 500px;
  height: 40px;
  border: none;
  :focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z'/%3E%3C/svg%3E%0A");
  width: 25px;
  height: 25px;
  margin: 20px;
`;

const SearchResultWrapper = styled.div`
  position: absolute;
  top: 70px;
  width: 100%;
  min-width: 500px;
  /* display: none; */
`;

const SearchResultDiv = styled.div`
  width: 90%;
  height: 100%;
  min-width: 500px;
  background-color: white;
  border-color: red;
  border: solid 1px rgba(100, 100, 111, 0.2);
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
  color: black;
  hr {
    border-color: rgba(100, 100, 111, 0.2);
    border-style: inset;
    border-width: 1px;
    margin: 0px;
  }
`;

const DivideContent = styled.div`
  width: 90%;
  margin: 2% 5%;
  /* background-color: yellow; */
`;

// placeholder="Search items, collections, and accounts"
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<any>("");
  const [enter, setEnter] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>("");
  // const [hide, setHide] = useState<boolean>(false);
  // 검색내용
  const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // setSearchResult(true);
    if (e.target.value === "") {
      setSearchResult(false);
      setEnter(false);
    }
  };

  const Search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e, "이벤트");
    console.log(e.currentTarget.value, "넘어온 벨류");
    console.log(e.code, "코드");

    if (e.code === "Enter") {
      if (e.currentTarget.value === "이이잉") {
        setSearchResult(true);
        setEnter(true);
      } else {
        setSearchResult(false);
        setEnter(true);
      }
    }
  };

  // 페이지 이동 시 전역에서 데이터 없애주는걸로

  return (
    <SearchBarWrapper>
      <SearchBarDiv>
        <SearchIcon></SearchIcon>
        <SearchInput
          placeholder="Search items, collections, and accounts `Press Enter`"
          onChange={(e) => valueChange(e)}
          onKeyPress={(e) => Search(e)}
        ></SearchInput>
        {enter ? (
          <SearchResultWrapper className={searchResult ? "hide" : "none"}>
            {searchResult ? (
              <SearchResultDiv>
                <DivideContent>방 정보</DivideContent>
                <hr />
                <SearchResult></SearchResult>
                <DivideContent>아이템 정보</DivideContent>
                <hr />
                <SearchResult></SearchResult>
                <DivideContent>유저</DivideContent>
                <hr />
                <SearchResult></SearchResult>
              </SearchResultDiv>
            ) : (
              <>
                <SearchResultDiv>
                  <DivideContent>
                    결과가 없습니다 다시 검색 해 주세용{" "}
                  </DivideContent>
                </SearchResultDiv>
              </>
            )}
          </SearchResultWrapper>
        ) : null}
      </SearchBarDiv>
    </SearchBarWrapper>
  );
};

export default SearchBar;
