import React from "react";
import styled from "styled-components";

interface Ibuttonnumber {
  number: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const Button = styled.div`
  background-color: black;
  color: white;
  width: 50px;
  height: 20px;
`;

const PagenationButton: React.FC<Ibuttonnumber> = ({ number, setValue }) => {
  const pageChange = (i: number) => {
    setValue(i);
  };

  // for(let i = 0; i < )
  let arr: number[] = [];
  for (let i = 0; i < number; i++) {
    arr.push(i + 1);
  }

  return (
    <>
      {arr.map((ob, i) => {
        return (
          <Button key={i + 1} onClick={() => pageChange(i + 1)}>
            {i + 1}
          </Button>
        );
      })}
    </>
  );
};

export default PagenationButton;
