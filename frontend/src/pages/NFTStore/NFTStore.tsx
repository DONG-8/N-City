import React from 'react'
import styled from 'styled-components'
import ArtistCard from '../../components/Card/ArtistCard'
import PictureCard from '../../components/Card/PictureCard'

const Title = styled.div`
  background-color: #F8D9CE ;
  margin-top: 4vh ;
  display:flex ;
  justify-content:space-around;
  p{
    margin-top: 4vh;
    font-weight: 1000 ;

  }
`
const FilterBar = styled.div`
  box-shadow:2px 2px 2px gray ;
  margin: auto;
  margin-top: -2vh;
  width: 70% ;
  display: flex;
  div{
    flex: 2.5;
    height: 5vh ;
    text-align:center ;
    p{
      font-size:2vh ;
      margin-top : 1vh;
      font-weight: 1000 ;
      
    }
  }
  .allPicture{
    background-color: #FECDBB;

  }
  .likePicture{
    background-color: #FEAF84;
    
  }
  .allArtist{
    background-color: #FECDBB;
  }
  .followArtist{
    background-color: #FEAD9D;
  }

`
const CategoryBar = styled.div`
  margin: auto;
  width: 70% ;
  display: flex;
  div{
    flex:auto;
  }
  p{
    font-size:2.5vh;
    font-weight:1000;
    cursor: pointer;
  }
`
const PictureCards = styled.div`
  margin:auto ;
  width: 90% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`
const ArtistCards = styled.div`
  margin:auto ;
  width: 90% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`
const NFTStore = () => {
  return (<>
    <Title>
      <h1>Store</h1>
      <div>
        <p>소지금 : 356,321💎</p> 
      </div>
    </Title>

    <FilterBar>
      <div className='allPicture'><p>전체작품</p></div>
      <div className='likePicture'><p>관심있는 작품</p></div>
      <div className='allArtist'><p>전체 작가</p></div>
      <div className='followArtist'><p>팔로우한 작가</p></div>
    </FilterBar>

    <CategoryBar>
      <div><p>TOP</p></div>
      <div><p>Art</p></div>
      <div><p>Music</p></div>
      <div><p>Photography</p></div>
      <div><p>Sports</p></div>
      <div><p>game</p></div>
    </CategoryBar>
    <PictureCards>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
      <PictureCard/>
    </PictureCards>
    {/* <ArtistCards>
      <ArtistCard/>
      <ArtistCard/>
      <ArtistCard/>
      <ArtistCard/>
    </ArtistCards> */}
    </>
  )
}

export default NFTStore
