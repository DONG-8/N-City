import { Input, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getUserduplicateInfo, getUserInfo, patchUserInfoChange } from '../../store/apis/user';
import SelectImage from './SelectImage';


const SettingWrapper = styled.div`
  width: 83%;
  height: 78vh;
  background-color: #F7F8FA ;
  border-radius: 10px;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  margin: auto;
  margin-top: 3vh;
  margin-bottom:10vh;
`
const Left = styled.div`
  flex:6;
  margin-left:3vw;
  .bigTitle {
    font-size: 4vh;
    font-weight: 1000;
  }
  .profileImg {
    border-radius: 100%;
    width: 10vw;
    height: 10vw;
    border: 0.5px solid #e3e6ee;
  }
  .title {
    font-size: 3vh;
    font-weight: 1000;
    margin-top: 2vh;
  }
  .input {
    width: 15vw;
    height: 5vh;
    font-size: 3vh;
  }
  .img_name{
    display: flex;
  }
  .name_box{
    margin: auto;
  }
  .btnbox{
    display: flex;
    height: 4vh;
    margin-top: 3vh;
    justify-content: space-between;
    button{
      margin-left: 3vh;
    }
    
  }
  .nickcheck{
    margin-right: 30vh;

  }
`;

const Right = styled.div`
  flex:4;
  margin-left: 5vw;
  .title {
    font-size: 3vh;
    font-weight: 1000;
    margin-top: 2vh;
  }
  textarea {
    width: 40vw;
    height: 25vh;
    resize: none;
    font-size: 2rem;
    &:focus {
      border-color: teal;
      outline: none;
      box-shadow: 0 0 4px teal;
      transition: 0.2s ease-in;
    }
  }
  .sumnailImg {
    width: 40vw;
    height: 30vh;
    overflow: hidden;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;
const BTN = styled.div`
  width:80%;
  margin: auto;
  display: flex;
  margin-top: 5vh;
  justify-content: space-around;
  button{
    width: 20vw;
    height: 8vh;
    font-size: 3vh;

  }
`
const Up = styled.div`
    display: flex;

`
const ProfileSetting = () => {
  
  const navigate = useNavigate()
  const {userId}= useParams()
  const [nameInput,setNameInput]  = useState('')
  const [Email,setEmail] = useState('')
  const [EmailInput,setEmailInput] = useState('')
  const [userName,setuserName]  = useState('')
  const [nameCheck,setNameCheck] = useState(false)
  const [Description,setDescription]  = useState('')
  const [userURL,setuserURL] = useState('') 
  //모달창
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const { isLoading:iLU, data:user } = useQuery<any>(
    "getUserInfo",
    async () => {return (await (getUserInfo(Number(userId))))
      },
    {
      onSuccess: (res) => {
        setEmail(res.userEmail === null ? "" : res.userEmail)
        setEmailInput(res.userEmail === null ? "" : res.userEmail)
        setuserName(res.userNick === null ? "" : res.userNick)
        setNameInput(res.userNick === null ? "" : res.userNick)
        setDescription(res.Description === null ? "" : res.Description)
        setuserURL(res.userImgUrl === null ? "" : res.userImgUrl)
      },
      onError: (err: any) => {
        console.log(err, "유저불러오기 실패");
      },
    }
  );
  const tmp = {
    authId: 12,
    followeeCnt: 0,
    followerCnt: 1,
    userAddress: "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A",
    userDescription: null,
    userEmail: null,
    userEmailConfirm: false,
    userId: 1,
    userImgUrl: null,
    userNick: "noname1",
    userRole: "ROLE_ADMIN",
  }
  useEffect(()=>{
    if (user!==undefined){
      if (nameInput === userName){
        setNameCheck(true)
      }
      else{setNameCheck(false)}
    }
  },[nameInput])
  
  const getNameCheck = useMutation<any, Error>(
    "getUserduplicateInfo",
    async () => {
      return await getUserduplicateInfo(nameInput);
    },
    {
      onSuccess: (res) => { 
        setNameCheck(true)
        setuserName(nameInput)
      },
      onError: (err: any) => {console.log('중복이름 에러')},
    }
  );
  const saveChange = useMutation<any, Error>(
    "patchUserInfoChange",
    async () => {
      const formdata = new FormData()
      formdata.append("userDescription",'123123')
      formdata.append("userEmail",'5dfhasu')
      formdata.append("userId",'2')
      formdata.append("userImgUrl",'sdalijzxcl')
      formdata.append("userNick",'우끼끼끾')
      for (var key of formdata.keys()) {
        console.log(key);
      }
      for (var value of formdata.values()) {
        console.log(value);
      }
      return await patchUserInfoChange(formdata);
    },
    {
      onSuccess: (res) => { },
      onError: (err: any) => {console.log('프로필 저장 에러')},
    }
  );
  return (
    <>
      {user !== undefined &&
      <SettingWrapper>
        <Up>
        <Left>
          <p className="bigTitle">Profile Setting</p>
          <div className='img_name'>
            {userURL ?
            <img className="profileImg" alt="pic" src={userURL}/>:
            <img className='profileImg' src='https://www.taggers.io/common/img/default_profile.png' alt='profile'/>
            }
            <div className='name_box'>
              <p className="title">Username</p>
              <Input value={nameInput} 
              onChange={(e: React.ChangeEvent)=>{
                setNameInput((e.target as HTMLInputElement).value)
              }}  className="input" /> 
                </div>
          </div>
          <div className='btnbox'>
            <Button variant="contained"
              onClick={()=>{setOpen(true)}} >프로필 수정</Button>
            <div className='nickcheck'>
            {nameCheck ?
              <p>✔</p>:
              <Button onClick={()=>{getNameCheck.mutate()}}> 
                  닉네임 중복 확인 
              </Button> }
            </div>
          </div>
            
            
          <p className="title">이메일</p> 
          <Input value={EmailInput} onChange={(e: React.ChangeEvent)=>{
            setEmailInput((e.target as HTMLInputElement).value)
          }} 
           className="input" />
          <Button>이메일 검증 </Button>
          {user.userEmailConfirm ? 
          <p>확인</p> :
          <p>미확인</p>
        }
        </Left>
        <Right>
          <p className="title">자기소개</p>
          <textarea value={Description} className="textarea" 
          onChange={(e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>{
            setDescription((e.target as HTMLTextAreaElement).value)
          }}/>
          <p className="title">userAddress</p>
          <p >{user.userAddress}</p>
          <p className="title">userRole</p>
          <p >{user.userRole}</p>
          <Button  variant="contained" >인증마크 신청 페이지</Button>
        </Right>
        </Up>
      <BTN>
        <Button className='save'  variant="contained" 
        color="info" onClick={()=>{navigate(-1)}}>뒤로가기</Button>
        <Button className='save' variant="contained" 
        color="success" 
        onClick={()=>{ saveChange.mutate();}}>저장하기</Button>
      </BTN>
      </SettingWrapper>
    } 
      <SelectImage setuserURL={setuserURL} userId={Number(userId)} open={open} setOpen={setOpen}/>
    </>
  );
}

export default ProfileSetting