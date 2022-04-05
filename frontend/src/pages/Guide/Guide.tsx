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
  color: #6225E6;  
  .firstdiv {
    color: teal;
  }
`
const Img = styled.img`
  width: 50%;  
`

const Token = styled.img`
width : 450px;
height : auto;
`
const Emphasize = styled.h1`
color : red;
`
//component
const Guide = () => {
  const explane = "설명입니다."

  return (
    <Wrapper>
      <h1>메타마스크? 그게 뭐지? 그런거 없는데를 위한 페이지</h1>
      <DDDD>
        <div className="firstdiv">히이이이이이잉</div>
        <div>{explane}</div>
        <div>1. <Img src="/essets/guideimage/로그인버튼1_설명추가.png" alt="사진" /></div>
        <Img src="/essets/guideimage/로그인페이지_설명추가_big.png" alt="사진" />
        <Img src="/essets/guideimage/메타마스크_첫페이지_설명추가_cut.png" alt="사진" />
        <Token src="/essets/guideimage/메타마스크페이지_3_cut.png" alt="사진" />
        비밀번호 설정및 이용약관 동의
        {/* <Img src="/essets/guideimage/메타마스크페이지_4_cut.png" alt="사진" />
        아마 삭제? */}
        <Img src="/essets/guideimage/메타마스크페이지_5_설명추가_cut.png" alt="사진" />
        <h1>중요중요</h1>
        <h2>위 화면에서 빨간색 박스안의 비밀 복구 구문은 <span color='red'>반드시</span> 저장하세요!!!</h2>
        <Token src="/essets/guideimage/메타마스크페이지_6_cut.png" alt="사진" />
        <h1>해당 화면이 나오면 이전 페이지의 비밀 복구 구문 순서대로 <br/> 하단의 버튼을 눌러주세요.</h1>
        <Token src="/essets/guideimage/메타마스크페이지_7_설명추가_cut.png" alt="사진" />
        <h1>입력을 마치면 하단의 버튼이 바뀝니다.</h1>
        <Token src="/essets/guideimage/메타마스크페이지_8_cut.png" alt="사진" />
        <h1>메타마스크 연결 완료!!!!</h1>

        <h1>이제 네트워크를 연결해보겠습니다.</h1>
        <Img src="/essets/guideimage/메타마스크페이지_9_설명추가_cut.png" alt="사진" />
        <Img src="/essets/guideimage/메타마스크페이지_10_설명추가_cut.png" alt="사진" />
        <Img src="/essets/guideimage/메타마스크페이지_11_설명추가_cut.png" alt="사진" />

        <h1>이제 토큰을 가져오겠습니다.</h1>
        <Img src="/essets/guideimage/메타마스크페이지_12_설명추가_cut.png" alt="사진" />
        
        <Token src="/essets/guideimage/메타마스크페이지_13_설명추가_cut.png" alt="사진" />
        <h1> 토큰 계약 주소에 주소를 입력합니다. 0x6a2BBCa33ad091b4D95A290D18613D8466F3252d </h1>
        <Token src="/essets/guideimage/메타마스크페이지_15_cut.png" alt="사진" />
        <h1>위와 같은 화면이 나옵니다.</h1>
        <Token src="/essets/guideimage/메타마스크페이지_14_설명추가_cut.png" alt="사진" />
        <h1>한번더 해줍니다. 0x62c08319df3a2aa64fad41049bD377fE46657EBD</h1>
        
        <Token src="/essets/guideimage/메타마스크페이지_15-2_설명 추가_cut.png" alt="사진" />
        <h1>토큰 2개를 추가한 화면</h1>

        <h1>메타마스크 설정 완료!!</h1>

        <h1>이제 로그인을 해볼까요?</h1>
        <Token src="/essets/guideimage/메타마스크페이지_16_설명추가.png" alt="사진" />
        <br/>
        <Token src="/essets/guideimage/메타마스크페이지_17.png" alt="사진" />
        <h1>연결</h1>

        <Token src="/essets/guideimage/메타마스크페이지_18_설명추가_cut.png" alt="사진" />
        <h1>로그인 완료!!!</h1>


      </DDDD>
      <p>ddd</p>
      <Extra />
      
      
      
    </Wrapper>
  );
}

export default Guide
