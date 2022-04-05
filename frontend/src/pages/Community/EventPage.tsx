import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { events } from './events'

const Wrapper = styled.div`
  margin: auto;
  margin-bottom: 10vh;
  
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #35357a;
  border-radius: 0 0 10px 10px;
  color: white;
  width: 100%;
  height: 180px;
`
const Title = styled.h1`
  margin: 80px 0;
  font-size: 45px;
`
const Events = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`
const Event = styled.div`
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px 30px 10px 10px ;
  margin: auto;
  margin-top: 10vh;
  height: 46vh;
  width: 40%;
  cursor: pointer;
  &:hover{
    &{
      transform:translateY(-5px) ;
    }
  }
  img{
    border-radius: 30px 30px 0 0 ;
    width: 100%;
    height: 37vh;
    object-fit:fill;
  }
  .title{
    font-size: 2.2vh;
    font-weight: 600;
    margin: 1vh;

  }
  .date{
    font-size: 1.5vh;
    font-weight: 600;
    margin: 1vh;
    color:blue;
  }

`
const CategoryBar= styled.div`
  display: flex;
  div{
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-left: 2rem;
  }
`
interface Istate{
  event:{
    id:number,
    title:string,
    url:string,
    date:string,
    content:string
  }
}

const EventPage = () => {
  const navigate = useNavigate()
  const goDetailPage = (event:Istate['event'])=>{
    navigate(`/event/${event.id}`)
  }
  return (
    <div>
      <Wrapper>
        <Header>
          <Title>이벤트</Title>
        </Header>
        <CategoryBar>
          <div className=''> 최신순 </div>
          <div className=''> 진행중 </div>
        </CategoryBar>
        <Events>
          {events.map(event=>{ return(
            <Event key={event.id} onClick={()=>{goDetailPage(event)}}>
              <img alt="포스터" src ={event.url}/>
              <div className='date'>이벤트 기간: {event.date}</div> 
              <div className='title'>{event.title}</div> 
            </Event>
          )})}
          
        </Events>
      </Wrapper>
    </div>
  )
}

export default EventPage