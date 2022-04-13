import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
// api 요청
import { useMutation, useQuery } from "react-query";
import { getUsercollectedInfo } from "../../../store/apis/user"; //  유저정보 가져오기
import { client } from "../../../index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMusicList } from "../../stores/RoomStore";
import { deleteFollow, postFollow } from "../../../store/apis/follow";
import OtherPlayer from "../../characters/OtherPlayer";
import UserItem from "./UserItem";


const Wrapper = styled.div`
  position: absolute;
  width: 340px;
  height: 460px;
  background-color: #e4e4e4d7;
  /* background-color: #656565a5; */
  right: 30px;
  border-radius: 10px;
  padding: 10px;
`;
 
const Head = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .name{
    /* color:white; */
    margin-top: 20px;
    font-size: 30px;
  }
  .divider{
    border-bottom: 0.5px solid #333;
    /* color: white; */
    margin-bottom: 20px;
    height: 10px;
    width: 90%;
  }
`;

// 뮤직 리스트
const Body = styled.div`
  margin: auto;
  width: 90%;
  height: 80%;
  /* background-color: #6b6a72; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

// pagenation & 설명?
const Foot = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: #f5cbd4; */
`;
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
const UsersModal:React.FC<Iprops> = ({setOpen}) => {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setOpen(true)
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.edit.userId);
  console.log(userId, "유저아이디");
  const tracks = useAppSelector((state) => state.room.roomMusicList);
  // const user = useAppSelector((state) => state.user.playerNameMap)
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState(useAppSelector((state) => state.user.playerNameMap))
  console.log(user.entries())

  const getUsers = () => {
    const temp:object[] = []
    user.forEach(function(value, key) {
      console.log("key : ", key)
      console.log("value : ", value)
      temp.push({"userId": key, "userNick" : value})
    })
    setUsers(temp)
  }

  useEffect(() => {
    getUsers()
  }, [user])

  // 작품 조회
  // productcode === 1 : 음악코드

  // const {
  //   data: Alldata,
  //   isLoading: AllLoading,
  //   refetch: ALL,
  // } = useQuery<any>(
  //   "ALLUSER",
  //   async () => {
  //     const size = 1000;
  //     return await getUsercollectedInfo(userId, size);
  //   },
  //   {
  //     onSuccess: (res) => {
  //       // 성공하면 db에 뮤직 string List를 만들어서 넘겨준다.
  //       let arr;
  //       console.log(res, "앱창에서 불러온 정보");
  //       const UserArray = res.content.map((obj, i) => {
  //         if (obj.productCode === 1) {
  //           return {
  //             title: obj.productTitle,
  //             artist: obj.productDesc,
  //             audioSrc: obj.productFileUrl,
  //             image: obj.productThumbnailUrl,
  //             color: "#6225E6",
  //           };
  //         } else {
  //           return null;
  //         }
  //       });
  //       const result = UserArray.filter((obj, i) => obj !== null);
  //       console.log(result, "새 결과");
  //       dispatch(setMusicList(result));
  //       setUser(result);
  //     },
  //   }
  // );

  // const follow = useMutation<any, Error>(
  //   "follow",
  //   async () => {
  //     return await postFollow(Number(item.mintUserId));
  //   },
  //   {
  //     onSuccess: (res) => {
  //       console.log("팔로우 성공", res);
  //       setFollowBtnState(false);
  //     },
  //     onError: (err) => console.log("팔로우 실패", err),
  //   }
  // );

  // const unFollow = useMutation<any, Error>(
  //   "follow",
  //   async () => {
  //     return await deleteFollow(Number(item.mintUserId));
  //   },
  //   {
  //     onSuccess: (res) => {
  //       console.log("언팔로우 성공", res);
  //       setFollowBtnState(true);
  //     },
  //     onError: (err) => console.log("언팔로우 실패", err),
  //   }
  // );
  console.log(tracks)
  const onClickJoinRoom = (userId) => {
    // 방입장 
  }

  const onClickFollow = () => {

  }
  
  const content = [
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
    {
      userId: 1,
      authId: 25,
      userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
      userRole: "ROLE_REQUEST",
      userNick: "아이유",
      userEmail: "0",
      userEmailConfirm: false,
      userDescription: "안녕하세요",
      userImgUrl:
        "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      followerCnt: 6,
      followeeCnt: 5,
      myRoomTodayCnt: 515,
      myRoomTotalCnt: 2240,
    },
  ];
  const Alldata = {"content" : content}

  return (
    <Wrapper>
      <CloseButton onClick={()=>{setOpen(true)}}/>

      <Head>
        <div className="name">Users</div>
        <div className="divider"></div>
      </Head>
      <Body>
        {users.map((user, idx) => {
          return <UserItem user={user} />
        })}
      </Body>
    </Wrapper>
  );
};

export default UsersModal;
