import React, { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

export interface ModalBaseProps {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: React.MouseEventHandler<HTMLElement>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCategoryCode: React.Dispatch<React.SetStateAction<string>>;
  openStateHandler: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: string;
}

export interface Icategory {
  category: {
    name: string;
    selected: boolean;
    code: string;
  };
}

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
  visibility: ${visible ? "visible" : "hidden"};
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
  font-family: "Noto Sans KR", sans-serif;
  width: 600px;
  height: 430px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 1020px;
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
  font-size: 32px;
  text-align: center;
`;

const Divider = styled.hr`
  border: solid 1px #ff865b;
  width: 65%;
  margin-bottom: 15px;
`;

const AddButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  right: 30px;
  bottom: 30px;
  background-color: #ff865b;
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  width: 150px;
  height: 50px;
  border-radius: 15px;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  &:hover {
    font-weight: bold;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  &:active {
    background-color: #de5d30;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
`;

const ExplaneText = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 10px 20px;
`;

const SelectCategory = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto 10px;
  border: 1px solid black;
  border-radius: 15px;
  width: 90%;
  padding: 10px;
  .active {
    background-color: #feaf84;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }
  button {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 13px;
    margin: 5px 3px;
    height: 20px;
    cursor: pointer;
    &:active {
      background-color: #ff9e69;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }
  }
`;

const HashtagBox = styled.div`
  margin-left: 14px;
  p {
    font-weight: bold;
    display: inline-block;
    margin: 5px 6px;
  }
`;

const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

//// component
const CategoryModal = ({
  children,
  visible,
  onClose,
  setCategory,
  setCategoryCode,
  openStateHandler,
  userRole
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    Icategory["category"][]
  >([
    { name: "음악", selected: false, code:"1" },
    { name: "사진", selected: false, code:"2" },
    { name: "동영상", selected: false, code:"3" },
    { name: "그림", selected: false, code:"4" },
    { name: "연예인", selected: false, code:"5" },
    { name: "스포츠", selected: false, code:"6" },
    { name: "캐릭터", selected: false, code:"7" },
    { name: "애니메이션", selected: false, code:"8" },
  ]);

  const onClickSelect = (category: { name: string; selected: boolean }) => {
    // const newSelected = [...selectedCategories]
    // const temp = ((e.target as HTMLButtonElement).innerHTML)
    // const el = ((e.target as HTMLButtonElement).className)

    console.log(category);
    setSelectedCategories(
      selectedCategories.map((item) =>
        item.name === category.name
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    );
    console.log(selectedCategories);

    // newSelected.push(temp)
    // setSelectedCategories(newSelected)
    // console.log(selectedCategories)
  };
  // submit
  const onClickAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    selectedCategories.filter((category) => {
      if (category.selected) {
        setCategory(category.name)
        setCategoryCode(category.code)
      }
    })
    openStateHandler(false);
  };

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
        <CloseButton onClick={onClose}></CloseButton>
        <Title>카테고리 추가</Title>
        <Divider />
        <ExplaneText>원하는 카테고리를 추가하세요.</ExplaneText>
        <SelectCategory>
          {selectedCategories.map((category) => (
            userRole !== "ROLE_ADMIN" && category.code === "7" ? null :
            <button
              key={category.name}
              className={category.selected ? "active" : ""}
              onClick={() => onClickSelect(category)}
            >
              {category.name}
            </button>
          ))}
        </SelectCategory>
        <HashtagBox>
          {selectedCategories.map(
            (category) =>
              category.selected === true && (
                <p key={category.name}># {category.name}</p>
              )
          )}
        </HashtagBox>
        <AddButton type="submit" onClick={onClickAdd}>
          추가
        </AddButton>
      </ModalSection>
    </div>
  );
};

export default CategoryModal;
