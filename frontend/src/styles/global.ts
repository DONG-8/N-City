import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: white;
    color: black;
    width: 100%;
    height: 100%;
    background-size: cover;   
}
  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: "Noto Sans KR", sans-serif;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  ul {
    padding: 0;
    margin: 0;
  }
  html{
    scroll-behavior: smooth;
  }
  li {
    list-style-type : none 
  }
`;
export default GlobalStyle;
