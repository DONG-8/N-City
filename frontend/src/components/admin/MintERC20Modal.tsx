import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "react-query";
import styled, { css, keyframes } from "styled-components";
import { patchAutentication } from "../../store/apis/authentication";
import { SSFTokenContract } from "../../web3Config";

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  getBalance: () => void;
  setIsOpenProp: React.Dispatch<SetStateAction<boolean>>;
  account: string
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
  align-items: center;
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
`

const Input = styled.input`
  
    left: 120px;
    margin-top: 10px;
    border: 1px solid lightgray;
    background-color: lightgray;
    height: 20px;
    width: 400px;
    border-radius: 10px;
    padding: 10px;
    outline: none;
    font-size: 15px;
    :focus {
      outline: none;
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  
`

//// component
const MintERC20Modal = ({
  visible,
  onClose,
  setIsOpenProp,
  account,
  getBalance
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0)
  const { ethereum } = window;

  const onClickMint = async () => {
    const response = await SSFTokenContract.methods.mint(amount).send({from: account})
    console.log(response)
    setIsOpenProp(false)
    getBalance();
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
        <CloseButton onClick={onClose} />
        <Title>NCT 민팅</Title>
        <Divider />
        <div>민팅할 NCT 수</div>
        <Input min={0} type="number" onChange={(e) => setAmount(Number(e.target.value))}></Input>

        <ButtonBox>
          <Button onClick={onClickMint}>
            Mint
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonBox>
      </ModalSection>
    </div>
  );
};

export default MintERC20Modal;
