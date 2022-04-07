import React, { useState } from "react";
import styled from "styled-components";

interface Ibuttonnumber {
  number: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1000px;
  /* background-color: #e9bbbb; */
`
const Button = styled.div`
  color: black;
  height: 20px;
  margin: 20px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  &.now{
    color: #5c5cff;
  }
`;

const PagenationButton: React.FC<Ibuttonnumber> = ({ number, setValue }) => {
  const [now,setNow] = useState(1)
  const pageChange = (i: number) => {
    setValue(i);
    setNow(i)
  };

  // for(let i = 0; i < )
  let arr: number[] = [];
  for (let i = 0; i < number; i++) {
    arr.push(i + 1);
  }

  return (
    <Wrapper>
      {arr.map((ob, i) => {
        return (
          <Button className={now===i+1 ?"now":""} key={i + 1} onClick={() => pageChange(i + 1)}>
            {i + 1}
          </Button>
        );
      })}
    </Wrapper>
  );
};

export default PagenationButton;
