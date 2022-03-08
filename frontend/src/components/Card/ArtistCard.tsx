import React from 'react'
import styled from 'styled-components'

const verifiedIMG = ()=>{
  return(
  <img alt='verified' style={{"height":'1.5rem'}}
  src='https://o.remove.bg/downloads/d89e3a9c-382a-49c9-baad-1df8ca8934e9/verified-removebg-preview.png'/>)
}


const Cards = styled.div`
  cursor: pointer;
  height: 450px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow:1px 3px 7px  ;
  margin: 30px ;
  .sumnail_image{
    img{
    width:500px;
    height: 250px ;
    object-fit: cover;    
    border-radius: 10px 10px 0 0 ;
    }
  }
  .profile_img{
    margin-left: 215px ;
    margin-top:-40px ;
    img{
    height:70px;
    width:70px;
    border-radius:100%;
    box-shadow:1px 3px 7px  ;
    }
  }
  .card_bottom{
    text-align:center ;
    .title{
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
  }
  &:hover{
    &{
      transform:scale(1.01) ;
    }
  }
`

const ArtistCard = () => {
  return (<>
    <Cards>
        <div className='sumnail_image'>
          <img alt="pic" 
          src='https://lh3.googleusercontent.com/-DTjHlPuR3xIcAKtczuKcknn5NzjKeUk9mh1VB0a01-Vzcu2Xe6DKeDvfNbdx2aBJMv4in0DxJrcnGdiqe-1UVmjzzEowi43TTFJ=w307'/>
        </div>
        <div className='profile_img'>
          <img alt="pic"
          src='https://lh3.googleusercontent.com/rPB_SZcWuxqlK5M6LpQdF_-4gm3ucQ4xuS7AMjgZJk1kseF2d20Q1GTsXPQs_aOyu8iyDpwKowjw1tw1XfyJbna5oeOSJz1n3LAEQZE=w352' />
        </div>
        <div className='card_bottom'>
          <div className='title'>
            Happy Club 
            {verifiedIMG()}
          </div>
          <div className='enterprise'>
          </div>

          <div className='description'>
            Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe.
          </div>
        </div>
        
        
      </Cards>
    </>
  )
}

export default ArtistCard