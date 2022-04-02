import React from 'react'
import styled from 'styled-components'
import imgsrc from './P0S4.gif'
const Wrapper = styled.div`
  width: 20vw;
  height: 22vh;
  img{
    width: 15vw;
  }
  display: flex;
`
const IsLoading = () => {
  return (
    <Wrapper>
      <img alt='dk' src='https://i.gifer.com/WUQ.gif'/>
    </Wrapper>
  )
}

export default IsLoading