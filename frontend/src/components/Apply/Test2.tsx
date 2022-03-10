import { type } from 'os';
import React, { ReactNode, useEffect, useState, ChangeEvent, useCallback, useRef } from 'react';
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

interface IFileTypes {
  id: number;
  object: File;
}

const ModalBase = ({ children, visible, onClose, formType }: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file
          }
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: IFileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const onClickSubmit = (e:React.FormEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

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
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <CloseButton type="button" onClick={onClose}>
          X
        </CloseButton>
        <Title>인증뱃지신청</Title>
        <Divider />
        <FormWrapper>
          {formType === "influencer" && (
            <div>
              <ExplaneText>인플루언서 뱃지를 획득하기 위해서는</ExplaneText>
              <ExplaneText>
                <span>최소 팔로워수가 100명 이상</span>이여야 합니다 !
              </ExplaneText>
            </div>
          )}
          {formType === "designer" && (
            <div>
              <ExplaneText>디자인 업계의 전문가 이신가요 ?</ExplaneText>
              <ExplaneText>작품의 가치를 더욱 빛내세요 !</ExplaneText>
            </div>
          )}
          {formType === "enterprise" && (
            <div>
              <ExplaneText>작품에 기업인증 뱃지를 달고</ExplaneText>
              <ExplaneText>
                기업 홍보와 함께 작품의 가치를 높이세요 !
              </ExplaneText>
            </div>
          )}
          <Content>{children}</Content>
          <label htmlFor="name">이름</label>
          <input id="name" type="text" />
          <br></br>
          <label htmlFor="email">이메일</label>
          <input id="email" type="text" />
          <FileUpload className="DragDrop">
            <DropFileZone>
              <input
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                multiple={true}
                onChange={onChangeFiles}
              />

              <label
                className={
                  isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"
                }
                htmlFor="fileUpload"
                ref={dragRef}
              >
                <div>파일 첨부</div>
              </label>
            </DropFileZone>

            <div className="DragDrop-Files">
              {files.length > 0 &&
                files.map((file: IFileTypes) => {
                  const {
                    id,
                    object: { name },
                  } = file;

                  return (
                    <div key={id}>
                      <div>{name}</div>
                      <div
                        className="DragDrop-Files-Filter"
                        onClick={() => handleFilterFile(id)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
            </div>
          </FileUpload>
          <SubmitButton type="submit" onClick={onClickSubmit}>
            신청
          </SubmitButton>
        </FormWrapper>
      </ModalSection>
    </>
  );
};

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
  height: 60vh;
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
  margin-top: 20px;
  font-size: 30px;
  text-align: center;
`;

const Divider = styled.hr`
  border: solid 1px black;
  width: 65%;
  margin-bottom: 20px;
`;

const FormWrapper = styled.form`
  margin: 0px 15px;
`

const Content = styled.div`
  padding: 16px 0;
`;

const FileUpload = styled.div`
  border: 1px solid black;

`

const DropFileZone = styled.div`
  border: 1px solid red;
  .DragDrop {
    width: 100%;
    height: 100vh;
  }
`



const SubmitButton = styled.button`
  &:hover {
    font-weight: bold;
  }
  &:active {
    background-color: black;
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

export default ModalBase;