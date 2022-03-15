import React from 'react'
import styled from 'styled-components'

interface IProps{
  imgsrc : string
}

const BackgroundWrapper = styled.div`
  position: absolute;
  top:0;
  z-index: -1;
  img{
    height: 50vh;
    width: 100vw;
    object-fit:fit;
    overflow: hidden;
  }
`

const Background:React.FC<IProps> = ({imgsrc}) => {
  return (
    <BackgroundWrapper>
      <img alt="배경" src={imgsrc}/>
    </BackgroundWrapper>
  )
}

export default Background