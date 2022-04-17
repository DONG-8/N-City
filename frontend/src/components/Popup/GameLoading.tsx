import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  position: absolute;
  width: 40vw;
  height: 45vh;
  top: 30vh;
  left: 30vw;
  background-color: #ABABAB;
  margin: auto;
  border-radius: 10px;
  display: flex;
  text-align: center;
  img{
    position: absolute;
    width: 15vw;
    height: 15vw;
    top: 11vh;
    left: 12vw;
  }
  h1{
    margin-left: 3vw;
    color: white;
    font-size: 4vh;
  }
`
const GameLoading = () => {
  return (
    <Wrapper>
      <img alt='dk' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/0dd7fe29134303.55e466b153cc4.gif'/>
      <h1>마이룸으로 들어가는 중..</h1>
    </Wrapper>
  )
}

export default GameLoading