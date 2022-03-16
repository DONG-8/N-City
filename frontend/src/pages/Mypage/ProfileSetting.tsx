import { Input, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const SettingWrapper = styled.div`
  width: 83%;
  display: flex;
  height: 85vh;
  background-color:#F2DBDB;
  margin: auto;
  margin-bottom:3vh;
`
const Left = styled.div`
  margin-left:3vw;
  .bigTitle {
    font-size: 5vh;
    font-weight: 1000;
  }
  .profileImg {
    margin-left:20vh;
    border-radius: 100%;
    width: 15vw;
    height: auto;
  }
  .title {
    font-size: 4vh;
    font-weight: 1000;
    margin-top: 2vh;
  }
  .input {
    width: 30vw;
    height: 5vh;
    font-size: 2rem;
  }
`;

const Right = styled.div`
  margin-left: 5vw;
  .title {
    font-size: 4vh;
    font-weight: 1000;
    margin-top: 2vh;
  }
  textarea {
    width: 40vw;
    height: 30vh;
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
  justify-content: space-around;
  margin-bottom:3vh;
  button{
    width: 20vw;
    height: 8vh;
    font-size: 3vh;

  }
`
const ProfileSetting = () => {
  const navigate = useNavigate()
  return (
    <>
      <SettingWrapper>
        <Left>
          <p className="bigTitle">Profile Setting</p>
          <img
            className="profileImg"
            alt="프로필"
            src="https://lh3.googleusercontent.com/pnkhkWfVLiobS7VY8t67x4aiDuXKnOqD31rsmN-F9vbAFb8lhK_IMqi_V0k5awAkwgaH0225eC40NxMDkpIAE5_vQuaJ6DzuYQJ3pg=w278"
          />
          <p className="title">Username</p>
          <Input className="input" />
          <p className="title">이메일</p>
          <Input className="input" />
        </Left>
        <Right>
          <p className="title">Sumnail Image</p>
          <img
            className="sumnailImg"
            alt="썸네일"
            src="https://image.utoimage.com/preview/cp884422/2018/09/201809004714_500.jpg"
          />
          <p className="title">자기소개</p>
          <textarea className="textarea" />
        </Right>
      </SettingWrapper>
      
      <BTN>
        <Button className='save'  variant="contained" color="info" onClick={()=>{navigate(-1)}}>뒤로가기</Button>
        <Button className='save' variant="contained" color="success" onClick={()=>{navigate(-1)}}>저장하기</Button>
      </BTN>
    </>
  );
}

export default ProfileSetting