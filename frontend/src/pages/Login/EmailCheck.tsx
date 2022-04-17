import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Wrapper =styled.div`
  height: 50vh;

`

const Inner =styled.div`
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  button{
    margin-top: 5vh;
  }
`


const EmailCheck = () => {
  const closed = ()=>{
     window.close();
  }
  return (
    <Wrapper>
      <Inner className="inner" >
          <h1>N-City 이메일 인증이 완료되었습니다.</h1>
          <h1>계속해서 프로필 수정을 완료해주세요.</h1>
          <Button onClick = {()=>{closed()}} variant='contained'>창 닫기</Button>
      </Inner>
    </Wrapper>
  )
}

export default EmailCheck