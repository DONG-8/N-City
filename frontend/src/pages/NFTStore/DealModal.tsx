import { Button, Input, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery } from 'react-query';
import { getPastHistory, postAuctionBid, postPurchase } from '../../store/apis/deal';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 60vw;
  height: 60vh;
  border-radius: 10px;
  .title {
    color: #35357a;
    text-align: center;
    font-size:5vh;
    width: 80%;
    border-bottom: 2px solid #35357a;
    margin: auto;
    margin-top: 2vh;
  }
`;
const Exit = styled.div`
  position: absolute;
  right:20px;
  top:20px;
  cursor: pointer;
`
const Content = styled.div`
  margin-left: 5vw;
  margin-top: 3vh;
  .price{
    font-size: 3vh;
  }
  #true{
    background-color: #def3bf;
  }
  #false{
    background-color: #f8ced5;
  }
`
interface Iprops{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  status:string,
  item:{
    productId: Number,
    userId: Number,
    productTitle: string,
    productDesc: string,
    productCode: Number,
    productXCoordinate: Number,
    productYCoordinate: Number,
    productView: Boolean,
    productState: Number,
    productPrice: Number,
    productRegDt: string,
    productFileUrl: string,
    productThumbnailUrl: string,
    favoriteCount: Number
  }, // 작가, 작가 정보, 거래 관련.. 
}

interface Istate {
  item :{
    "productId": number,
      "userId": number,
      "tokenId": number,
      "productTitle": string,
      "productDesc": string,
      "productCode": number,
      "productXCoordinate": number,
      "productYCoordinate": number,
      "productView": boolean,
      "productState": number,
      "productPrice": number,
      "productRegDt": string,
      "productFileUrl": string,
      "productThumbnailUrl": string,
      "productAuctionEndTime": string,
      "favoriteCount": number
  }
}

const DealModal:React.FC<Iprops> = ({item,open,setOpen,status}) => {
  const handleClose = () => setOpen(false);
  const [localitem,setLocalitem] = useState<Istate['item']>(JSON.parse(localStorage.getItem("item")||""))
  const [productId,setProductId] = useState(Number(localitem.productId))
  const [priceValue,setPriceValue] = useState('')
  const [check,setCheck] = useState('')
  const [price,setPrice] = useState(Number(item.productPrice))
  const [afterBuy,setAfterBuy] = useState(false)
  const { isLoading:ILA, data:historys } = useQuery<any>( // 추가 // 추천 데이터 
  "getPastHistory",
  async () => {return (await (getPastHistory(productId)))
  },
  { onError: (err: any) => {console.log(err, "히스토리 오류")}}
  );
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(e.target.value)
  } // 인풋창 수정
  const postgetBid = useMutation<any,Error>(
    "postAuctionBid",
    async () => {return (await (postAuctionBid(Number(priceValue),Number(item.productId)) ))},
    { onSuccess:(res)=>{ setAfterBuy(true); setPrice(Number(priceValue))},
      onError: (err: any) => {console.log(err, "경매 오류")},
  });
  const postgetBuy = useMutation<any,Error>(
    "postPurchase",
    async () => {return (await (postPurchase(Number(item.productId)) ))},
    { onSuccess:(res)=>{ },
      onError: (err: any) => {},
  });

  const isOkay = ()=>{
    if(Number(priceValue)-price>=1){setCheck('true')} 
    else if (priceValue===''){setCheck('null')}
    else {setCheck('false')}
  }

  useEffect(()=>{
    setAfterBuy(false)
    isOkay()
  },[priceValue])

  const getBid = ()=>{
    postgetBid.mutate()
    setAfterBuy(true) // 나중에 위에서 처리 예정
    setPrice(Number(priceValue))
  }
  const getBuy = ()=>{
    postgetBuy.mutate()
    setAfterBuy(true) // 나중에 위에서 처리 예정
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <div className='title'>{status}</div>
        <Exit>
          <CloseIcon fontSize='small' onClick={() => { setOpen(false);}}/>
        </Exit>
        {status==='bid' &&
          <Content>
            <div className='price'> 현재 가격:{price}</div>
            <p>현재 가격에 최소 1NCT 이상의 입찰가를 입력하세요</p>
            <Input id={check==='true'?'true':(check==='false'?"false":"null")}
             value={priceValue} onChange={handleChange} />
            {check==='true' && 
            <div>
              <Button onClick={()=>{getBid()}}>입찰하기</Button>
            </div>}
            {afterBuy && 
              <h3>{item.productTitle}작품을 {priceValue}NCT에 입찰 성공했습니다</h3>
            }
          </Content>
        }
        {status==='sell' &&
          <Content>
            즉시 구매가:{price}NCT
            {!afterBuy ?
              <div>
                <Button onClick={()=>{getBuy()}}>입찰하기</Button>
              </div>:
              <h3>{item.productTitle}작품을 {price} NCT에 입찰 성공했습니다</h3>
            }
          </Content>
        }
      </Wrapper>
    </Modal>
  )
}

export default DealModal