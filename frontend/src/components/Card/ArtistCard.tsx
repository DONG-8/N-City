import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import artistpng from './images/artist.png'
import enterpng from './images/enterprise.png'
import infpng from './images/influencer.png'

interface Iprops{
  user:{
    "authId": Number,
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
  text-align: center;
  .name {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .verified {
    height: 2rem;
  }
  .description {
    margin: auto;
    margin-top: 1rem;
    width: 90%;
  }
`;
const Badge = styled.div`
  img{
    position: absolute;
    /* height:3vh; */
  }
`
const ArtistCard:React.FC<Iprops> = ({user}) => {
  const navigate = useNavigate()
  const goMyPage = ()=>{
    navigate(`/mypage/${user.userId}`)
    sessionStorage.setItem("item",JSON.stringify(user))
  }
  return (<>
    <Cards onClick={()=>{goMyPage()}}>
        <SumnailImg>
          {user.userImgUrl ?
          <img alt="pic" src={user.userImgUrl as any}/>:
          <img alt="pic" src="https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_960_720.jpg"/>
          }
        </SumnailImg>
        <ProfileImg>
          {user.userImgUrl ?
          <img alt="pic" src={user.userImgUrl as any} />:
          <img alt="pic" src="https://search.pstatic.net/sunny/?src=http%3A%2F%2Ftx01-az3199.ktics.co.kr%2F13301240351_t_article.png&type=sc960_832"/>
        }
        </ProfileImg>
        <CardBottom>
          <div className='name'>
            <Badge>
              <span>{user.userNick} </span>
              {user.userRole==='ROLE_ENTERPRISE' && <img alt='badge' title='enterprise' src="essets/marks/enterprise-mark.png"/>}
              {user.userRole==='ROLE_ARTIST' && <img alt='badge' title='artist' src="essets/marks/artist-mark.png"/>}
              {user.userRole==='ROLE_INFLUENCER' && <img alt='badge' title='influencer' src="essets/marks/influencer-mark.png"/>}
            </Badge>
          </div>
          <div className='description'>
            {user.userDescription ? 
            <p>{user.userDescription}</p>:
            <p>{user.userNick}의 페이지 입니다</p>
            }
          </div>
        </CardBottom>
        
        
      </Cards>
    </>
  )
}

export default ArtistCard