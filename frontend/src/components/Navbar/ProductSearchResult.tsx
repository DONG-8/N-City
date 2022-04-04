import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";


const ResultDiv = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
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
  img {
    width: 3vw;
    height: 3vw;
    margin-left: 1vw;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

const InnerContent = styled.div`
display: flex;
align-items: center;
  margin-right: 4vw;
  svg {
    width: 12px;
  }
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
    userRole: string;
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
  
  const getVerifiedMark = (userType: string) => {
    switch (userType) {
      case "USER_INFLUENCER":
        return <img src="essets/marks/influencer-mark.png" alt="mark" />;
      case "USER_ARTIST":
        return <img src="essets/marks/artist-mark.png" alt="mark" />;
      case "USER_ENTERPRISE":
        return <img src="essets/marks/enterprise-mark.png" alt="mark" />;
      default:
        return;
    }
  }

  useEffect(()=>{
    setItems(item)
  },[item])

  return (
    <ResultDiv>
      {items.length > 0 ? (
        items.map((item, idx) => (
          <InnerContentContainer
            key={idx}
            onClick={() => onClickItem(item.productId)}
          >
            <img src={item.productThumbnailUrl} alt="썸네일" />
            <InnerContent>
              {item.productTitle}
              <span>{getVerifiedMark(item.userRole)}</span>
            </InnerContent>
            <InnerContent className="title">
              <FavoriteIcon color="error" />
              {item.productFavorite}
            </InnerContent>
          </InnerContentContainer>
        ))
      ) : (
        <Noresult>
          {" "}
          <span className="searchValue">'{searchValue}'</span>가 포함된 작품이
          없습니다
        </Noresult>
      )}
    </ResultDiv>
  );
};

export default ProductSearchResult;
