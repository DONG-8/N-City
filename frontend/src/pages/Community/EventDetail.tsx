import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { events } from './events'

interface IState{
  event:{
    id:number,
    title:string,
    url:string,
    date:string,
    content:string
  }
}
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
const Wrapper = styled.div`
  width: 1500px;
  height: 700px;
  margin: auto;
  display: flex;
  img{
    width: 700px;
    height: 700px;
    margin: 5vh;
    /* margin-left: 20vh; */
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    border-radius: 10px;
  }
`
const Description = styled.div`
  margin: 5vh;  
  height: 700px;
  display: flex;
  flex-direction: column;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  overflow-y:auto;
  div{
    margin-left: 2rem;
  }
  .title{
    margin-top: 2rem;
    flex:1;
    font-size: 2.2rem;
    font-weight: 600;
  }
  .date{
    flex:1;
    margin-top: 5vh;  
    font-size: 1.5rem;
    font-weight: 600;
  }
  .content{
    flex:7;
    margin-top: 5vh;  
    font-size: 18px;
    font-weight: 400;
    width: 90%;
  }
  .btnbox{
    display: flex;
    justify-content: space-around;
  }
  button{
    width: 300px;
    height: 40px;
    margin: auto;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`
const EventDetail = () => {
  const navigate = useNavigate()
  const [eventId,setEventId] = useState(Number(useParams().eventId))
  const [event,setEvent] = useState<IState['event']>({
    id:0,
    title:'string',
    url:'string',
    date:'string',
    content:'string' 
  })

  useEffect(()=>{
    events.map((event)=>{
      if(event.id===Number(eventId) ){
        setEvent(event)
      }
    })
  },[eventId])
  return (<>
      <Header>
          <Title>이벤트</Title>
        </Header>
    <Wrapper>
      <img alt="이벤트" src={event.url}/>
      <Description>
        <div className='title'>{event.title}</div>
        <div className='date'>이벤트 기간 : {event.date}</div>
        {/* <div className='content'> 설명: {event.content}</div> */}
        <div className='content'>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
        <span className='btnbox'>
          <Button variant="contained" color='info' onClick={()=>{navigate(`/event`)}} >뒤로</Button>
          <Button variant="contained" color='primary' onClick={()=>{
            navigate(`/event/${eventId+1}`);
            setEventId(eventId+1)
            }} >다음</Button>
        </span>
      </Description>
    </Wrapper>
    </>
  )
}

export default EventDetail