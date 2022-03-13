import { Input, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const SettingWrapper = styled.div`
  display: flex;
`
const Left = styled.div`
height: 150vh;
  .bigTitle{
    font-size: 7vh;
    font-weight: 1000;
    margin: 3vw;
  }
  .title{
    font-size: 4vh;
    font-weight: 1000;
    margin-top: 3vh;
    margin-left: 3vw;
  }
  .input{
    width: 40vw; 
    height: 5vh;
    margin-left: 3vw;
    font-size: 2rem;
}
  }
  textarea {
    width: 40vw;
    height: 50vh;
    margin-left: 3vw;
    resize: none;
    font-size: 2rem;
    &:focus {
    border-color: teal;
    outline: none;
    box-shadow: 0 0 4px teal;  
    transition: 0.2s ease-in;
  }
  `;

const Right = styled.div`
  .bigTitle {
    font-size: 5vh;
    font-weight: 1000;
    margin-top: 10vh;
    margin-left: 10vw;
  }
  .profileImg{
    border-radius:100%;
    width: 20vw;
    height: auto;
    margin-left:10vw;
  }
  .sumnailImg{
    width: 40vw;
    height: 30vh;
    overflow: hidden;
    width: 100%;
    object-fit:cover;
    overflow: hidden;
    margin-left:10vw;
    
  }
`;
const ProfileSetting = () => {
  return (
    <SettingWrapper>
      <Left>
        <p className="bigTitle">Profile Setting</p>
        <p className="title">Username</p>
        <Input className="input" />
        <p className="title">자기소개</p>
        <textarea className="textarea" />
        <p className="title">이메일</p>
        <Input className="input" />
      </Left>
      <Right>
        <p className="bigTitle">Profile Image</p>
        <img className='profileImg' alt="프로필" src="https://lh3.googleusercontent.com/pnkhkWfVLiobS7VY8t67x4aiDuXKnOqD31rsmN-F9vbAFb8lhK_IMqi_V0k5awAkwgaH0225eC40NxMDkpIAE5_vQuaJ6DzuYQJ3pg=w278" />
        <p className="bigTitle">Sumnail Image</p>
        <img className='sumnailImg' alt="썸네일" src="https://lh3.googleusercontent.com/WeO4dwtM7hY2HXw_FHpvhxZxWNX2mcKu2hHC7aDejgu36Wtrd1WoPshO4mOelkmgLEO4JcVy3JTDFwCVXGXh0v7NCScHdHB_b_Q0pQ=w600" />
      </Right>
    </SettingWrapper>
  );
}

export default ProfileSetting