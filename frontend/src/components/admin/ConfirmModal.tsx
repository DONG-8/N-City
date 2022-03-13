import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  control: string;
  removeList: (apply: any) => void;
  selectedItem: any;
  setIsOpenProp: React.Dispatch<SetStateAction<boolean>>;
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

// components
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
  height: 250px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
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
  border: solid 1px #ff865b;
  width: 65%;
  margin-bottom: 30px;
`;

const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  right: 20px;
  bottom: 20px;
  .approve {
    background-color: #399b20;
    &:active {
      background-color: #2e8518;
    }
  }
  .reject {
    background-color: #e34558;
    &:active {
      background-color: #b72a3b;
    }
  }
`;

const Button = styled.button`
  background-color: #ff865b;
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  width: 80px;
  border-radius: 15px;
  margin: 0 5px;
  &:hover {
    font-weight: bold;
  }
  &:active {
    background-color: #de5d30;
  }
`;

const ExplaneText = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  height: 30%;
  margin: 0;
  span {
    color: #ff865b;
    font-size: 22px;
  }
`;

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

//// component
const ConfirmModal = ({
  visible,
  onClose,
  control,
  removeList,
  selectedItem,
  setIsOpenProp,
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApprove = () => {
    if (control === "승인") {
      //여기서 승인 요청
      //정보는 selectedItem에 있음
    } else if (control === "거절") {
      // 여기서 거절 요청
    }
    setIsOpenProp(false);
    removeList(selectedItem);
  };

  const setBtnClass = () => {
    if (control === "승인") {
      return "approve";
    } else if (control === "거절") {
      return "reject";
    }
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
        <CloseButton type="button" onClick={onClose}>
          X
        </CloseButton>
        <Title>확인</Title>
        <Divider />
        {control === "승인" && (
          <ExplaneText>
            정말로&nbsp; <span>{selectedItem.id}</span>님을 승인하시겠습니까?
          </ExplaneText>
        )}
        {control === "거절" && (
          <ExplaneText>
            정말로&nbsp; <span>{selectedItem.id}</span>님의 승인신청을 거절하시겠습니까?
          </ExplaneText>
        )}
        <ButtonBox>
          <Button onClick={handleApprove} className={setBtnClass()}>
            {control}
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonBox>
      </ModalSection>
    </div>
  );
};

export default ConfirmModal;
