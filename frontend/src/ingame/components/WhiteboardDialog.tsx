import React from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeWhiteboardDialog } from '../stores/WhiteboardStore'

const Title = styled.div`
  width: 500px;
  height: 90px;
  margin: auto;
  font-size: 60px;
  color: #4f4f4f;
  font-weight: 500;
`

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1100px;
  height: 700px;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
  margin-left: 150px;
  margin-top: 50px;
`
const Wrapper = styled.div`
  width: 1000px;
  height: 600px;
  background: #bfc9fa;
  border-radius: 16px;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    flex: 1;
    margin: auto;
  }
  .x{
    position: fixed;
    top:70px;
    left:1150px
  }
`

const WhiteboardWrapper = styled.div`
  flex: 9;
  border-radius: 5px;
  overflow: hidden;
  /* margin-top: 10vh; */
  iframe {
    width: 100%;
    height: 100%;
  }
`

export default function WhiteboardDialog() {
  const whiteboardUrl = useAppSelector((state) => state.whiteboard.whiteboardUrl)
  const dispatch = useAppDispatch()

  return (
    <Backdrop>
      <Wrapper>
        <button
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeWhiteboardDialog())}
        > 
        <Title>낙서장</Title>
          <div className='x'>
            <CloseIcon />
          </div>
        </button>
        {whiteboardUrl && (
          <WhiteboardWrapper>
            <iframe title="white board" src={whiteboardUrl} />
          </WhiteboardWrapper>
        )}
      </Wrapper>
    </Backdrop>
  )
}
