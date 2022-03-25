import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface Iprops{
  artist:{
    "authId": Number,
    "followeeCnt": Number,
    "followerCnt": Number,
    "userAddress": String,
    "userDescription": String,
    "userEmail": String,
    "userEmailConfirm": Boolean,
    "userId": Number,
    "userImgUrl": String,
    "userNick": String,
    "userRole": String
  },
}

const Cards = styled.div`
  cursor: pointer;
  height: 450px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  margin: 5vh ;
  &:hover{
    &{
      transform:translateY(-5px) ;
    }
  }
`
const SumnailImg = styled.div`
  img{
    width:500px;
    height: 250px ;
    object-fit: cover;    
    border-radius: 10px 10px 0 0 ;
    }
`
const ProfileImg = styled.div`
    margin-left: 215px ;
    margin-top:-40px ;
    img{
    height:70px;
    width:70px;
    border-radius:100%;
    }
`
const CardBottom = styled.div`
  text-align:center ;
    .name{
      font-size:1.5rem;
      font-weight:1000 ;
    }
    .verified{
      height: 2rem;
    }
    .description{
      margin: auto ;
      margin-top:1rem ;
      width: 90% ;
    }
`

const ArtistCard:React.FC<Iprops> = ({artist}) => {
  const navigate = useNavigate()
  const goMyPage = ()=>{
    navigate('/mypage')
    localStorage.setItem("item",JSON.stringify(artist))
  }
  return (<>
    <Cards onClick={()=>{goMyPage()}}>
        <SumnailImg>
          <img alt="pic" 
          src={artist.userImgUrl as any}/>
        </SumnailImg>
        <ProfileImg>
          <img alt="pic"
          src={artist.userImgUrl as any} />
        </ProfileImg>
        <CardBottom>
          <div className='name'>
            {artist.userNick}
            {artist.userEmailConfirm &&
            <img alt="verified" style={{"height":'1.5rem'}} src= "/essets/images/verified.png" />}
          </div>
          

          <div className='description'>
            {artist.userDescription}
          </div>
        </CardBottom>
        
        
      </Cards>
    </>
  )
}

export default ArtistCard