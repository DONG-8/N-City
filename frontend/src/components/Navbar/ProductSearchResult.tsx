import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IProduct } from "./SearchBar";


const ResultDiv = styled.div`
  width: 100%;
  height: 50px;
  border: solid;
  border-color: rgba(100, 100, 111, 0.2);
  border-width: 1px;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  display: flex;
  flex-direction: column;

  :hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
  }
`;

const InnerContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerContent = styled.div`
  margin: auto 20px;
`;

interface Iitem {
  item: {
    productCode: number;
    productFavorite: number;
    productId: number;
    productPrice: number;
    productRegDt: Array<number>;
    productThumbnailUrl: string;
    productTitle: string;
  }[]
  onclose: () => void;
}


const ProductSearchResult:React.FC<Iitem> = ({item, onclose}) => {
  const [items, setItems] = useState(item)
  const navigate = useNavigate();
  console.log(item)
  const onClickItem = (productId) => {
    // onclose()
    // navigate(`/store/detail/${productId}`)
  }
  

  useEffect(()=>{
    setItems(item)
  },[item])

  return (
    <ResultDiv>
      {items ? (
        items.map((i, idx) => (
          <InnerContentContainer
            key={idx}
            onClick={() => onClickItem(i.productId)}
          >
            <img src={i.productThumbnailUrl} alt="썸네일" />
            <InnerContent>{i.productTitle}</InnerContent>
            <InnerContent>{i.productFavorite}</InnerContent>
          </InnerContentContainer>
        ))
      ) : (
        <InnerContentContainer>
          <InnerContent>검색된 작품 없음</InnerContent>
        </InnerContentContainer>
      )}
    </ResultDiv>
  );
};

export default ProductSearchResult;
