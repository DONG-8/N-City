import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  formType: string;
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
  height: 90vh;
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
  border: solid 1px #FF865B;
  width: 65%;
  margin-bottom: 30px;
`;

const ExplaneBox = styled.div`
  margin-bottom: 10px;
`

const FormWrapper = styled.form`
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  // 업로드 버튼
  .file-label {
    display: flex;
    margin-top: 30px;
    background-color: #FF865B;
    color: #fff;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    width: 90px;
    height: 15px;
    border-radius: 15px;
    cursor: pointer;
    &:active {
      background-color: #DE5D30;
    }
  }
  .file {
    display: none;
  }
`;

const Content = styled.div`
  padding: 16px 0;
`;

const TextInputBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  label {
    font-weight: bold;
  }
  input {
    position: absolute;
    left: 120px;
    border: 1px solid black;
    height: 20px;
    width: 50vh;
    border-radius: 5px;
  }
`

const FileUploadExplaneBox = styled.div`
  margin-top: 20px;
  div {
    margin-bottom: 10px;
  }
  .first {
    font-size: 15px;
  }
  .second {
    font-size: 15px;
  }
  .third {
    font-size: 12px;
  }
`
const FileUpload = styled.input`
  border: 1px solid black;
`

const SubmitButton = styled.button`
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
  margin: 0;
  span {
    color: #aa2e2e;
  }
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

//// component
const ModalBase = ({ children, visible, onClose, formType }: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<any>([]);
  // const [fileNames, setFileNames] = useState<string[]>([]);
  const handleFileOnChange = (e:React.ChangeEvent) => {
    setFiles((e.target as HTMLInputElement).files)

    console.log((e.target as HTMLInputElement).files)
  }
  
  // 이름 입력
  const onChangeName = (e:React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value)
  }
  
  // 이메일 입력
  const onChangeEmail = (e:React.ChangeEvent) => {
    setEmail((e.target as HTMLInputElement).value)
  }
  
  // submit
  const onClickSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    // 여기서 나중에 post 요청
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
        <Title>인증뱃지신청</Title>
        <Divider />
        <FormWrapper>
          {formType === "influencer" && (
            <ExplaneBox>
              <ExplaneText>인플루언서 뱃지를 획득하기 위해서는</ExplaneText>
              <ExplaneText>
                <span>최소 팔로워수가 100명 이상</span>이여야 합니다 !
              </ExplaneText>
            </ExplaneBox>
          )}
          {formType === "designer" && (
            <ExplaneBox>
              <ExplaneText>디자인 업계의 전문가 이신가요 ?</ExplaneText>
              <ExplaneText>작품의 가치를 더욱 빛내세요 !</ExplaneText>
            </ExplaneBox>
          )}
          {formType === "enterprise" && (
            <ExplaneBox>
              <ExplaneText>작품에 기업인증 뱃지를 달고</ExplaneText>
              <ExplaneText>
                기업 홍보와 함께 작품의 가치를 높이세요 !
              </ExplaneText>
            </ExplaneBox>
          )}
          {/* <Content>{children}</Content> */}
          <TextInputBox>
            <label htmlFor="name">이름</label>
            <input id="name" type="text" onChange={onChangeName} value={name} />
          </TextInputBox>
          <TextInputBox>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              onChange={onChangeEmail}
              value={email}
            />
          </TextInputBox>

          {/* <input type="file" multiple={true}/> */}
          <FileUploadExplaneBox>
            <div>
              <ExplaneText className="first">
                정부에서 발급한 신분증의 사진을 업로드해 주세요.
              </ExplaneText>
              <ExplaneText className="first">
                신분증에는 회원님의 이름, 생년월일, 사진이 있어야 합니다.
              </ExplaneText>
            </div>
            <div>
              <ExplaneText className="second">허용되는 신분증: </ExplaneText>
              <ExplaneText className="second">
                여권, 운전면허증, 국가발급신분증, 군인신분증, 서명된 이민증
              </ExplaneText>
            </div>
            <ExplaneText className="third">
              명확한 신분증 이미지를 받아서 검토한 후에는 첨부된 문서를 서버에서
              영구적으로 삭제합니다.
            </ExplaneText>
          </FileUploadExplaneBox>
          <label className="file-label" htmlFor="chooseFile">
            파일 첨부
          </label>
          <input
            className="file"
            id="chooseFile"
            type="file"
            multiple
            onChange={handleFileOnChange}
          ></input>
          {Array.from(files).map((file:any) => <div key={file.name}>{file.name}</div>)}
          <SubmitButton type="submit" onClick={onClickSubmit}>
            신청
          </SubmitButton>
        </FormWrapper>
      </ModalSection>
    </div>
  );
};

export default ModalBase;