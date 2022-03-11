import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  setCategories: (categories:string[]) => void;
};

//// style
// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
  font-family: 'Noto Sans KR', sans-serif;
  width: 600px;
  height: 55vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 120%;
  left: 50%;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  ${(props) => modalSettings(props.visible)}
`;

const Title = styled.h1`
  margin: 20px 0 10px;
  font-size: 30px;
  text-align: center;
`;

const Divider = styled.hr`
  border: solid 1px #FF865B;
  width: 65%;
  margin-bottom: 30px;
`;

const AddButton = styled.button`
    position: absolute;
    right: 20px;
    bottom: 20px;
    background-color: #FF865B;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    width: 20%;
    border-radius: 15px;
  &:hover {
    font-weight: bold;
  }
  &:active {
    background-color: #DE5D30;
  }
`

const ExplaneText = styled.h3`
  font-size: 20px;
  margin: 0 0 10px 10px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  border: none;
  background: none;
  cursor: pointer;
`;

const SelectCategory = styled.div`
  display: flex;
  margin: 0 auto;
  border: 1px solid black;
  width: 90%;
  height: 30%;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 5px;
    margin: 3px;
    height: 20px;
    cursor: pointer;
    &:active {
      background-color: grey;
    }
    .selected {
      background-color: red;
    }

  }
`

const HashtagBox = styled.div`
  margin-left: 10px;
`

//// component
const CategoryModal = ({ children, visible, onClose, setCategories }: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryArr = [
    { name: "음악", selected: false },
    { name: "비디오", selected: false },
    { name: "오디오", selected: false },
    { name: "동탁", selected: false },
  ];
  
  const onClickSelect = (e:React.MouseEvent) => {
    const newSelected = [...selectedCategories]
    const temp = ((e.target as HTMLButtonElement).innerHTML)
    const el = ((e.target as HTMLButtonElement).className)
    
    console.log(el)
    
    // newSelected.push(temp)
    // setSelectedCategories(newSelected)
    // console.log(selectedCategories)
  }
  // submit
  const onClickAdd = (e:React.FormEvent) => {
    e.preventDefault();

  }
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) {
    return null;
  }


  return (
    <div>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <CloseButton type="button" onClick={onClose}>
          X
        </CloseButton>
        <Title>카테고리 추가</Title>
        <Divider />
        <ExplaneText>원하는 카테고리에 추가하세요.</ExplaneText>
        <SelectCategory>
          {categoryArr.map((category) => (
            <button key={category.name}  onClick={onClickSelect}>{category.name}</button>
          ))}
        </SelectCategory>
        <HashtagBox>#음악 #ㅇㅇ #ㅎㅎ</HashtagBox>
        <AddButton type="submit" onClick={onClickAdd}>
          추가
        </AddButton>
      </ModalSection>
    </div>
  );
};

export default CategoryModal;
