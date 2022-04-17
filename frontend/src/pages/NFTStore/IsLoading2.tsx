import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
  margin: auto;
  display: flex;
  justify-content: space-around;
  img {
    width: 15vw;
    height: 15vw;
  }
`;
const IsLoading2 = () => {
  return (
    <Wrapper>
      <img alt="dk" src="https://i.gifer.com/Xqg8.gif" />
      {/* <img alt='dk' src='https://i.gifer.com/4EOI.gif'/> */}

      {/* <img alt='dk' src='https://i.gifer.com/5Q0v.gif'/> */}
      {/* <img alt='dk' src='https://i.gifer.com/Xqg8.gif'/> */}

      {/* <img alt='dk' src='https://i.gifer.com/1FwT.gif'/> */}
      {/* <img alt='dk' src='https://i.gifer.com/1FwT.gif'/>  */}
      {/* <img alt='dk' src='https://i.gifer.com/1FwT.gif'/> */}
    </Wrapper>
  );
};

export default IsLoading2;
