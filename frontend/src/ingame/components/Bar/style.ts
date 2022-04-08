import styled from "styled-components";

export const ToggleBtn = styled.div`
  position: absolute;
  top: 25px;
  left: -40px;
  /* background-color: yellow; */
  width: 10px;
  height: 10px;
  cursor: pointer;

  .button {
    position: fixed;
    width: 30px;
    height: 30px;
    transform: translateY(-50%) rotate(180deg);
    transition: all 0.3s ease;
  }

  .changeButton {
    position: fixed;
    width: 30px;
    height: 30px;
    transform: translateY(-50%) rotate(0deg);
    transition: all 0.3s ease;
  }
`;

export const Wrapper = styled.div`
  padding: 10px 14px;
  height: 98%;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  right: 0;
  background-color: white;
  /* overflow-y: hidden; */
  transition: all 0.3s ease;
  border-radius: 10px;
  margin: 0px;
  .close {
    width: 88px;
    /* background-color: black; */
  }
  .open {
    width: 300px;
    /* background-color: red; */
  }

  .Icon {
    position: relative;
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    /* background-color: blue; */
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
    :hover {
      background-color: rgba(98, 37, 230, 0.5);
      transition: all 0.3s ease;
    }

    .content {
      width: 200px;

      p {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        /* margin-top: 30px; */
      }
    }
    .playimg {
      width: 25px;
      height: 25px;
    }
  }

  .hidden {
    display: none;
  }
`;

export const Head = styled.div`
  white-space: nowrap;
  width: 250px;
  margin: 0px;
  height: 16%;
  position: relative;
  /* background-color: red; */
  /* background-color: white; */
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 2;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    margin-right: 20px;
  }
  .profileBox {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .bottom {
      font-weight: 500;
      display: flex;
      align-items: center;
      button {
        margin-left: 30px;
      }
    }

    .nick {
      margin-bottom: 10px;
      font-size: 26px;
      font-weight: 600;
      display: flex;
      align-items: center;
      img {
        margin-left: 3px;
      }
    }
    button {
      font-family: "Noto Sans KR", sans-serif;
      font-weight: 600;
      background-color: #7272fe;
      width: 100px;
      height: 40px;
      font-size: 16px;
      &:hover {
        transition: 0.2s;
        background-color: #7e7ef8;
      }
    }
    img {
      width: 22px;
      height: 22px;
    }
  }
`;

export const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 84%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const Body = styled.div`
  width: 250px;
  /* background-color: red; */
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  .Mimg {
    width: 30px;
    height: 30px;
    margin: auto;
  }

  .music {
    margin-top: 20px;
  }
`;

export const BottomItem = styled.div`
  position: relative;
  bottom: 10px;
  width: 250px;
  /* background-color: red; */
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  img {
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: rgba(98, 37, 230, 0.5);
      transition: all 0.3s ease;
    }
    /* background-color: red; */
  }

  .music {
    margin-top: 20px;
  }
  .Bottom {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    /* background-color: blue; */
    border-radius: 10px;
    }

    div {
      width: 200px;
      p {
        text-align: center;
        font-size: 24px;
        /* margin-top: 30px; */
        margin: 0;
      }
    }
    .playimg {
      width: 25px;
      height: 25px;
    }
  }

  .hidden {
    display: none;
  }

  button {
    width: 40%;
    text-align: center;
    height: 80%;
    margin: 5%;
    border-radius: 10px;
    /* :hover {
      background-color: rgba(98, 37, 230, 0.5);
      transition: all 0.3s ease;
    } */
    .user {
      width: 80%;
      text-align: center;
      height: 80%;
      margin: 5%;
    }
  }
`;

export const Absol = styled.div`
  position: absolute;
`;

const ButtonTop = styled.div``;

const ButtonBottom = styled.div``;

export const NonMusicDiv = styled.div`
  width : 100%;
  height: 100%;
  text-align: center;
`