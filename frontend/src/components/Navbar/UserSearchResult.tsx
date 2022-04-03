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
  margin: auto 20px;
`;
const Noresult = styled.div`
  margin-left: 2vw;
  margin-top: 2vw;
  .searchValue{
    color:#4343e2 
  }
`
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
  searchValue:string;

}


const UserSearchResult:React.FC<IUser> = ({searchValue,item, onclose}) => {
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
      {items.length>0 ? (
        items.map((item, idx) => (
          <InnerContentContainer
            key={idx}
            onClick={() => onClickItem(item.userId)}
          >
            <img
              src={
                item.userImgUrl
                  ? item.userImgUrl
                  : "http://kaihuastudio.com/common/img/default_profile.png"
              }
              alt="프로필사진"
            />
            <InnerContent>{item.userNick}</InnerContent>
            <InnerContent>{item.userRole}</InnerContent>
          </InnerContentContainer>
        ))
      ) : (
        <Noresult> <span className="searchValue">'{searchValue}'</span>
         가 포함된 유저가 없습니다</Noresult>
      )}
    </ResultDiv>
  );
};

export default UserSearchResult;
