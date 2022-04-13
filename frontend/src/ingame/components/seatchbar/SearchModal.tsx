import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import influencer from "../../../essets/images/influencer-mark.png"
import artist from "../../../essets/images/artist-mark.png"
import enterprise from "../../../essets/images/enterprise-mark.png"


// api 요청
import { useMutation, useQuery } from "react-query";
import { getSearchUserNick, getUsercollectedInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { client } from "../../../../src/index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMusicList } from "../../stores/RoomStore";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 460px;
  top: 150px;
  background-color: #f0f0f0e9;
  /* background-color: #656565a5; */
  right: 30px;
  border-radius: 10px;
  padding: 10px;
  .subtitle{
    font-size: 13px;
    padding-bottom:10px;
    /* border-bottom: 0.5px solid white; */
    border-bottom: 0.5px solid #333;
    /* color: white; */
    margin-bottom: 20px;
    width: 90%;
  }
  .searchBox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .searchmark {
    margin: 0 5px 0 10px;
  }
`;
 
const Head = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .name{
    /* color:white; */
    margin-top: 20px;
    font-size: 30px;
    font-weight: 600;
  }
  
`;
const SearchInput = styled.input`
  width: 290px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  padding: 0 10px;
  :focus {
    outline: none;
  }
`;
const InnerContentContainer = styled.div`
  position: relative;
  border-bottom: 0.3px solid #e1dddd;
  img {
    width: 40px;
    height: 40px;
    margin: 3px;
    border-radius: 20px;
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
  img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
  }
`;

// 뮤직 리스트
const Body = styled.div`
  margin: auto;
  width: 90%;
  height: 60%;
  /* background-color: #6b6a72; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;


interface IState {
  "user" : {
    "authId": Number,
    "userAddress": string,
    "userDescription": string,
    "userEmail": string,
    "userEmailConfirm": boolean,
    "userId": Number,
    "userImgUrl": string,
    "userNick": string,
    "userRole": string,
    "userTokenRequest": boolean
  }
}
const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`; 
interface Iprops{
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}
const SearchModal:React.FC<Iprops> = ({setOpen}) => {
  // 임시 userid params 의 데이터를 넘겨주는걸 생각해봐야할듯
  const [searchValue, setSearchValue] = useState<any>("");
  const [users, setUsers] = useState<IState["user"][]>([])
  const navigate = useNavigate();

  const searchUserByNickname = useMutation<any, Error>(
    "searchUserByNickname",
    async () => {
      return await getSearchUserNick(searchValue);
    },
    {
      onSuccess: (res) => {
        setUsers(res)
      },
      onError: (err: any) => {
      },
    }
  );

  const getVerifiedMark = (userType: string) => {
    switch (userType) {
      case "ROLE_INFLUENCER":
        return <img src={influencer} alt="mark" />;
      case "ROLE_ARTIST":
        return <img src={artist} alt="mark" />;
      case "ROLE_ENTERPRISE":
        return <img src={enterprise} alt="mark" />;
      default:
        return <div></div>;
    }
  }

  const onClickUser = (user:IState["user"]) => {
    navigate("/ingame/" + String(user.userId))
    window.location.reload()
  }

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchValue(e.target.value);
  };

  const onKeyPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      searchUserByNickname.mutate();
    }
  };

  return (
    <Wrapper>
      <CloseButton onClick={()=>{setOpen(true)}}/>
      <Head>
        <div className="name">Search User</div>
        <div className="subtitle"></div>
      </Head>
      <div className="searchBox">

        <SearchIcon  className="searchmark" />
        <SearchInput
          onChange={(e) => onChangeInput(e)}
          onKeyPress={(e) => onKeyPressEnter(e)}
          spellCheck={false}
        ></SearchInput>
      </div>
      <Body>
      {users.map((user, idx) => (
          <InnerContentContainer
            key={idx}
            onClick={() => onClickUser(user)}
          >
            <img
              src={
                user.userImgUrl
                  ? user.userImgUrl
                  : "http://kaihuastudio.com/common/img/default_profile.png"
              }
              alt="프로필사진"
            />
            <InnerContent>{user.userNick}</InnerContent>
            <InnerContent>{getVerifiedMark(user.userRole)}</InnerContent>
          </InnerContentContainer>
        ))}
      </Body>
    </Wrapper>
  );
};

export default SearchModal;
