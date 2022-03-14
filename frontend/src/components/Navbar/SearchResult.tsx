import React from "react";
import styled from "styled-components";

const ResultDiv = styled.div`
  width: 100%;
  height: 50px;
  border: solid;
  border-color: rgba(100, 100, 111, 0.2);
  border-width: 1px;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  display: flex;

  :hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 20px 0px;
  }
`;

const InnerContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerContent = styled.div`
  margin: auto 20px;
`;

const SearchResult = () => {
  return (
    <ResultDiv>
      <InnerContentContainer>
        <InnerContent>아</InnerContent>
        <InnerContent>이</InnerContent>
      </InnerContentContainer>
    </ResultDiv>
  );
};

export default SearchResult;
