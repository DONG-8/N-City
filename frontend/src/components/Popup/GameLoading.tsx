import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: #ABABAB;
  margin: auto;
  border-radius: 10px;
  display: flex;
  img{
    width: 15vw;
    height: 15vw;
    margin: auto;
    margin-bottom: 50px;
  }
`
const GameLoading = () => {
  return (
    <Wrapper>
      <img alt='dk' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/0dd7fe29134303.55e466b153cc4.gif'/>
    </Wrapper>
  )
}

export default GameLoading