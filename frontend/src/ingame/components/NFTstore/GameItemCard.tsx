import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import styled from 'styled-components'
import ether from './ethereum.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMutation } from 'react-query';
import { delProductLike,postProductLike } from '../../../store/apis/favorite';

const Wrapper = styled.div`
  #character{
    border:3px solid #a9a9f2 ;
  }
`

const CardWrapper = styled.div`
  cursor: pointer;
  height: 240px;
  width: 210px;
  background-color: #F7F8FA ;
  border-radius: 5px;
  border:0.5px solid #E9E4E4;
  margin: 25px ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  &:hover{
    transform: translateY(-5px);
    .buy{
      visibility: visible ;
      transition: 1s ;
    }
    .card_bottom{
      background-color: #f8ede9;
      transition: 0.1s ;
    }
  }
`
const Image = styled.div`
  img{
    width:210px;
    height:210px ;
    border-radius: 5px 5px 0 0 ;
    object-fit: cover;    
  }
`
// 5/7
const CardCenter = styled.div`
  display: flex;
  height: 30px;
  margin-top: -5px;
  border-radius: 0 0 5px 5px ;
  background-color  : #ececfa ;
`;

const DesLeft = styled.div`
  margin-left: 0.3rem;
  flex: 6;
`;

const DesRight = styled.div`
  flex: 4;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  margin-left: 1rem;
  .like{
    font-size: 1rem ;
    font-weight:600;
    display: flex;
    p{
      margin: 0;
      margin-top: 0.2rem;
      margin-left: 0.4rem;
    }
  }
  .icon{
  cursor: pointer;
  margin-top:0.2vh;
    
  &:hover{
    transform: scale(1.1);
  }
}
.dia{
    img{
      margin-left: 0.5rem;
      margin-top: 0.2rem;
    }
    margin-top: 0.3rem;
    font-size: 1rem ;
    font-weight:600;
    display: flex;
    div{
      margin: 0;
      margin-top: 0.2rem;
      margin-left: 0.4rem;
    }
  }
`
const Title = styled.div`
  font-size: 1rem;
  margin-left: 0.5rem;
  font-weight: 600;
  margin-top: 0.2rem;
`;
const DesCenter = styled.div`
`

interface Iprops{
  item :{
    productId?: Number,
    productTitle?: string,
    productPrice?: Number,
    productThumbnailUrl?: string,
    productFavorite?: Number,
    productRegDt?:Object,
    productCode?: Number,
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
  setMode :React.Dispatch<React.SetStateAction<string>>
}

const GameItemCard:React.FC<Iprops>= ({item,setMode}) => {
  const [liked,setLiked] = useState(false) // 내가 좋아요 했나
  const [MyAddress,setMyAddress] = useState(sessionStorage.getItem('userId'))
  const [category,setCategory] = useState('normal') 
  // const [category,setCategory] = useState('character') 
  //⭐ normal로 바꾸기
  useEffect(()=>{
    var tmp = false
    item.productFavoriteUser.map((user)=>{ 
      if (user.userId === Number(MyAddress) ){tmp = true}
    })
    setLiked(tmp)
    if (item.productCode ===7){setCategory('character')}
  },[])

  const navigate = useNavigate()
  const goDetailPage = ()=>{
    sessionStorage.setItem("item",JSON.stringify(item))
    setMode('detail')
  }
  const [likes,setLikes] = useState(item.productFavoriteUser.length)
  const LikeIt = useMutation<any, Error>( // 좋아요 api
    "postProductLike",
    async () => {
      return await postProductLike(Number(item.productId));
    },
    {
      onSuccess: (res) => console.log(res),
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
    }
  );
  const cancelLikeIt = useMutation<any, Error>( //좋아요 취소 api
    "delProductLike",
    async () => {
      return await delProductLike(Number(item.productId));
    },
    {
      onSuccess: (res) => console.log(res),
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      },
    }
  );
  const Like =()=>{ //좋아요 버튼 
    setLikes(likes+1)
    LikeIt.mutate()
  }
  const cancelLike  =()=>{ // 좋취 버튼
    setLikes(likes-1)
    cancelLikeIt.mutate()
  }
  const imageOnErrorHandler = ( // 사진이 오류날 시 기본 사진
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src ='data:image/png;base64,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';
  };
 
  return (
    <Wrapper>
      <CardWrapper id={category==='character'?'character':''} >
        <Image onClick={()=>{goDetailPage()}}>
          <img alt="pic" src={item.productThumbnailUrl} 
          onError={imageOnErrorHandler}/>
        </Image>
        <CardCenter >
          <DesLeft>
            <Title>
              {item.productTitle}
            </Title>
          </DesLeft>
          <DesRight>
            <div className='like'>
              <div onClick={()=>{setLiked(!liked)}} className='icon'>
                {liked?
                <FavoriteIcon onClick={()=>{cancelLike()}} color='error'/> :
                <FavoriteBorderIcon onClick={()=>{Like()}} color='error'/>}
              </div> 
                <p>{likes}</p>
            </div>
            <div className='dia' >
              <img alt="💎"  style={{"height":"1.2rem"}} src={ether}/>
               <div> {item.productPrice}</div>
            </div>
          </DesRight>
        </CardCenter>
      </CardWrapper>
    </Wrapper>
  )
}

export default GameItemCard