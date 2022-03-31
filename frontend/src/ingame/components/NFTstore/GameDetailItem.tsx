import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useQuery,useMutation } from 'react-query';
import styled from 'styled-components'
import { delProductLike, postProductLike } from '../../../store/apis/favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface Iprops{
  setMode :React.Dispatch<React.SetStateAction<string>>, 
};
interface Istate{
  item :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
    productFavoriteUser:{
      authId: Number,
      userAddress: string,
      userDescription: string,
      userEmail: string,
      userEmailConfirm: boolean,
      userId: number,
      userImgUrl: string,
      userNick: string,
      userRole: string,
    }[]
  },
}

const Wrapper = styled.div`
  width: 70vw;
  height: 70vh;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 10vh;
`

const Box = styled.div`
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  background-color: #F7F8FA ;
  margin-left: 3vw;
  border-radius: 30px;
  display: flex;
  margin-top: 5vh;
  .top{
    height: 50vh;
    display: flex;
    overflow-x: hidden;
    overflow-y: scroll;
      &::-webkit-scrollbar { //스크롤바 🎨
        visibility: hidden;
        width: 7px;
      }
      &:hover {
        &::-webkit-scrollbar {
          visibility: visible;
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #272793;
          border-radius: 10px;
          background-clip: padding-box;
          border: 1px solid transparent;
        }
      }
  }
  .top-left{
    width: 30vw;
    .title{
      font-size: 2.5rem;
      font-weight: 1000;
      margin-top: 3vh;
      margin-left: 2vw;
    }
    .content{
      margin-top: 3vh;
      margin-left: 2vw;
    }
  }
  .img{
    height: 45vh;
    width: 45vh;
    margin-top: 2vh;
    margin-right: 1vw;
    border-radius: 30px;
    border:1px solid #E0DEDE ;
  }
  .bot{
    display: flex;
    height: 20vh;
    .left{
      flex: 1;
      border-top: 0.5px solid #E0DEDE;
      button{
        border-radius:15px;
        background-color: #F7F8FA ;
        color: black;
      }
      }
    }
  .right{
    flex: 1;
    border-top: 0.5px solid #E0DEDE;
    border-left: 0.5px solid #E0DEDE;
    button{
      border-radius:15px;
      background-color: #272793;
    }
  }
`
const Left = styled.div`
  

`
const Right = styled.div`
  

`



const GameDetailItem:React.FC<Iprops> = ({setMode}) => {
    const [item,setItem] = useState<Istate['item']>(JSON.parse(localStorage.getItem("item")||""))
    const [MyAddress,setMyAddress] = useState(localStorage.getItem('userId'))
    const [likes,setLikes] = useState(item.productFavoriteUser.length)
    const [liked,setLiked] = useState(false) // 내가 좋아요 했나
    useEffect(()=>{
      var tmp = false
      item.productFavoriteUser.map((user)=>{
        if (user.userId === Number(MyAddress) ){tmp = true}
      })
      setLiked(tmp)
    },[])
    const LikeIt = useMutation<any,Error>( // 좋아요 api
    'postProductLike',
    async()=>{ return (
      await ( postProductLike(Number(item.productId)))
      )
    },
    {onSuccess: (res)=>console.log(res),
      onError:(err)=>console.log(err)}
  )
  const cancelLikeIt = useMutation<any,Error>( //좋아요 취소 api
    'delProductLike',
    async()=>{ return (await ( delProductLike(Number(item.productId))))},
    {onSuccess: (res)=>console.log(res),
    onError:(err)=>console.log(err)}
  )
  const Like =()=>{ //좋아요 버튼 
    setLikes(likes+1)
    LikeIt.mutate()
  }
  const cancelLike  =()=>{ // 좋취 버튼
    setLikes(likes-1)
    cancelLikeIt.mutate()
  }

    return (
      <Wrapper>
        {item !== undefined &&<>
          <div className='title'>{item.productTitle}</div>
          <Box>
            <Left>
               <img className='img' alt='작품' src={item.productThumbnailUrl as any}/>
            </Left>
            <Right>
              <div className='content'>
                <div>productCode : {item.productCode}</div>
                <div>좋아요 : {item.productFavorite}</div>
                <div>등록일자:{item.productRegDt}</div>
                <div>productId:{item.productId}</div> 
                <div className='like'>
                  <div onClick={()=>{setLiked(!liked)}} className='icon'>
                    {liked?
                    <FavoriteIcon onClick={()=>{cancelLike()}} color='error'/> :
                    <FavoriteBorderIcon onClick={()=>{Like()}} color='error'/>}
                  </div> 
                    <p>{likes}</p>
                </div>
              </div>
              <div className='bot'>
                <div className='left'>
                  <div>직전 거래가 : </div>
                  <div>최고 거래가 : </div>
                  <Button variant="contained">제안하기</Button>
                </div>
                <div className='right'>
                  <div>판매가 : {item.productPrice} </div>
                  <div>판매 종료 : </div>
                  <Button variant="contained" >구매하기</Button>
                </div>
              </div>
            </Right>
                
          </Box>
          </>}
      </Wrapper>
    );
  }
  export default GameDetailItem