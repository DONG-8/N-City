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
    height: 13vw;
    top: 3vh;
    left: 12vw;
  }
  h1{
    margin: auto;
    margin-top: 30vh;
    color: white;
    font-size: 4vh;
  }
`
const GameLoading = () => {
  return (
    <Wrapper>
      <h1>마이룸으로 들어가는 중..</h1>
      <img alt='dk' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/0dd7fe29134303.55e466b153cc4.gif'/>
    </Wrapper>
  )
}

export default GameLoading