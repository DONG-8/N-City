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
  background-color: #3f3f8d  ;
  width: 40%;
  height: 50vh;
  border-radius: 5px;
  border: none;
  display: flex;
  flex-direction: column;
  color: white;
  
`;
const Exit = styled.div`
  position: absolute;
  right:20px;
  top:20px;
  cursor: pointer;
`
const Title = styled.div`
  flex: 2;
  .title{
    font-size: 4vh;
    height: 4vh;
    text-align: center;
    margin-top: 2vh;
  }
`

const Contents= styled.div`
  flex:8;
  color: black;
  background-color: white;
  text-align: center;
  height: 34.3vh;
  border-radius: 0 0 10px 10px;
  .content{
    margin-top: 4vh;
  }
  p{
    font-size: 2.5vh;
    font-weight: 700;
  }
  button{
    margin-top: 2vh;
    width: 15vw;
    height: 8vh;
    font-size: 2vh;
    font-weight: 1000;
    color: black;
  }
  .gray{
    color: gray;
    font-size: 1.5vh;
    font-weight: 500;
  }
`


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
          <CloseIcon fontSize='small' onClick={() => { setOpen(false);}}/>
        </Exit>
        <Title>
          <div className="title">
            NCT 코인 충전소
          </div>
        </Title>
        <Contents>
            <div className="content">
              <p> N-city 테스트 서버를 이용하기 위해</p>
              <p> NCT 코인 발급 받으세요.</p>
            </div>
            <Button color='inherit' variant="contained">
              NCT 코인으로 교환하기
            </Button>
            <p className='gray'>테스트용 코인이며 현금으로 교환은 불가합니다.</p>
        </Contents>
      </Wrapper>
    </Modal>
  );
}

export default CoinChargeModal
