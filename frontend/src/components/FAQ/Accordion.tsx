import React, {useRef, useState, useCallback} from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

interface AccordionProps {
  title?: string | React.ReactNode;
  contents?: string | React.ReactNode;
};

// style
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid grey;
  margin-bottom: 5px;
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 40px;
  margin: 0 32px 0 10px;
`;

const Button = styled.div`
  top: 9px;
  right: 10px;
  font-size: 14px;
  position: absolute;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: 800px;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
  border-radius: 10px;
`;

const Contents = styled.div`
  padding: 0.1px;
`;

// component
function Accordion(props: AccordionProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        parentRef.current.style.background = "none";
      } else {
        parentRef.current.style.height = `${
          props.contents ? childRef.current.clientHeight + 5 : 0
        }px`;
        parentRef.current.style.backgroundColor = "#FFF6F3";
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText =
    parentRefHeight === "0px" ? <ExpandMoreIcon /> : <ExpandLessIcon />;

  return (
    <Container>
      <Question onClick={handleButtonClick}>
        {props.title}
        <Button>{buttonText}</Button>
      </Question>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}


export default React.memo(Accordion);
