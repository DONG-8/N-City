import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 5vh;
  margin-bottom: 10vh;
  
`
const Header = styled.div`
  text-align: center;
  h1{
    font-size: 5vh;
  }
  
`
const Events = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    font-weight: 1000;
    margin: 1vh;

  }
  .date{
    font-size: 1.5vh;
    font-weight: 1000;
    margin: 1vh;
    color:blue;
  }

`
const CategoryBar= styled.div`
  display: flex;
  div{
    font-size: 1.2rem;
    font-weight: 1000;
    margin-top: 2rem;
    margin-left: 2rem;
  }
`

const EventPage = () => {
  const events = [
    {title:"서울브랜드파트너스가 선물을 드려요",url:"https://www.fetv.co.kr/data/photos/20210938/art_16324402689008_18ca02.jpg",date:"2021.12.22 06:00 ~ 03.16 06:00",content:""},
    {title:"복지로는 ???이다",url:"https://asia.playstation.com/content/dam/pscom/kr/latest-news/FY19/12/20191220-holiday-luckydraw-16x9-2.jpg",date:"2021.12.22 06:00 ~ 03.16 06:00",content:""},
    {title:"서울브랜드파트너스가 선물을 드려요",url:"https://www.culture.go.kr/assets/images/content/borad_event_img7.jpg",date:"2021.12.22 06:00 ~ 03.16 06:00",content:""},
    {title:"복지로는 ???이다",url:"https://s3.ap-northeast-2.amazonaws.com/coinone-talk-share/20211101/notice_thread_1635760564981.8904.png",date:"2021.12.22 06:00 ~ 03.16 06:00",content:""},
  ]
  const navigate = useNavigate()
  const goDetailPage = (contents:object)=>{
    navigate('/event/detail')
    localStorage.setItem("event",JSON.stringify(contents))
  }
  return (
    <div>
      <Wrapper>
        <Header>
          <h1> 이벤트 </h1><hr/> 
        </Header>
        <CategoryBar>
          <div className=''> 최신순 </div>
          <div className=''> 진행중 </div>
        </CategoryBar>
        <Events>
          {events.map(event=>{ return(
            <Event onClick={()=>{goDetailPage(event)}}>
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