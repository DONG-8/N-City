import { Modal,Input,Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface Iprops{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 40%;
  height: 50%;
  border-radius: 5px;
  border: none;
  .title{
    text-align: center;
    margin: auto;
    margin-top: -4vh;
    background-color:white;
    width: 15vw;
    height: 7vh;
    color:black;
    text-align: center;
    border: 1px solid black;
    h1{
      margin-top: 1vh;
      font-size: 2rem;
    }
  }
  .small{
    color: gray;
    text-align: center;
    margin-top: 1rem;
  }
`;
const Exit = styled.div`
  position: absolute;
  right:5px;
  top:5px;
  cursor: pointer;
`

const Contents= styled.div`
  display:flex;
`
const Imgs = styled.div`
  flex:4;
  display: flex;
  flex-direction: column;
  margin-left: 10% ;
  margin-top: 5vh;
  
  .arrow{
    height: 5vh;
    width: 3vw;
    margin:1.5vw;
    margin-left: 5rem;
  }
  .NPoint{
    margin-top: 1rem;
    margin-left: 3rem;
    height: 10vh;
    width: 6vw;
  }
  .SSFCoin{
    display: flex;
    margin-left: 1rem;
    .coin{
      font-size: 2.5rem;
      display: flex;
      .bold{
        font-weight: 1000;
        margin-left: 1vw;
        margin-right: 0.5vw;
      }
    }
  }
  
`
const Right = styled.div`
  flex: 6;
  .content{
    margin-bottom: 3rem;
  }
  h1{
    font-size: 2.5rem;
  }
  p{
    font-size: 1.4rem;
  }
  button{
    width: 15vw;
    height: 8vh;
    font-size: 1.2rem;
    font-weight: 1000;
    &:hover{

    }
  }
`;

const CoinChargeModal:React.FC<Iprops> = ({open,setOpen}) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Exit>
          <CloseIcon
            onClick={() => {
              setOpen(false);
            }}
          />
        </Exit>
        <div className="title">
          <h1>SSF Coin 충전소</h1>
        </div>
        <Contents>
          <Imgs>
            <img
              className="NPoint"
              src="essets/images/NPoint.png"
              alt="money"
            />
            <img
              className="arrow"
              src="essets/images/arrow-down.png"
              alt="arrow"
            />
            <div className='SSFCoin'>
              
              <div className='coin'><div className='bold'>SSF</div> Coin</div>
            </div>
          </Imgs>
          <Right>
            <h1>싸피 코인 교환</h1>
            <div className="content">
              <p> 싸피코인을 만들어</p>
              <p> NFT 토큰을 구입하세요.</p>
            </div>
            <Button color="info" variant="contained">
              {" "}
              싸피 코인으로 교환하기
            </Button>
          </Right>
        </Contents>
        <div className='small'>코인으로 변경된 후에도 포인트로 원복 가능합니다.</div>
      </Wrapper>
    </Modal>
  );
}

export default CoinChargeModal