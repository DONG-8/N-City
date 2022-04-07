import { Modal,Input,Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from 'react-query';
import { putAuthApplyToken } from '../../store/apis/authentication';

interface Iprops{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const Wrapper = styled.div`
font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #3f3f8d  ;
  width: 600px;
  height: 400px;
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
    margin: 5px 0;
    font-weight: 600;
  }
  button{
    font-family: "Noto Sans KR", sans-serif;
    margin: 2vh 0;
    width: 15vw;
    height: 8vh;
    font-size: 2vh;
    font-weight: 500;
    color: black;
    overflow: hidden;
  }
  .gray{
    color: gray;
    font-size: 1.6vh;
    font-weight: 400;
  }
`


const CoinChargeModal:React.FC<Iprops> = ({open,setOpen}) => {
  const handleClose = () => setOpen(false);

  const applyToken = useMutation<any, Error>(
    "applyToken",
    async () => {
      return await putAuthApplyToken(Number(sessionStorage.getItem("userId")));
    },
    {
      onSuccess: (res) => {
        console.log("토큰신청  성공!",res);
        alert("성공적으로 신청되었습니다.")
        handleClose();
      },
      onError: (err: any) => {
        alert("신청오류")
        console.log("❌토큰신청 실패!",err);
      },
    }
  );

  const onClickApplyToken =() => {
    applyToken.mutate()
  }

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
            NCT 토큰 충전소
          </div>
        </Title>
        <Contents>
            <div className="content">
              <p> 토큰이 부족하세요?</p>
              <p> 운영자에게 부탁해 보세요ㅎ</p>
            </div>
            <Button color='inherit' variant="contained" onClick={onClickApplyToken}>
              NCT 토큰충전 신청하기
            </Button>
            <p className='gray'>저희 서비스내에서만 이용가능한 토큰이며 현금으로 교환은 불가합니다.</p>
        </Contents>
      </Wrapper>
    </Modal>
  );
}

export default CoinChargeModal
