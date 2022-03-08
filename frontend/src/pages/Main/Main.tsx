import React from 'react';
import styled from 'styled-components';
// import sakura from "../../../public/assets/images/sakura.gif"

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

const MainBannerWrapper = styled.div`
  width: 1921px;
  display: flex;
`
const MainBanner = styled.div`
  position: relative;
  width : 1223px;
  height: 566px;
  background-color: black ;
  color : white;
  margin: -400px 20px 0 auto;
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
  return (
    <>
      <MainBackGround>
        <MainBackImg src='https://post-phinf.pstatic.net/MjAyMDEyMjJfMjc0/MDAxNjA4NjQ0MzExMzM4.BKpiZi7BKqbKceFNFAg0mB1JUZXGsGiDZsB2shTf2NYg.w-SkrTWCzjoyLu_-9moNkS3ZUGu0FljmpuuE-JMJRRwg.GIF/tumblr_nm6j1ghB7C1qze3hdo1_500.gif?type=w1200'/>
      </MainBackGround>
      <MainBannerWrapper>
        <MainBanner>MainBanner</MainBanner>
        <SubBanner>subBanner</SubBanner>
      </MainBannerWrapper>
    </>
  );
}
