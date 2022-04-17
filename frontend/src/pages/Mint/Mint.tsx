import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig } from "axios";
import CategoryModal, { Icategory } from "../../components/Mint/CategoryModal";
import { NFTcreatorContract } from "../../web3Config";
import { getUserInfo } from "../../store/apis/user";

// 동준추가
import { postProduct, putTokenID } from "../../store/apis/product";
import { Mutation, useMutation, useQuery } from "react-query";
import IsLoading from "../NFTStore/IsLoading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 5vh 24vw;
`;

const Title = styled.h1`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 50px;
  span {
    color: #6225E6  ;
  }
`;

const DoUploadText = styled.div`
  p {
    font-weight: 500;
    font-size: 25px;
    margin: 0;
    span {
      color: #6225E6;
    }
  }
`;

const ExplaneBox = styled.div`
  margin-top: 8px;
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
    margin-top: 40px;
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
    margin-left: 15px;
    font-weight: bold;
    font-size: 18px;
    color: #6225E6;
  }
`;

const Change = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding: 5px 0;
`;

const FormBox = styled.form``;

const NameInputBox = styled.div`
  font-weight: 500;
  font-size: 25px;
  margin-top: 50px;
  p {
    margin: 8px 0;
    span {
      color: #6225E6;
    }
  }
  input {
    margin: 0;
    border: 1px solid lightgray;
    border-radius: 5px;
    height: 20px;
    width: 300px;
    padding: 10px;
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
    border: 1px solid #6225E6;
    color: #6225E6;
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
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-top: 0;
    width: 100%;
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
  margin-top: 0;
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
    background-color: #6225E6;
    color: #fff;
    font-weight: 500;
    font-size: 25px;
    padding: 10px 0;
    width: 300px;
    height: 50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      background-color: rgb(86, 43, 177);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }
  }
`;

const ThumbnailUploadBox = styled(UploadBox)`
  label {
    margin-top: 12px;
    width: 240px;
    height: 240px;
    div {
      img {
        max-width: 240px;
        max-height: 240px;
        object-fit: cover;
      }
    }
  }
`;

const ThumbnailExplain = styled.div`
  p {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 0;
    span {
      color: #6225E6;
    }
  }
`;
const LoadingBox = styled.div`
  text-align: center;
  margin-top: 10vh;
  h1{
    margin-top: -15vh;
    color: white;
    font-weight: 500;
  }
  h3{
    color: white;
    font-weight: 500;

  }
`
const Plus = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' fill='rgb(86, 36, 195)'/%3E%3C/svg%3E");
  width: 100px;
  height: 100px;
`;

const HashtagBox = styled.div`
  span {
    font-size: 18px;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HashtagPlus = styled(Plus)`
  display: inline-block;
  width: 25px;
  height: 25px;
`;

const Required = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  color: gray;
  span {
    color: #6225E6;
  }
`;

//// component
const Mint = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [fileSrc, setFileSrc] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<any>();
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<any>(null);
  const [categoryCode, setCategoryCode] = useState<any>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("")
  const { ethereum } = window;
  const navigate = useNavigate()
  // category modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const submitFile = useMutation<any, Error>(
    "submitFile",
    async () => {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!accounts[0]) {
        alert("지갑을 연결해주세요")
        navigate("/login")
        return;
      }

      const formdata = new FormData();
      if (isVideoAudio()){
        formdata.append("code", categoryCode);
        formdata.append("productDesc", description);
        formdata.append("productTitle", tokenName);
        formdata.append("productFile", file);
        formdata.append("thumbnailFile", thumbnail);
      } else {
        formdata.append("code", categoryCode);
        formdata.append("productDesc", description);
        formdata.append("productTitle", tokenName);
        formdata.append("productFile", file);
        formdata.append("thumbnailFile", file);
      }

      // formdata 확인
      for (var key of formdata.keys()) {
      }

      for (var value of formdata.values()) {
      }
      return await postProduct(formdata);
    },
    {
      onSuccess: async (res) => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        setProductId(res.productId)
        const uri = res.message;
        await setIsLoading(true);
        const response = await NFTcreatorContract.methods
          .create(accounts[0], uri)
          .send({
            from: accounts[0],
          });
          await setTokenId(response.events.createNFT.returnValues._tokenId);
          
          putToken.mutate();
          await setIsLoading(false);
          navigate(`/mypage/${sessionStorage.getItem("userId")}`)
          // window.location.reload()
           
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  ); 
  // 민팅을 통해 받은 정보를 넣어준다.
  const putToken = useMutation<any, Error>(
    "putTokenId",
    async () => {
      const body = {
        "productId": productId,
        "tokenId": tokenId
      }
      return await putTokenID(body);
    },
    {
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        if (err.response.status === 401) { 
          navigate("/login")
        }
      },
    }
  );

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("작품을 업로드 해주세요");
      return;
    } else if (isVideoAudio() && !thumbnail) {
      alert("작품의 미리보기 파일을 업로드 해주세요");
      return;
    } else if (!tokenName) {
      alert("작품이름을 입력해주세요");
      return;
    }
    submitFile.mutate();
  };

  const encodeMainFileToBasek64 = (fileBlob: any) => {
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

  const encodeThumbnailToBasek64 = (fileBlob: any) => {
    const reader: any = new FileReader();
    if (fileBlob) {
      reader.readAsDataURL(fileBlob);
    }
    return new Promise(() => {
      reader.onload = () => {
        setThumbnailSrc(reader.result);
      };
    });
  };

  const onChangeTokenName = (e: React.ChangeEvent) => {
    setTokenName((e.target as HTMLInputElement).value);
  };

  const onChangeDescription = (e: React.ChangeEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    setFile((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeMainFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent) => {
    setThumbnail((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeThumbnailToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const isVideoAudio = () => {
    if (
      file?.type.slice(0, 5) === "video" ||
      file?.type.slice(0, 5) === "audio"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const previewMainImage = () => {
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

  const previewThumbnailImage = () => {
    if (thumbnail) {
      return (
        <div className="preview">
          {" "}
          {thumbnailSrc && <img src={thumbnailSrc} alt="preview-img" />}{" "}
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

  const getMyInfo = useMutation<any, Error>(
    "getUserInfo",
    async () => {
      if (sessionStorage.getItem("userId")) {
        return await getUserInfo(Number(sessionStorage.getItem("userId")));
      } else {
        navigate("/login")
        return;
      }
    },
    {
      onSuccess: async (res) => {
        setUserRole(res.userRole)
      },
      onError: (err: any) => {
      },
    }
  );

  useEffect(() => {
    getMyInfo.mutate()
  },[])


  useEffect(() => {
    if (file?.type.slice(0, 5) === "video") {
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
      {isLoading ? (
          <LoadingBox>
            <IsLoading />
            <h1>작품 등록중.. </h1>
            <h3>팁) 내가 가진 작품은 마이룸에 전시할 수 있습니다.</h3>
          </LoadingBox>
        ) :<>
      <Required>
        <span>*</span>필수
      </Required>
      <DoUploadText>
        <p>
          작품을 업로드 해주세요<span>*</span>
        </p>
      </DoUploadText>
      <FormBox>
        <UploadBox>
          <p className="file-name">{file?.name}</p>
          <label className={file?.type.slice(0, 5)} htmlFor="chooseFile">
            {previewMainImage()}
            {isVideo && <Change>Change</Change>}
          </label>
          <input
            className="file"
            id="chooseFile"
            type="file"
            accept="audio/*, video/*, image/*"
            onChange={handleFileOnChange}
          ></input>
          <ExplaneBox>
            <p className="secondpart">10MB를 넘지않는</p>
            <p>JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG</p>
            <p>파일만 가능합니다.</p>
          </ExplaneBox>
          {/* {file?.type.slice(0, 5)} */}
        </UploadBox>
        {isVideoAudio() && (
          <ThumbnailUploadBox>
            <ThumbnailExplain>
              <p>
                미리보기 이미지를 업로드해주세요<span>*</span>
              </p>
            </ThumbnailExplain>
            <label className={file?.type.slice(0, 5)} htmlFor="chooseThumbnail">
              {previewThumbnailImage()}
            </label>
            <input
              className="file"
              id="chooseThumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
            ></input>
          </ThumbnailUploadBox>
        )}
        <NameInputBox>
          <p>
            작품이름<span>*</span>
          </p>
          <input
            type="text"
            onChange={onChangeTokenName}
            // value={tokenName}
            spellCheck={false}
          />
        </NameInputBox>
        <DescriptionInputBox>
          <p>작품설명</p>
          <textarea
            onChange={onChangeDescription}
            value={description}
            spellCheck={false}
          />
        </DescriptionInputBox>
        <CategoryBox>
          <p>카테고리</p>
        </CategoryBox>
        {category ? (
          <Categories>
            <p onClick={handleModalOpen}># {category}</p>
          </Categories>
        ) : (
          <HashtagBox onClick={handleModalOpen}>
            <span>카테고리를 추가해 주세요</span>
            <HashtagPlus />
          </HashtagBox>
        )}
          <ButtonBox>
            <Button variant="contained" onClick={onClickSubmit}>
              작품등록
            </Button>
          </ButtonBox>       
      </FormBox>

      <CategoryModal
        visible={isOpen}
        onClose={handleModalClose}
        openStateHandler={setIsOpen}
        setCategory={setCategory}
        setCategoryCode={setCategoryCode}
        userRole={userRole}
      ></CategoryModal>
      </>}
    </Wrapper>
  );
};

export default Mint;
