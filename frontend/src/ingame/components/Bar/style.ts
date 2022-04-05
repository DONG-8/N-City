import styled from "styled-components";

export const ToggleBtn = styled.div`
  position: absolute;
  top: 25px;
  left: -40px;
  background-color: yellow;
  width: 10px;
  height: 10px;
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
  height: 100%;
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
    height: 80px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    /* background-color: blue; */
    border-radius: 10px;
    cursor: pointer;
    :hover {
      background-color: rgba(98, 37, 230, 0.5);
      transition: all 0.3s ease;
    }

    .content {
      width: 200px;
      /* background-color: aliceblue; */
      /* display: flex; */
      /* height: 100px; */
      p {
        text-align: center;
        font-size: 24px;
        margin-top: 30px;
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
  width: 250px;
  margin: 0px;
  height: 13%;
  position: relative;
  /* background-color: red; */
  /* background-color: white; */
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  z-index: 2;
  img {
    width: 88px;
    height: 88px;
    border-radius: 25px;
    margin: 0;
  }
  div {
    margin-left: 10px;
  }
`;

export const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 87%;
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

  .img {
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
        margin-top: 30px;
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