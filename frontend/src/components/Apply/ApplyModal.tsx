import React, { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useMutation, useQuery } from 'react-query';
import {postAuthentiaction} from '../../store/apis/authentication'

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
  height: 810px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 500px;
  left: 50%;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  ${(props) => modalSettings(props.visible)}
`;

const Title = styled.h1<{ visible: boolean }>`
  margin: 40px 0 10px;
  font-size: 30px;
  text-align: center;
  ${(props) => modalSettings(props.visible)}
`;

const Divider = styled.hr`
  border: solid 1px #a9a9f2 ;
  width: 65%;
  margin-bottom: 30px;
`;

const ExplaneBox = styled.div`
  margin-bottom: 10px;
`;

const FormWrapper = styled.form<{ visible: boolean }>`
  ${(props) => modalSettings(props.visible)}
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  // 업로드 버튼
  .file-label {
    display: flex;
    /* background-color: #a9a9f2; */
    color: #5555f6;
    border: 2px solid #8888ee;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    padding: 8px 10px;
    width: 90px;
    height: 26px;
    border-radius: 10px;
    cursor: pointer;
  }
  .file {
    display: none;
  }
  .file-name {
    font-weight: 500;
    font-size: 16px;
    margin: 0 10px;
  }
`;

const TextInputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px;
  label {
    font-weight: bold;
    font-size: 18px;
  }
  input {
    left: 120px;
    margin-top: 10px;
    border: 1px solid lightgray;
    background-color: lightgray;
    height: 20px;
    width: 510px;
    border-radius: 10px;
    padding: 10px;
    outline: none;
    font-size: 15px;
    :focus {
      outline: none;
    }
  }
`;

const FileUploadExplaneBox = styled.div`
  margin-top: 20px;
  div {
    margin-bottom: 15px;
  }
  .first {
    font-size: 18px;
  }
  .second {
    line-height: 18px;
    font-size: 15px;
    font-weight: 400;
  }
  .third {
    line-height: 18px;
    font-size: 15px;
    font-weight: 400;
  }
`;

const SubmitButton = styled.button`
  font-family: inherit;
  font-size: 18px;
  position: absolute;
  right: 35px;
  bottom: 35px;
  background-color: #6b6bf4;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 180px;
  height: 40px;
  border-radius: 10px;
  &:hover {
    font-weight: bold;
    background-color: #8080fc;

  }
  &:active {
    background-color: #8888ee;
  }
`;

const ExplaneText = styled.p<{ visible: boolean }>`
  ${(props) => modalSettings(props.visible)}
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  span {
    color: #4141f2;
  }
`;
const FileUploadButtonBox = styled.div`
  margin-top: 18px;
  display: flex;
  /* align-items: center; */
`;
const FileName = styled.div`
  margin-left: 8px;
  word-wrap: break-word;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 42px;
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

const InputBox = styled.div`
  margin: 15px 0;
`;

//// component
const ModalBase = ({
  children,
  visible,
  onClose,
  formType,
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [extra, setExtra] = useState<string>("");
  const [files, setFiles] = useState<any>([]);
  // const [fileNames, setFileNames] = useState<string[]>([]);

  const postAuth = useMutation<any, Error>(
    "postAuthentiaction",
    async () => {
      const formdata = new FormData();
      formdata.append("authName", name);
      formdata.append("authEmail", email);
      formdata.append("authType", convertType());
      formdata.append("authExtra", formType === "enterprise" ? "" : extra);
      formdata.append("authFile", files);
      // formdata 확인
      for (var key of formdata.keys()) {
        console.log(key);
      }

      for (var value of formdata.values()) {
        console.log(value);
      }

      return await(postAuthentiaction(formdata));
    },
    {
      onSuccess: (res) => {
        console.log("요청성공",res)
      },
      onError: (err: any) => {
        console.log(err, "❌APPLY 실패!");
      },
    }
  );
  const handleFileOnChange = (e: React.ChangeEvent) => {
    setFiles((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
  };

  // 이름 입력
  const onChangeName = (e: React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value);
  };

  // 이메일 입력
  const onChangeEmail = (e: React.ChangeEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const onChangeExtra = (e: React.ChangeEvent) => {
    setExtra((e.target as HTMLInputElement).value);
  };

  // submit
  const onClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("이름을 적어주세요");
      return;
    } 
    else if (!email) {
      alert("이메일을 적어주세요");
      return;
    } 
    else if (!files) {
      alert("파일을 업로드 해주세요");
      return;
    } 
    postAuth.mutate()
  };

  const convertType = () => {
    switch (formType) {
      case "influencer":
        return "5"
      case "artist":
        return "4"
      case "enterprise":
        return "3"
      default:
        return "알수없는인증타입"
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
        <CloseButton onClick={onClose}></CloseButton>
        <Title visible={visible}>인증뱃지신청</Title>
        <Divider />
        <FormWrapper visible={visible}>
          {formType === "influencer" && (
            <ExplaneBox>
              <ExplaneText visible={visible}>
                인플루언서 뱃지를 획득하여
              </ExplaneText>
              <ExplaneText visible={visible}>
                본인이 가진 영향력을 작품에 부여하세요
              </ExplaneText>
            </ExplaneBox>
          )}
          {formType === "artist" && (
            <ExplaneBox>
              <ExplaneText visible={visible}>
                그래픽, 미디어업계의 전문가 이신가요?
              </ExplaneText>
              <ExplaneText visible={visible}>
                아티스트 뱃지로 작품의 가치를 더욱 빛내세요
              </ExplaneText>
            </ExplaneBox>
          )}
          {formType === "enterprise" && (
            <ExplaneBox>
              <ExplaneText visible={visible}>
                작품에 기업인증 뱃지를 달고
              </ExplaneText>
              <ExplaneText visible={visible}>
                기업 홍보와 함께 작품의 가치를 높이세요
              </ExplaneText>
            </ExplaneBox>
          )}
          {/* <Content>{children}</Content> */}
          <InputBox>
            <TextInputBox>
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                onChange={onChangeName}
                value={name}
                spellCheck="false"
                autoCorrect="false"
              />
            </TextInputBox>
            <TextInputBox>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                onChange={onChangeEmail}
                value={email}
                spellCheck="false"
                autoCorrect="false"
              />
            </TextInputBox>
            {formType === "influencer" && (
              <TextInputBox className="extra">
                <label htmlFor="extra">SNS 계정주소</label>
                <input
                  id="extra"
                  type="text"
                  onChange={onChangeExtra}
                  value={extra}
                  spellCheck="false"
                  autoCorrect="false"
                  autoComplete="false"
                />
              </TextInputBox>
            )}
            {formType === "artist" && (
              <TextInputBox className="extra">
                <label htmlFor="extra">포트폴리오 주소</label>
                <input
                  id="extra"
                  type="text"
                  onChange={onChangeExtra}
                  value={extra}
                  spellCheck="false"
                  autoCorrect="false"
                  autoComplete="false"
                />
              </TextInputBox>
            )}
          </InputBox>
          {/* <input type="file" multiple={true}/> */}
          <FileUploadExplaneBox>
            <div>
              {formType === "enterprise" ? (
                <ExplaneText className="first" visible={visible}>
                  귀사의 <span>사업등록증</span>을 업로드해 주세요.
                </ExplaneText>
              ) : (
                <ExplaneText className="first" visible={visible}>
                  정부에서 발급한 <span>신분증의 사진</span>을 업로드해 주세요.
                </ExplaneText>
              )}

              <ExplaneText className="first" visible={visible}>
                신분증에는 회원님의 이름, 생년월일, 사진이 있어야 합니다.
              </ExplaneText>
            </div>
            <div>
              <ExplaneText className="second" visible={visible}>
                허용되는 신분증:{" "}
              </ExplaneText>
              <ExplaneText className="second" visible={visible}>
                여권, 운전면허증, 국가발급신분증, 군인신분증, 서명된 이민증
              </ExplaneText>
            </div>
            <ExplaneText className="third" visible={visible}>
              명확한 신분증 이미지를 받아서 검토한 후에는 첨부된 문서를
            </ExplaneText>
            <ExplaneText className="third" visible={visible}>
              서버에서 영구적으로 삭제합니다.
            </ExplaneText>
          </FileUploadExplaneBox>
          <FileUploadButtonBox>
            <label className="file-label" htmlFor="chooseFile">
              파일 첨부
            </label>
            <input
              className="file"
              id="chooseFile"
              type="file"
              onChange={handleFileOnChange}
            ></input>
            <FileName>
              <div className="file-name">{files.name}</div>
            </FileName>
          </FileUploadButtonBox>

          <SubmitButton type="submit" onClick={onClickSubmit}>
            신청
          </SubmitButton>
        </FormWrapper>
      </ModalSection>
    </div>
  );
};

export default ModalBase;
