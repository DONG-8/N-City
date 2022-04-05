import React, { useState } from "react";
import styled from "styled-components";
import GameItemCard from "./GameItemCard";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import GameDetailItem from "./GameDetailItem";
import { useQuery } from "react-query";
import {
  getSellProduct,
  getSellProductCategori,
} from "../../../store/apis/product";
import { Button } from "@mui/material";
import CharacterPage from "./CharacterPage";

const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  right: 100px;
  width: 1000px;
  height: 600px;
  background-color: white;
  padding: 4px;
  overflow-y: scroll;
  overflow-x: hidden;
  .title {
    margin: auto;
    height: 10vh;
    width: 60vw;
    background-color: #030338;
    font-size: 5vh;
    font-weight: 600;
    color: white;
    padding-top: 3vh;
  }
`;
const ItemCards = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const NavBar = styled.div`
  display: flex;
`;

interface Istate {
  item: {
    productId: Number;
    productTitle: string;
    productPrice: Number;
    productThumbnailUrl: string;
    productFavorite: Number;
    productRegDt: Object;
    productCode: Number;
    productFavoriteUser: {
      authId: Number;
      userAddress: string;
      userDescription: string;
      userEmail: string;
      userEmailConfirm: boolean;
      userId: number;
      userImgUrl: string;
      userNick: string;
      userRole: string;
    }[];
  };
}

const StoreModal = () => {
  const [mode, setMode] = useState("index"); // index,detail

  const { isLoading: ILS, data: items } = useQuery<any>(
    "getSellProduct",
    async () => {
      return await getSellProduct();
    },
    {
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );
  const { isLoading: ILC, data: characters } = useQuery<any>(
    "getSellProductCategori",
    async () => {
      return await getSellProductCategori(10);
    },
    {
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );

  return (
    <Wrapper>
      <NavBar>
        <Button
          onClick={() => {
            setMode("index");
          }}
        >
          {" "}
          판매중인 NFT{" "}
        </Button>
        <Button
          onClick={() => {
            setMode("character");
          }}
        >
          {" "}
          캐릭터 상점{" "}
        </Button>
      </NavBar>
      {mode === "index" && (
        <div className="Index">
          <div className="title"> 판매중인 상품</div>
          <ItemCards>
            {items !== undefined &&
              items.content.map((item, idx) => {
                return <GameItemCard setMode={setMode} key={idx} item={item} />;
              })}
          </ItemCards>
        </div>
      )}
      {mode === "detail" && (
        <div className="Detail">
          <KeyboardReturnIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMode("index");
            }}
          />
          <GameDetailItem setMode={setMode} />
        </div>
      )}
      {mode === "character" && characters !== undefined && (
        <div className="Caracter">
          <KeyboardReturnIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMode("index");
            }}
          />
          <div className="title"> 캐릭터상점</div>
          {characters !== undefined ? (
            <ItemCards>
              {characters.content.map((item, idx) => {
                return <GameItemCard setMode={setMode} key={idx} item={item} />;
              })}
            </ItemCards>
          ) : (
            <div>정보없음</div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default StoreModal;
