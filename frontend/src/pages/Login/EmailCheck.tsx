import React from 'react'
import styled from 'styled-components'






const Inner =styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`


const EmailCheck = () => {
  const auto_close = ()=>{
    setTimeout('closed()',5000);
  }
  const closed = ()=>{
    window.close();
  }
  return (
    <Inner className="inner" >
        <h1>NCity 이메일 인증이 완료되었습니다.</h1>
        <button onClick = {()=>{closed()}}>창 닫기</button>
    </Inner>
  )
}

export default EmailCheck