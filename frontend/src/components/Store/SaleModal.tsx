import { Modal,Input,Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  width: 50%;
  height: 60%;
  border-radius: 5px;
  .title {
    text-align: center;
    font-size:2.5vh;
  }
`;
  const Session1 = styled.div`
    .choiceBox {
      width: 35vw;
      height: 30vh;
      margin: auto;
      display: flex;
      align-items: center;
      .choice1 {
        flex: 5;
        cursor: pointer;
        font-size: 2rem;
        text-align: center;
        background-color: #FFEFEF;
        font-weight: 1000;
        &:hover {
          background-color: #FECDBB;
          transition: 0.1s;
        }
      }
      .choice2 {
        /* border: 1px solid gray; */
        flex: 5;
        cursor: pointer;
        font-size: 2rem;
        text-align: center;
        background-color: #FFEFEF;
        font-weight: 1000;
        &:hover {
          background-color: #FECDBB;
          transition: 0.1s;
        }
      }
    }
    .endChoice{
      align-items: center;
        background-color: #FECDBB;
        font-weight: 1000;
        font-size: 1.5rem;
        width: 35vw;
        height: 7vh;
        margin: auto;  
        text-align: center;
        p{
          padding-top:1.2rem 
        }
      }
    #choiced{
      display: none;
      transition: all 0.3s;
    }
    #endChoice{
      display: none;
      transition: all 0.3s;  
    }
  `;
const Session2 = styled.div`
  margin:auto;
  margin-top:10vh;
  text-align: center;
  
  .price{
    font-size:2rem;
    font-weight: 1000;
    input{
      font-size:2rem;
      width: 10rem;
      text-align:right;
    }
    img{
      position: absolute;
      height: 3rem;
      
    }
  }
  .back{
    width:3vw;
    height:7vh;
    margin-top: 12vh;
    font-weight: 1000;
    font-size:2rem;
    margin-right:5rem;
  }
  .sell{
    width:50%;
    height:7vh;
    margin-top: 12vh;
    font-weight: 1000;
    font-size:2rem;
    background-color:#FEAD9D ;
    &:hover{
      background-color:#FB8973 ;
    }
  }
`
const Exit = styled.div`
  position: absolute;
  right:5px;
  top:5px;
  cursor: pointer;
`
const SaleModal:React.FC<Iprops> = ({open,setOpen}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [session1,setSession1] = useState("")
  const [value,setValue]  = useState(0)

  useEffect(()=>{
    setSession1("")
  },[open])
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <div className="title">
          <h1>판매등록</h1>
        </div>
        <Exit>
          <CloseIcon onClick={()=>{handleClose()}}/>
        </Exit>
        <Session1>
          <div id={session1 && 'choiced'}  className="choiceBox">
            <div className='choice1'>
              <p onClick={()=>setSession1("Fix")}>즉시 판매</p>
            </div>
            <div className='choice2'>
              <p onClick={()=>setSession1("Auction")}>경매로 올리기</p>
            </div>
          </div>
            <div id={session1 ? undefined:"endChoice"} className='endChoice'>
              {session1==="Fix" && <p>즉시 판매</p>}
              {session1==="Auction" && <p>경매로 올리기</p>}
            </div>
        </Session1>
        {session1 ==="Fix" &&
        <Session2>
          <div className='price'>
            희망 가격 : <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setValue(Number(e.target.value))
              console.log(value)
            }}/> <img alt="ether" src='essets/images/ethereum.png'/>
          </div>
          <Button onClick={()=>setSession1("")} className='back' variant="contained" color='inherit'><ArrowBackIcon/></Button>
          <Button className='sell' variant="contained" color='error' >판매 개시</Button>
        </Session2>
        }
        {session1 ==="Auction" &&
        <Session2>
          <div className='price'>
            시작가격 : <Input/> <img alt="ether" src='essets/images/ethereum.png'/>
          </div>
          <Button onClick={()=>setSession1("")} className='back' variant="contained" color='inherit'><ArrowBackIcon/></Button>
          <Button  className='sell' variant="contained" color='primary' >경매 올리기</Button>
        </Session2>
        }
      </Wrapper>
    </Modal>
  );
}

export default SaleModal