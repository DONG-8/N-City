import { Modal,Input,Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from "react-query";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postRegisterAuction, postRegisterPurchase } from "../../store/apis/deal";
import {
  NFTcreatorAddress,
  NFTcreatorContract,
  SaleFactoryAddress,
  SaleFactoryContract,
  SSFTokenAddress,
  SSFTokenContract,
} from "../../web3Config";
import etherimg from './ethereum.png'
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
    color: #35357a;
    text-align: center;
    font-size:2.5vh;
    width: 80%;
    border-bottom: 2px solid #35357a;
    margin: auto;
  }
`;
  const Session1 = styled.div`
    .choiceBox {
      width: 35vw;
      height: 20vh;
      margin: auto;
      display: flex;
      align-items: center;
      margin-top: 10vh;
      .choice1 {
        flex: 5;
        cursor: pointer;
        font-size: 2rem;
        text-align: center;
        background-color: #35357a;
        font-weight: 1000;
        color: white;
        border-radius: 10px 0 0 10px;
        &:hover {
          background-color: #3f3f8d;
          transition: 0.3s;
          color: white;
        }
      }
      
      .choice2 {
        flex: 5;
        border-radius: 0 10px 10px 0;

        cursor: pointer;
        font-size: 2rem;
        color: white;

        text-align: center;
        background-color: #35357a;
        font-weight: 1000;
        &:hover {
          background-color: #3f3f8d;
          color: white;
          transition: 0.3s;
        }
      }
    }
    .endChoice{
      align-items: center;
      background-color: #35357a;
      color: white;
      border-radius: 5px;

        font-size: 1.5rem;
        width: 35vw;
        height: 7vh;
        margin: auto;  
        text-align: center;
        p{
          text-align: center;
          padding-top: 2vh;
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
  .box{
    margin: auto;
    margin-top:5vh;
    background-color: #F7F8FA ;
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    border-radius: 10px;
    width: 35vw;
    height: 30vh;
    .inputs{
      display:flex
    }
    .title{
      align-items: center;
      background-color: #35357a;
      color: white;
      border-radius: 10px 10px 0 0;
      width: 100%;
        font-size: 1.5rem;
        height: 7vh;
        margin: auto;  
        text-align: center;
        p{
          text-align: center;
          padding-top: 2vh;
        }
    }
  }
  .tmp{
    height: 1vh;
  }
  .intro{
    margin-left:3vw;
    font-size: 2vh;
  }
  .price{
    margin-left:3vw;
    font-size:2.2vh;
    margin-top: 5vh;
    input{
      font-size:2vh;
      width: 5vw;
      text-align:right;
    }
    img{
      margin-left:0.5vw;
      position: absolute;
      height: 2rem;   
    }
  }
  .back{
    width:3vw;
    font-weight: 1000;
    font-size:2rem;
  }
  .sell{
    margin-left: 1vw;
    width:61vh;
    font-size:1.5rem;
    background-color:#3f3f8d  ;
  }
  .buttons{
    height: 7vh;
    display: flex;
    margin-top: 2vh;
    margin-left: 8vw;
  }
  
`
const Exit = styled.div`
  position: absolute;
  right:5px;
  top:5px;
  cursor: pointer;
`
interface Iprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    productId: number;
    productTitle: string;
    productPrice: number;
    productThumbnailUrl: string;
    productFavorite: number;
    productRegDt: Object;
    productCode: number;
    productState: number;
    productFavoriteCount: number;
    favorite: boolean;
    tokenId?: number;
  };
}
const SaleModal:React.FC<Iprops> = ({open,setOpen,item}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [session1,setSession1] = useState("")
  const [value,setValue]  = useState(0)
  const [period, setPeriod] = useState(0);
  const { ethereum } = window;

  useEffect(()=>{
    setSession1("")
  },[open])
  const resistSell = useMutation<any, Error>(
    "resistSell",
    async () => {
      return await postRegisterPurchase(value, item.productId);
    },
    {
      onSuccess: async (res) => {
        console.log("구매등록성공", res);
        window.location.reload();
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  );
  const resistAuction = useMutation<any, Error>(
    "resistAuction",
    async () => {
      return await postRegisterAuction(value, item.productId, period);
    },
    {
      onSuccess: async (res) => {
        console.log("경매등록성공", res);
        window.location.reload();
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  );
  const onClickSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) {
      alert("지갑을 연결해주세요");
      return;
    } else if (value === 0) {
      alert("구매시작가를 입력해주세요");
      return;
    }
    try {
      // 토큰 권한 승인시키기
      await NFTcreatorContract.methods
      .setApprovalForAll(SaleFactoryAddress, true)
      .send({ from: accounts[0] });

      // 판매등록
      const date = new Date();
      const response = await SaleFactoryContract.methods
        .createSale(
          item.tokenId,
          value,
          value,
          Math.round(date.getTime() / 1000),
          Math.round(date.getTime() / 1000) + 999999999999,
          SSFTokenAddress,
          NFTcreatorAddress
        )
        .send({ from: accounts[0] });
      console.log(response);
      console.log(item.productId, value)
      await resistSell.mutate();
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };
  const onClickAuction = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) {
      alert("지갑을 연결해주세요");
      return;
    } else if (value === 0) {
      alert("경매시작가를 입력해주세요");
      return;
    } else if (period === 0) {
      alert("경매기간을 입력해주세요");
      return;
    }
    try {
      // 토큰 권한 승인시키기
      await NFTcreatorContract.methods
      .setApprovalForAll(SaleFactoryAddress, true)
      .send({ from: accounts[0] });
      
      //경매등록
      const date = new Date();
      const response = await SaleFactoryContract.methods
        .createSale(
          item.tokenId,
          20,
          999999999999,
          Math.round(date.getTime() / 1000),
          Math.round(date.getTime() / 1000 + (period * 60 * 60 * 24)),
          SSFTokenAddress,
          NFTcreatorAddress
        )
        .send({ from: accounts[0] });
      console.log(response);
      await resistAuction.mutate();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
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
            <div onClick={()=>setSession1("Fix")} className='choice1'>
              <p>즉시 판매</p>
            </div>
            <div onClick={()=>setSession1("Auction")} className='choice2'>
              <p>경매로 올리기</p>
            </div>
          </div>
        </Session1>
        {session1 ==="Fix" &&
        <Session2>
          <div className='box'>
            <div className='title'>
              <p> 즉시 판매</p>
            </div>
              <div className='tmp'></div>
              <p className='intro'> NFT 작품들을 즉시 판매할 수 있습니다</p>
              <p className='intro'> 희망 가격을 적어 판매를 시작하세요 </p>
            <div className='price'>
                희망 가격 : <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setValue(Number(e.target.value))
                console.log(value)
              }}/> <img alt="ether" src={etherimg}/>
            </div>
          </div>
          <div className='buttons'>
            <Button onClick={()=>setSession1("")} className='back' variant="contained" color='inherit'><ArrowBackIcon/></Button>
            <Button className='sell' onClick={onClickSell} variant="contained" >판매 시작</Button>
          </div>
        </Session2>
        }
        {session1 ==="Auction" &&
        <Session2>
          <div className='box'>
            <div className='title'>
              <p> 경매등록</p>
            </div>
            <div className='tmp'/>
            <p className='intro'> NFT 작품들을 경매에 등록할 수 있습니다</p>
            <p className='intro'> 희망 가격을 적어 판매를 시작하세요 </p>
            <div className='inputs'>
            <div className='price'>
              시작가격 : <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setValue(Number(e.target.value))
                console.log(value)
              }}/> <img alt="ether" src={etherimg}/>
            </div>
            <div className="price">경매기간 :{" "}<Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPeriod(Number(e.target.value)); console.log(period);}}/>일
            </div>
            </div>
          </div>
            <div className='buttons'>
              <Button onClick={()=>setSession1("")} className='back' variant="contained" color='inherit'><ArrowBackIcon/></Button>
              <Button className='sell' onClick={onClickAuction} variant="contained" color='primary' >경매 시작</Button>
            </div>
        </Session2>
        }
      </Wrapper>
    </Modal>
  );
}

export default SaleModal
