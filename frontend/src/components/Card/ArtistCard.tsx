import React from 'react'
import styled from 'styled-components'

interface Iprops{
  artist:{
    name:string,
    profileImg:string,
    verified:boolean,
    sumnailImg:string,
    descreption:string
  }
}

const Cards = styled.div`
  cursor: pointer;
  height: 450px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow:1px 3px 7px  ;
  margin: 30px ;
  &:hover{
    &{
      transform:scale(1.01) ;
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
    box-shadow:1px 3px 7px  ;
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
  return (<>
    <Cards>
        <SumnailImg>
          <img alt="pic" 
          src={artist.sumnailImg}/>
        </SumnailImg>
        <ProfileImg>
          <img alt="pic"
          src={artist.profileImg} />
        </ProfileImg>
        <CardBottom>
          <div className='name'>
            {artist.name}
            {artist.verified &&
            <img alt="verified" style={{"height":'1.5rem'}} src= "/essets/images/verified.png" />}
          </div>
          

          <div className='description'>
            {artist.descreption}
          </div>
        </CardBottom>
        
        
      </Cards>
    </>
  )
}

export default ArtistCard