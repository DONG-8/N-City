import { Input, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getUserduplicateInfo, getUserInfo, patchUserInfoChange, postConfirmEmail } from '../../store/apis/user';
import SelectImage from './SelectImage';

const AddressWrapper = styled.div`
  width: 83%;
  height: 78vh;
  background-color: #F7F8FA ;
  border-radius: 10px;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  margin: auto;
  margin-top: 3vh;
  margin-bottom:10vh;
`

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
const EmailBox = styled.div`
  display: flex;
  input{
    font-size: 2vh;
  }
`
const Left = styled.div`
  flex: 6;
  margin-left: 3vw;
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
    font-size: 2.5vh;
  }
  .img_name {
    display: flex;
  }
  .name_box {
    margin-left: 3vw;
    .input_check {
      display: flex;
      .nickcheck {
        button{
          margin-top: 1vh;
          font-size: 1.5vh;
        }
      }
    }
  }
  .btnbox {
    display: flex;
    height: 4vh;
    margin-top: 3vh;
    justify-content: space-between;
    button {
      margin-left: 3vh;
    }
  }
  h4{
    color: gray;
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
    width: 32vw;
    height: 25vh;
    resize: none;
    font-size: 2vh;
    margin-right: 5vw;
    &:focus {
      border-color: teal;
      outline: none;
      box-shadow: 0 0 4px #333;
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
const AfterAddress = styled.div`
  
`
const BeforeAddress = styled.div`
  
`
const ProfileSetting = () => {
  
  const navigate = useNavigate()
  const userId = Number(localStorage.getItem('userId')||"")
  const [nameInput,setNameInput]  = useState('')
  const [Email,setEmail] = useState('')
  const [EmailInput,setEmailInput] = useState('')
  const [userName,setuserName]  = useState('')
  const [nameCheck,setNameCheck] = useState(false)
  const [Description,setDescription]  = useState('')
  const [userURL,setuserURL] = useState('') 
  const [AddressCheck,setAddressCheck] = useState(false)
  //모달창
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const { isLoading:iLU, data:user } = useQuery<any>(
    "getUserInfo",
    async () => {return (await (getUserInfo(userId)))
      },
    {
      onSuccess: (res) => {
        setEmail(res.userEmail === null ? "" : res.userEmail)
        setuserName(res.userNick === null ? "" : res.userNick)
        setNameInput(res.userNick === null ? "" : res.userNick)
        setDescription(res.Description === null ? "" : res.Description)
        setuserURL(res.userImgUrl === null ? "" : res.userImgUrl)
        setAddressCheck(res.userEmailConfirm)
      },
      onError: (err: any) => {
        console.log(err, "유저불러오기 실패");
      },
    }
  );
 
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
  const postEmail = useMutation<any, Error>(
    "postConfirmEmail",
    async () => {
      return await postConfirmEmail(userId,EmailInput);
    },
    {
      onSuccess: (res) => { 
        console.log(res)
        setAddressCheck(true)
      },
      onError: (err: any) => {
        alert('이메일 중복 오류')
      },
    }
  );
  const saveChange = useMutation<any, Error>(
    "patchUserInfoChange",
    async () => {
      const formdata= new FormData()
      formdata.append("userDescription",Description)
      formdata.append("userEmail",EmailInput)
      formdata.append("userId",String(userId))
      formdata.append("userImgUrl",userURL)
      formdata.append("userNick",nameInput)
      
      return await patchUserInfoChange(formdata);
    },
    {
      onSuccess: (res) => { },
      onError: (err: any) => {console.log('프로필 저장 에러')},
    }
  );
  const sendemail = ()=>{
    postEmail.mutate()
  }
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
              <Button variant="contained"
              onClick={()=>{setOpen(true)}} >이미지 수정</Button>
              <p className="title">Username</p>

              <div className='input_check'>
                <Input value={nameInput} 
                onChange={(e: React.ChangeEvent)=>{
                  setNameInput((e.target as HTMLInputElement).value)
                }}  className="input" /> 
                <div className='nickcheck'>
                  {nameCheck ? <p>✔</p>:
                    <Button onClick={()=>{getNameCheck.mutate()}}> 
                      닉네임 중복 확인 
                    </Button> }
                </div>
              </div>

            </div>
          </div>

          <p className="title">이메일</p> 
          <EmailBox>
            <Input value={EmailInput} onChange={(e: React.ChangeEvent)=>{
              setEmailInput((e.target as HTMLInputElement).value)}} 
            className="input" />
            {user.userEmailConfirm ? 
             <p>✔</p> :
             <p>❌</p>
            }
          </EmailBox>
            {EmailInput !=='' && EmailInput.includes('@')&&EmailInput.includes('.com')?
              <div>
                <Button onClick={()=>{sendemail()}} color="inherit" variant="contained">이메일 요청 보내기 </Button>
              </div>:
              <div>올바르지 않은 이메일 속성입니다.</div>
            }
            {!user.userEmailConfirm &&
            <h4>이메일 인증을 하지 않으면 프로필 수정이 불가합니다.</h4> }
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
          <Button variant="contained" >인증마크 신청 페이지</Button>
        </Right>
        </Up>
      <BTN>
        <Button className='save'  variant="contained" 
        color="info" onClick={()=>{navigate(-1)}}>뒤로가기</Button>
        <Button className='save' variant="contained" 
        color="success" 
        onClick={()=>{ saveChange.mutate()}}>저장하기</Button>
      </BTN>
      <SelectImage setuserURL={setuserURL} userId={Number(userId)} open={open} setOpen={setOpen}/>
      </SettingWrapper>
      }
    </>
  );
}

export default ProfileSetting