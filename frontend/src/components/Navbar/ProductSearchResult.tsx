import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ResultDiv = styled.div`
  width: 100%;
  min-height: 100px;
  max-height: 30vh;
  overflow-y: auto;
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
  border-bottom: 0.3px solid #e1dddd;
  img{
    width: 3vw;
    height: 3vw;
    margin-left: 1vw;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const InnerContent = styled.div`
  margin-right: 4vw;
`;
const Noresult = styled.div`
  margin-left: 2vw;
  margin-top: 2vw;
  .searchValue{
    color:#4343e2 
  }
`
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
  searchValue:string;
}


  const ProductSearchResult:React.FC<Iitem> = ({item, searchValue,onclose}) => {
  const [items, setItems] = useState(item)
  const navigate = useNavigate();
  console.log(item)
  const onClickItem = (productId) => {
    onclose()
    navigate(`/store/detail/${productId}`)
  }
  

  useEffect(()=>{
    setItems(item)
  },[item])

  return (
    <ResultDiv>
      {items.length>0 ? (
        items.map((item, idx) => (
          <InnerContentContainer
            key={idx}
            onClick={() => onClickItem(item.productId)}
          >
            <img src={item.productThumbnailUrl} alt="썸네일" />
            <InnerContent>{item.productTitle}</InnerContent>
            <InnerContent>{item.productFavorite}</InnerContent>
          </InnerContentContainer>
        ))
      ) : (
         <Noresult> <span className="searchValue">'{searchValue}'</span>
         가 포함된 작품이 없습니다</Noresult>
      )}
    </ResultDiv>
  );
};

export default ProductSearchResult;
