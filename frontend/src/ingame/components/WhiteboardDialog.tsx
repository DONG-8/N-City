import React from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useAppSelector, useAppDispatch } from '../hooks'
import { closeWhiteboardDialog } from '../stores/WhiteboardStore'

const Title = styled.div`
  width: 10vw;
  height: 8vh;
  margin: auto;
  margin-right: 33vw;
  font-size: 4rem;
  color: white;
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 90%;
  height: 90%;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
  margin-left: 10vw;
  margin-top: 5vh;
`
const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  background: #222639;
  border-radius: 16px;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const WhiteboardWrapper = styled.div`
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10vh;
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
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeWhiteboardDialog())}
        > 
        <Title>방명록</Title>
          <CloseIcon />
        </IconButton>
        {whiteboardUrl && (
          <WhiteboardWrapper>
            <iframe title="white board" src={whiteboardUrl} />
          </WhiteboardWrapper>
        )}
      </Wrapper>
    </Backdrop>
  )
}
