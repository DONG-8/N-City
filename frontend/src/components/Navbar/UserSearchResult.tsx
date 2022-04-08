import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import influencer from "../../essets/images/influencer-mark.png"
import artist from "../../essets/images/artist-mark.png"
import enterprise from "../../essets/images/enterprise-mark.png"


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
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px; */
  }
`;

const InnerContentContainer = styled.div`
position: relative;
  border-bottom: 0.3px solid #e1dddd;
  img{
    width: 3vw;
    height: 3vw;
    margin: 3px;
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
  margin: auto 20px;
  align-items: center;
  .mark {
    width: 20px;
    height: 20px;
    position:absolute;
    right: 10px;
  }
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

  const getVerifiedMark = (userType: string) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return <img className="mark" src={influencer} title='influencer' alt="mark" />;
      case "ROLE_ARTIST":
        return <img className="mark" src={artist}  title='artist' alt="mark" />;
      case "ROLE_ENTERPRISE":
        return <img className="mark" src={enterprise} title='enterprise' alt="mark" />;
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
            <InnerContent>{getVerifiedMark(item.userRole)}</InnerContent>
          </InnerContentContainer>
        ))
      ) : (
        <Noresult>
          {" "}
          <span className="searchValue">'{searchValue}'</span>가 포함된 유저가
          없습니다
        </Noresult>
      )}
    </ResultDiv>
  );
};

export default UserSearchResult;
