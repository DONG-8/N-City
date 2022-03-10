import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
// import { clearInterval } from 'timers';

const MainBackGround = styled.div`
  width : 1921px;
  height: 650px ;
`

const MainBackImg = styled.img`
    position: relative ;
    object-fit: cover ;
    width : 100%;
    height : 100%;
`

const MainWrapper = styled.div`
  width: 1921px;
  display: flex;
`

const MainBannerWrapper = styled.div`
  width: 1223px;
  height: 700px;
  color : white;
  margin: -500px 10px 0 auto;
`

const MainBanner = styled.div`
  width: 1223px;
  height: 650px;
  object-fit:cover;
  display: flex;
  flex-direction: column ;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index:0;
  .inner {
    width: 1223px;   
  }
  .inner  img {
    width : 100%;
    height: 100%;
  }
`

const MainPagenationBanner = styled.div`
  position: absolute;
  width: 1223px;
  height: 70px;
  display: flex;
  margin: -70px 0 auto;
  background-color: rgba(0,0,0,0.5);
  color: white;
  .container {
    width : 1000px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content : flex-start;
    align-items: center;
    overflow: hidden;
  }
  .inner {
    width : 250px;
    min-width:250px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: translate(-250px) */
  }
  button {
    width : 50px;
    color: white;
  }
`
const SubBannerWrraper = styled.div`
  position: relative;
  width:448px;
  height:566px;
  background-color: black;
  color : white;
  margin: -500px auto 0 10px;
`

const SubBanner = styled.div`
  width: 448px;
  height: 280px;
  object-fit:cover;
  display: flex;
  flex-direction: column ;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index:0;
  background-color: white;
  .inner {
    width: 448px;
  }
  .inner  img {
    width : 100%;
    height: 280px;
    /* height: 100%; */
    object-fit: cover;
  }
`

const SubPagenationBanner = styled.div`
  position: absolute;
  width: 448px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin: -30px 0 auto;
  /* background-color: rgba(0,0,0,0.5); */
  color: white;
  .container {
    width : 448px;
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content : flex-start;
    align-items: center;
    overflow: hidden;
  }
  .inner {
    width : 250px;
    min-width:250px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transform: translate(-250px) */
  }


  button {
    background-color: rgba(0,0,0,0.5);
    width : 80px;
    color: white;
  }
`

const SubBottomItem = styled.div`
  width:100%;

`


export default function Main() {
  const [position, setPosition] = useState<number>(0)
  const [eventNumber,setEventNumber] = useState<number>(0)
  const [pageTextPosition, setPageTextPosition] = useState<number>(0)
  const [check, setCheck] = useState<number>(0)

  // 오늘의 방 (투데이 많은 방기준!)
  const [subPosition, setSubPosition] = useState<number>(0)
  const [subEventNumber,setSubEventNumber] = useState<number>(0)
  const [subCheck, setSubCheck] = useState<number>(0)

  // 나중에 DB 기반의 데이터 형성시켜주고 이미지 받아오기 아니면 그냥 여기서 사용
  const images = [
    { pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg", ID: 1 , name :'구찌'},
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
    { pic: "https://cdn-lostark.game.onstove.com/uploadfiles/banner/93964914d8904123a71323313b1a95ba.jpg", ID: 3 , name : '로아 도화가' },
    { pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg", ID: 1 , name :'구찌'},
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
    { pic: "https://cdn-lostark.game.onstove.com/uploadfiles/banner/93964914d8904123a71323313b1a95ba.jpg", ID: 3 , name : '로아 도화가' },
    { pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg", ID: 1 , name :'구찌'},
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
    { pic: "https://cdn-lostark.game.onstove.com/uploadfiles/banner/93964914d8904123a71323313b1a95ba.jpg", ID: 3 , name : '로아 도화가' },
  ];

  const subImages = [{ pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg", ID: 1 , name :'구찌'},
  { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
  { pic: "https://cdn-lostark.game.onstove.com/uploadfiles/banner/93964914d8904123a71323313b1a95ba.jpg", ID: 3 , name : '로아 도화가' },]


  const moveRight = () => {
    // console.log(e)
    // clearTimeout(1000)
    const len = images.length;
    const idx = Math.floor((eventNumber+1)%len)
    if ((len-1)*(-1223) === position) {
      setPosition(0)
    } else {
      setPosition(position - 1223)
    }
    setEventNumber(idx)

    if (idx === 0) {
      setPageTextPosition(0)
    } 
    else if ( 2 < idx && idx < len-1 ) {
      setPageTextPosition(pageTextPosition - 250)
      }
    console.log(eventNumber,'우')
    }
    
  
  const moveLeft = () => {
    const len = images.length;
    const idx = Math.floor((eventNumber-1)%(len))
    if (0 === position) {
      setPosition((len-1)*(-1223))
    } else {
      setPosition(position + 1223)
    }
    if (idx < 0) {
      setEventNumber(len-1)
    } else {
      setEventNumber(eventNumber-1)
    }
    console.log(Math.floor(idx%4))
    if (idx < 0) {
      setPageTextPosition(-250*(len-1) +(2-Math.floor(idx%4))*250)
    } 
    else if ( 2 < idx && idx < len-2 ) {
      setPageTextPosition(pageTextPosition + 250)
      }
    else if (idx=== len-2){
      // console.log('옆으로 밀어주때욤')  
    }else{
        setPageTextPosition(0)
      }

    // console.log(eventNumber,'좌')
    }
  
  const clickToMove = (e : React.MouseEvent<HTMLDivElement>) => {
    clearTimeout()
    // setCheck(true)
    const len = images.length;
    const num  = parseInt(e.currentTarget.id)
    const dif = (num-eventNumber)
    if (dif < 0) {
      console.log(eventNumber,'클릭 이벤트넘버 현재위치')
      console.log(dif,'차이')
      const di = Math.abs(dif)
      const idx = Math.floor((eventNumber-di))
      console.log(idx,'idx')
      setPosition(position + 1223*(di))
      setEventNumber(eventNumber-di)
      // setPageTextPosition(pageTextPosition + 250*(di))
      if (di === 1){
        if (idx === len-2) {
          console.log('들어옴')
        } else {
          if (idx < 2) {

          }else{
          setPageTextPosition(pageTextPosition + 250)
          }
        }
      }
      else if (di === 2) {
        if (idx === len-3){
          setPageTextPosition(pageTextPosition + 250)
        }else if (idx < 2) {
          setPageTextPosition(pageTextPosition + 250)
        } else {
          setPageTextPosition(pageTextPosition + 500)
        }
      }
      else if (di === 3) {
        setPageTextPosition(pageTextPosition + 500)
      }
      


    } else {
      const idx = Math.floor((eventNumber+dif))
      setPosition(position - 1223*(dif))
      setEventNumber(eventNumber+dif)
      // console.log(idx,'idx')
      if (dif === 1) {
        if (idx === 0) {
          setPageTextPosition(0)
        } 
        else if ( 1 < idx && idx <= len-2 ) {
          setPageTextPosition(pageTextPosition - 250)
          }
        else if (idx === len-2) {
          setPageTextPosition(pageTextPosition - 250)
        }
      } 
      else if ( dif === 2 ) {
        if (idx === 2) {

        } else {
          setPageTextPosition(pageTextPosition -(250))
        }
        
      }
      else if (dif === 3) {
        setPageTextPosition(pageTextPosition -(250))
      }
    }
  }

  const moveAuto = () => {
    const len = images.length;
    const idx = Math.floor((eventNumber+1)%len)
    if ((len-1)*(-1223) === position) {
      setPosition(0)
    } else {
      setPosition(position - 1223)
    }
    setEventNumber(idx)

    if (idx === 0) {
      setPageTextPosition(0)
    } 
    else if ( 2 < idx && idx < len-1 ) {
      setPageTextPosition(pageTextPosition - 250)
      }
    // console.log(eventNumber,'우')
    if (check === 0) {setTimeout(() => {setCheck(1)},4000)}
    else {setTimeout(() => {setCheck(0)},4000)}    
  }

  useEffect(() => {
    moveAuto()
  },[check])

  useEffect(()=> {
    moveSubAuto()
  },[subCheck])


  const moveSubAuto = () => {
    const len = subImages.length
    const idx = Math.floor((subEventNumber+1)%len)
    setSubEventNumber(idx)
    if (idx === 0) {
      setSubPosition(0)
    } else {
      setSubPosition(subPosition - 448)
    }
    if (subCheck === 0) {setTimeout(() => {setSubCheck(1)},8000)}
    else {setTimeout(() => {setSubCheck(0)},8000)}   

  }
  
  const moveSubRight = () => {
    const len = subImages.length
    const idx = Math.floor((subEventNumber+1)%len)
    setSubEventNumber(idx)
    if (idx === 0) {
      setSubPosition(0)
    } else {
      setSubPosition(subPosition - 448)
    }
  }

  const moveSubLeft = () => {
    const len = subImages.length;
    const idx = Math.floor((subEventNumber-1)%(len))
    if (0 === subPosition) {
      setSubPosition((len-1)*(-448))
    } else {
      setSubPosition(subPosition + 448)
    }
    if (idx < 0) {
      setSubEventNumber(len-1)
    } else {
      setSubEventNumber(subEventNumber-1)
    }
  }




  return (
    <>
      <MainBackGround>
        <MainBackImg src='https://post-phinf.pstatic.net/MjAyMDEyMjJfMjc0/MDAxNjA4NjQ0MzExMzM4.BKpiZi7BKqbKceFNFAg0mB1JUZXGsGiDZsB2shTf2NYg.w-SkrTWCzjoyLu_-9moNkS3ZUGu0FljmpuuE-JMJRRwg.GIF/tumblr_nm6j1ghB7C1qze3hdo1_500.gif?type=w1200'/>
      </MainBackGround>
      <MainWrapper>
        <MainBannerWrapper>
          <MainBanner>
              {images.map((value,idx) => {
                return(
                  <div className='inner' style={{transform: `translate(${position}px)`, transition: `transform 0.5s`}}>
                    <img src={value.pic} key={idx+value.name} alt='사진없노'/>
                  </div>  
                )
              })}
          </MainBanner>
          <MainPagenationBanner>
            <button onClick={() => {moveLeft()}}>왼쪽</button>
            <div className='container'>
              {images.map((value,idx) => {
                  const id = String(idx)
                  //transform: `translate(${sub}px)`, transition: `transform 0.5s`
                  if (idx === eventNumber) {
                    return(
                      <div className='inner' id={id} onClick={(e)=>{clickToMove(e)}} style={{ color : 'white',transform: `translate(${pageTextPosition}px)`, transition: `transform 0.5s`}}>{value.name}</div>
                    )
                  } else {
                    return(
                      <div className='inner' id={id} onClick={(e)=>{clickToMove(e)}} style={{color : 'gray',transform: `translate(${pageTextPosition}px)`, transition: `transform 0.5s`}}>{value.name}</div>
                  )}
                })}
            </div>
            <button onClick={() => {moveRight()}}>오른쪽</button>
            <button>{eventNumber+1}/{images.length}</button>
            <button>전체 이벤트 목록</button>
          </MainPagenationBanner>
        </MainBannerWrapper>
        <SubBannerWrraper>
          <SubBanner>
            {subImages.map((value,idx) => {
              // style={{transform: `translate(${position}px)`, transition: `transform 0.5s`}}
                return(
                  <div className='inner'>
                    <img src={value.pic} key={idx+value.name} alt='사진없노'
                    style={{transform: `translate(${subPosition}px)`, transition: `transform 0.5s`}}/>
                  </div>  
                )
              })}
          </SubBanner>
          <SubPagenationBanner>
            <button onClick={()=>{moveSubLeft()}}>왼쪽</button>
            <button>{subEventNumber+1}/{subImages.length}</button>
            <button onClick={()=>{moveSubRight()}}>오른쪽</button>
          </SubPagenationBanner>
          <SubBottomItem>하이염</SubBottomItem>
        </SubBannerWrraper>
        
          
      </MainWrapper>
    </>
  );
}
