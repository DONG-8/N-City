import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig } from "axios";
import CategoryModal, {
  Icategory,
} from "../../components/SalesResistration/CategoryModal";

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 3vh 7vw;
`;

const Title = styled.h1`
  margin-top: 60px;
  font-size: 50px;
  span {
    color: #ff7543;
  }
`;

const ExplaneBox = styled.div`
  p {
    font-size: 20px;
    margin: 0;
  }
`;

const UploadBox = styled.div`
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    color: black;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    width: 500px;
    height: 310px;
    border: 3px dashed lightgray;
    border-radius: 15px;
    cursor: pointer;
    div {
      img {
        max-width: 480px;
        max-height: 310px;
        object-fit: cover;
      }
      video {
        max-width: 490px;
        max-height: 310px;
        object-fit: cover;
      }
    }
    audio {
      width: 420px;
    }
  }
  .file {
    display: none;
  }
  .file-name {
    position: absolute;
    margin-top: -32px;
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    color: #de5d30;
  }
`;

const Change = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const FormBox = styled.form``;

const NameInputBox = styled.div`
  font-weight: 500;
  font-size: 25px;
  margin-top: 50px;
  p {
    margin: 8px 0;
  }
  input {
    margin: 0;
    border: 1px solid lightgray;
    border-radius: 5px;
    height: 20px;
    width: 300px;
    padding: 7px;
    font-size: 16px;
    font-family: inherit;
    :focus {
      outline: none;
    }
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 10px;
  p {
    background-color: white;
    border: 1px solid #ff865b;
    color: #ff865b;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 7px 10px;
    margin: 5px 3px;
    height: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
`;

const DescriptionInputBox = styled.div`
  font-weight: 500;
  margin-top: 30px;
  font-size: 25px;
  p {
    margin: 8px 0;
  }
  textarea {

    border: 1px solid lightgray;
    border-radius: 5px;
    margin-top: 0;
    width: 80vw;
    height: 100px;
    resize: none;
    font-family: inherit;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 25px;
  margin-top: 20px;
  p {
    margin-bottom: 8px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto 200px;
  button {
    font-family: "Noto Sans KR", sans-serif;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff865b;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 0;
    width: 200px;
    height: 50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      width: 202px;
      height: 52px;
    }
    &:active {
      background-color: #de5d30;
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }
  }
`;

const Plus = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' fill='rgba(255,134,91,1)'/%3E%3C/svg%3E");
  width: 100px;
  height: 100px;
`;

const HashtagBox = styled.div`
  span {
    font-size: 17px;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
`

const HashtagPlus = styled(Plus)`
  display: inline-block;
  width: 25px;
  height: 25px;
`

//// component
const SalesResistration = () => {
  const [fileSrc, setFileSrc] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [file, setFile] = useState<any>();
  const [isVideo, setIsVideo] = useState(false);

  // category modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const onClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);

    // formdata 확인
    for (var key of formdata.keys()) {
      console.log(key);
    }

    for (var value of formdata.values()) {
      console.log(value);
    }

    // 여기서 post요청
    // (async () => {
    //   try {
    //     const config = {
    //       Headers: {
    //         "content-type": "multipart/form-data",
    //       },
    //     };
    //     const response = await axios.post("url", formdata, config as AxiosRequestConfig<FormData>);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  };

  const encodeFileToBasek64 = (fileBlob: any) => {
    const reader: any = new FileReader();
    if (fileBlob) {
      reader.readAsDataURL(fileBlob);
    }
    return new Promise(() => {
      reader.onload = () => {
        setFileSrc(reader.result);
      };
    });
  };

  const onChangeTokenName = (e: React.ChangeEvent) => {
    setTokenName((e.target as HTMLInputElement).value);
    // console.log((e.target as HTMLInputElement).value)
  };

  const onChangeDescription = (e: React.ChangeEvent) => {
    setDescription((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const previewImage = () => {
    if (file?.type.slice(0, 5) === "image") {
      return (
        <div className="preview">
          {" "}
          {fileSrc && <img src={fileSrc} alt="preview-img" />}{" "}
        </div>
      );
    } else if (file?.type.slice(0, 5) === "video") {
      return (
        <div>
          <video src={fileSrc} controls></video>
        </div>
      );
    } else if (file?.type.slice(0, 5) === "audio") {
      return (
        <div>
          <audio src={fileSrc} controls></audio>
        </div>
      );
    } else if (file) {
      alert("부적절한 파일입니다.");
      return (
        <div>
          <Plus></Plus>
        </div>
      );
    } else {
      return (
        <div>
          <Plus></Plus>
        </div>
      );
    }
  };

  useEffect(() => {
    if (
      file?.type.slice(0, 5) === "video"
    ) {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
  }, [file]);

  return (
    <Wrapper>
      <Title>
        <span>NFT </span>작품 등록하기
      </Title>
      <FormBox>
        <UploadBox>
          <p className="file-name">{file?.name}</p>
          <label className={file?.type.slice(0, 5)} htmlFor="chooseFile">
            {previewImage()}
            {file?.type.slice(0, 5) === "video"}
            {isVideo && <Change>Change</Change>}
          </label>
          <input
            className="file"
            id="chooseFile"
            type="file"
            accept="audio/*, video/*, image/*"
            onChange={handleFileOnChange}
          ></input>
          <br></br>
          <ExplaneBox>
            <p className="secondpart">100MB를 넘지않는</p>
            <p>JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG</p>
            <p>파일만 가능합니다.</p>
          </ExplaneBox>
          {/* {file?.type.slice(0, 5)} */}
        </UploadBox>
        <NameInputBox>
          <p>작품이름*: </p>
          <input
            type="text"
            onChange={onChangeTokenName}
            value={tokenName}
            spellCheck={false}
          />
        </NameInputBox>
        <DescriptionInputBox>
          <p>작품설명 :</p>
          <textarea
            onChange={onChangeDescription}
            value={description}
            spellCheck={false}
          />
        </DescriptionInputBox>
        <CategoryBox>
          <p>카테고리</p>
        </CategoryBox>
        {categories.length !== 0 ? (
          <Categories>
            {categories.map((category) => (
              <p key={category} onClick={handleModalOpen}>
                # {category}
              </p>
            ))}
          </Categories>
        ) : (
          <HashtagBox onClick={handleModalOpen} >
            <span>카테고리를 추가해 주세요</span>
            <HashtagPlus/>
          </HashtagBox>
        )}

        {/* <HashtagPlus onClick={handleModalOpen} /> */}

        <ButtonBox>
          <button onClick={onClickSubmit}>작품등록</button>
        </ButtonBox>
      </FormBox>
      <CategoryModal
        visible={isOpen}
        onClose={handleModalClose}
        openStateHandler={setIsOpen}
        setCategories={setCategories}
      ></CategoryModal>
    </Wrapper>
  );
};

export default SalesResistration;
