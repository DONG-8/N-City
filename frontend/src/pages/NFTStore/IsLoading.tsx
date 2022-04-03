import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: #d7ebfd;
  margin: auto;
  border-radius: 10px;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  img{
    width: 15vw;
    height: 15vw;
    margin: auto;
    margin-bottom: 0px;
  }
`
const IsLoading = () => {
  return (
    <Wrapper>
      {/* <img alt='dk' src='https://i.gifer.com/WUQ.gif'/> */}
      <img alt='dk' src='https://i.gifer.com/Xqg8.gif'/>
    </Wrapper>
  )
}

export default IsLoading