import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


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

interface IUser {
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
  }[]
  onclose: () => void;
}


const UserSearchResult:React.FC<IUser> = ({item, onclose}) => {
  const [items, setItems] = useState(item)
  const navigate = useNavigate();

  const onClickItem = (userId) => {
    onclose();
    navigate(`/mypage/${userId}`)
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
            onClick={() => onClickItem(i.userId)}
          >
            <img
              src={
                i.userImgUrl
                  ? i.userImgUrl
                  : "http://kaihuastudio.com/common/img/default_profile.png"
              }
              alt="프로필사진"
            />
            <InnerContent>{i.userNick}</InnerContent>
            <InnerContent>{i.userRole}</InnerContent>
          </InnerContentContainer>
        ))
      ) : (
        <InnerContentContainer>
          <InnerContent>검색된 유저 없음</InnerContent>
        </InnerContentContainer>
      )}
    </ResultDiv>
  );
};

export default UserSearchResult;
