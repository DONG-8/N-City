import { ContactlessOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProductSearch } from "../../store/apis/product";
import { getSearchUserNick } from "../../store/apis/user";
import ProductSearchResult from "./ProductSearchResult";
import SearchResult from "./ProductSearchResult";
import UserSearchResult from "./UserSearchResult";

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
  svg {
    margin: 0 5px 0 10px;
  }
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
    animation: fadein 0.5s;
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
  display: flex;
  flex-direction: column;
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

const MenuBox = styled.div`

`
export interface IUser {
  item : {
  authId: number;
  userAddress: string;
  userDescription: string;
  userEmail: string;
  userEmailConfirm: false;
  userId: number;
  userImgUrl: string;
  userNick: string;
  userRole: string;
  }
}

export interface IProduct {
  item : {
  productCode: number;
  productFavorite: number;
  productId: number;
  productPrice: number;
  productRegDt: Array<number>;
  productThumbnailUrl: string;
  productTitle: string;
  }
}

// placeholder="Search items, collections, and accounts"
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<any>("");
  const [enter, setEnter] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>("");
  const [users, setUsers] = useState<IUser["item"][]>([]);
  const [products, setProducts] = useState<IProduct["item"][]>([]);
  const [isItemState, setIsItemState] = useState(true)
  const navigate = useNavigate();

  // const [hide, setHide] = useState<boolean>(false);
  // 검색내용
  const valueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    await setSearchValue(e.target.value);
  
    console.log(searchValue)
    // setSearchResult(true);
    if (e.target.value === "") {
      setSearchResult(false);
      setEnter(false);
    } else {
      setSearchResult(true)
    }
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e, "이벤트");
    console.log(e.currentTarget.value, "넘어온 벨류");
    console.log(e.code, "코드");
    if (e.code === "Enter") {
      // await searchProductByName.mutate()
      // await searchUserByNickname.mutate()
      // if (e.currentTarget.value) {
        // setSearchResult(true);
        // setEnter(true);
      // } else {
      //   setSearchResult(false);
      //   setEnter(true);
      // }
      setSearchResult(false)
      await navigate(`/search/${searchValue}`)
    }
  };

  const searchProductByName = useMutation<any, Error>(
    "searchProductByName",
    async () => {
      return await getProductSearch(searchValue);
    },
    {
      onSuccess: async (res) => {
        console.log(res, "상품검색성공");
        console.log(res.content)
        setProducts(res.content)
      },
      onError: (err: any) => {
        console.log(err, "상품검색에러발생");
      },
    }
  );
  
  const onclose =() => {
    setSearchResult(false)
  }

  const request = () => {
    if (searchValue) {
      searchProductByName.mutate()
      searchUserByNickname.mutate()
    }
  }

  useEffect(() => {
    request();
  }, [searchValue])
  const searchUserByNickname = useMutation<any, Error>(
    "searchUserByNickname",
    async () => {
      return await getSearchUserNick(searchValue);
    },
    {
      onSuccess: (res) => {
        console.log(res, "유저검색성공");
        setUsers(res)
        console.log(users)
      },
      onError: (err: any) => {
        console.log(err, "유저검색에러발생");
      },
    }
  );

  // 페이지 이동 시 전역에서 데이터 없애주는걸로

  return (
    <SearchBarWrapper>
      <SearchBarDiv>
        <SearchIcon />
        <SearchInput
          placeholder="Search items, collections, and accounts `Press Enter`"
          onChange={(e) => valueChange(e)}
          onKeyPress={(e) => handleEnter(e)}
          spellCheck={false}
        ></SearchInput>
        {searchResult ? (
          <SearchResultWrapper className={searchResult ? "hide" : "none"}>
            <SearchResultDiv>
              <MenuBox>
                <button onClick={() => setIsItemState(true)}>작품 정보</button>
                <button onClick={() => setIsItemState(false)}>유저</button>
                <button onClick={() => setSearchResult(false)}>X</button>
              </MenuBox>
              {isItemState ? (
                <div>
                  <DivideContent>작품 정보</DivideContent>
                  <hr />
                    <ProductSearchResult
                      item={products}
                      onclose={onclose}
                    ></ProductSearchResult>
                </div>
              ) : (
                <div>
                  <DivideContent>유저</DivideContent>
                  <hr />
                  <UserSearchResult
                    item={users}
                    onclose={onclose}
                  ></UserSearchResult>
                </div>
              )}
            </SearchResultDiv>
          </SearchResultWrapper>
        ) : null}
      </SearchBarDiv>
    </SearchBarWrapper>
  );
};

export default SearchBar;
