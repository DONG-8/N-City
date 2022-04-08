import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: #ABABAB;
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
      <img alt='dk' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/0dd7fe29134303.55e466b153cc4.gif'/>
    </Wrapper>
  )
}

export default IsLoading