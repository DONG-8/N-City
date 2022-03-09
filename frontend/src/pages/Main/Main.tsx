import React, {useState,useRef} from 'react';
import styled from 'styled-components';
// import sakura from "../../../public/assets/images/sakura.gif"

// 캐러셀용 슬라이더
// import SliderDot from '../../components/carousel/SliderDot';
// import Slider from '../../components/carousel/Slider';


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
  margin: -400px 20px 0 auto;
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
  .inner {
    width: 1223px;   
  }
  .inner  img {
    width : 100%;
    height: 100%;
  }
`
const SubBanner = styled.div`
  position: relative;
  width:448px;
  height:566px;
  background-color: black;
  color : white;
  margin: -400px auto 0 20px;
`




export default function Main() {
  const [position, setPosition] = useState<number>(0)


  const images = [
    { pic: "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg", ID: 1 , name :'구찌'},
    { pic: "https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg", ID: 2 , name : '로아 프레딧 룩' },
  ];
    
  const moveRight = () => { 
    const len = images.length;
    if ((len-1)*(-1223) === position) {
      setPosition(0)
    } else {
      setPosition(position - 1223)
      console.log('뿌잉')
    }
  }
  
  const moveLeft = () => {
    const len = images.length;
    if (0 === position) {
      setPosition((len-1)*(-1223))
    } else {
      setPosition(position + 1223)
      console.log('뿌잉')
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
              <div className='inner' style={{transform: `translate(${position}px)`, transition: `transform 0.5s`}}>
                <img src="https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2020121617202605478e0eaf3841f218144160198.jpg" key='1'/>
              </div>  
              <div className='inner' style={{transform: `translate(${position}px)`, transition: `transform 0.5s`}}>
                <img src="https://cdn-lostark.game.onstove.com/2022/event/220223_package_j54QvSXfeG3n/images/pc/@img_index.jpg" key='2'/>
              </div>
          </MainBanner>
          <button onClick={() => {moveLeft()}}>왼쪽</button>
          <button onClick={() => {moveRight()}}>오른쪽</button>
        </MainBannerWrapper>
        <SubBanner>subBanner</SubBanner>
      </MainWrapper>
    </>
  );
}
