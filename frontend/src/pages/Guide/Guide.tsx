import styled from "styled-components";
import Extra from "./extraguide";

const Wrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
`

const DDDD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: red;
  img {
    width: 400px;
    height: auto;
  }
  .firstdiv {
    color: teal;
  }
`
const Img = styled.img`
  width: 400px;
  height: auto;

`
//component
const Guide = () => {
  const explane = "설명입니다."

  return (
    <Wrapper>
      <h1>가이드페이지</h1>
      <DDDD>
        <div className="firstdiv">이이이이잉ㅇ</div>
        <div>{explane}</div>
        <img src="/essets/guideimage/지슬.png" alt="사진" />
      </DDDD>
      <p>ddd</p>
      <Extra />
      <Extra />
      <Extra />
      <Extra />
    </Wrapper>
  );
}

export default Guide
