/// <reference types="react-scripts" />

interface Window { //윈도우 객체에 메타마스크를 설치하면 이더리움이란 object가 생기는데 react에선 인식하지 못함. 그래서 type을 강제로 적어주는것
  ethereum: any;
}
