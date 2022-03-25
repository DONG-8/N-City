import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ItemCard2 from '../../components/Card/ItemCard2'
import ArtCarousel from './ArtCarousel'
import { items as itm } from './items'
import { artists as art } from './items'


const SearchTitle = styled.div`
  display: flex;
  .color{
    color: teal;
  }
  margin-left: 10vw;
  margin-top: 5vh;
`
const NoResult = styled.div`
  margin-left: 5vw;
  margin-top: 5vh;
`
const ItemResults = styled.div`
  margin-left: 10vh;
  margin-right: 5vh;
  
  .items{
    display: flex;
    flex-wrap: wrap;
    &:last-child {
      margin-right: auto;
  }
  }
  h1{
    margin-left: 5vw;
    margin-top: 5vh;
  }
`


const SearchPage = () => {
  const [data,setData] = useState(useParams().data)
  const [items,setItems] = useState(itm)
  const [artists,setArtists] = useState(art)
  useEffect(()=>{
    // item api 요청으로 불러오기 => data들어가는 값 찾기
    // artist api 요청으로 불러오기
  },[])
  return (
    <>
      <SearchTitle>
        <h1><span className='color'>{data}</span>에 대한 검색 결과</h1>
      </SearchTitle>
      {items.length ===0 && artists.length===0 && 
      <NoResult>
        <h1>검색 결과가 없습니다.</h1>
      </NoResult>
      }
      {artists.length >0 && 
      <ItemResults>
        <h1>Artists</h1> 
        <div className='items'>
          <ArtCarousel artists={artists} />
        </div>
      </ItemResults>
      }

      {items.length >0 && 
      <ItemResults>
        <h1>items</h1> 
        <div className='items'>
          {items.map((item,idx)=><ItemCard2 key={idx} item={item}/>)}
        </div>
      </ItemResults>
      }



    </>
  )
}

export default SearchPage