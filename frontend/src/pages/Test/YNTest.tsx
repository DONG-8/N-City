import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig } from "axios";
import CategoryModal, { Icategory } from "../../components/Mint/CategoryModal";
import {
  createSaleContract,
  NFTcreatorAddress,
  NFTcreatorContract,
  SaleFactoryAddress,
  SaleFactoryContract,
  SSFTokenAddress,
  SSFTokenContract,
  web3,
} from "../../web3Config";

// 동준추가
import { postProduct } from "../../store/apis/product";
import { Mutation, useMutation, useQuery } from "react-query";

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
    color: #ff7543;
  }
`;

const DoUploadText = styled.div`
  p {
    font-weight: 500;
    font-size: 25px;
    margin: 0;
    span {
      color: red;
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
    color: #de5d30;
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
      color: red;
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
    background-color: #ff865b;
    color: #fff;
    font-weight: 500;
    font-size: 25px;
    padding: 10px 0;
    width: 300px;
    height: 50px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:active {
      background-color: #de5d30;
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
      color: red;
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
    color: red;
  }
`;

//// component
const YNTest = () => {
  const [file, setFile] = useState<any>();
  const [fileSrc, setFileSrc] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<any>();
  const [thumbnailSrc, setThumbnailSrc] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryCode, setCategoryCode] = useState<any>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const { ethereum } = window;

  // category modal
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // code: 0,
  //           productDesc: "이잉",
  //           productTitle: "오엥",
  // const submitFile = useMutation<any, Error>(
  //   "submitFile",
  //   async () => {
  //     const formdata = new FormData();
  //     formdata.append("code", 3);
  //     formdata.append("productDesc", "이잉");
  //     formdata.append("productTitle", "이이잉");
  //     formdata.append("productFile", file);
  //     formdata.append("thumbnailFile", file);
  //     // formdata 확인
  //     for (var key of formdata.keys()) {
  //       console.log(key);
  //     }

  //     for (var value of formdata.values()) {
  //       console.log(value);
  //     }
  //     return await postProduct(formdata);
  //   },
  //   {
  //     onSuccess: async (res) => {
  //       const uri = res.message;
  //       const accounts = await ethereum.request({ method: "eth_accounts" });
  //       if (!accounts[0]) return;
  //       const response = await NFTcreatorContract.methods
  //         .create(accounts[0], uri)
  //         .send({
  //           from: accounts[0],
  //         });
  //       console.log(accounts[0]); // owner --> 둘다 넣어야하는거잖아 그치
  //       console.log(response.events.createNFT.returnValues._tokenId); // tokenId
  //       // 그럼 이 값을 이 컴포넌트에 순간 useState로 저장해도 상관 x 인거잖아 그치
  //       // 아니다 여기서 또 useMutate 써서 여기 인자값으로 바로 post 요쳥 보내면
  //       // putToken.mutate();
  //     },
  //     onError: (err: any) => {
  //       console.log(err, "에러발생!");
  //     },
  //   }
  // );
  //-----
  // 민팅을 통해 받은 정보를 넣어준다.
  // const putToken = useMutation<any, Error>(
  //   "putTokenId",
  //   async () => {
  //     return await putTokenID();
  //   },
  //   {
  //     onSuccess: (res) => {
  //       console.log(res, "정보 수정이 완료되었습니댜");
  //     },
  //     onError: (err: any) => {
  //       console.log(err, "put 에러발생에러발생");
  //     },
  //   }
  // );

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

    // const formdata = new FormData();
    // formdata.append("file", file);

    // console.log(formdata, "formdata");
    // // formdata 확인
    // for (var key of formdata.keys()) {
    //   console.log(key);
    // }

    // for (var value of formdata.values()) {
    //   console.log(value);
    // }

    // submitFile.mutate();
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) return;

    // 민팅
    const response = await NFTcreatorContract.methods
      .create(accounts[0], "testURI2")
      .send({
        from: accounts[0],
      });
    // console.log(accounts[0]);
    // console.log(response);
    // console.log(response.events.createNFT.returnValues._tokenId);
    const tokenId = response.events.createNFT.returnValues._tokenId;
    console.log("방금 민팅한 토큰 id", tokenId);
    console.log(
      "방금 민팅한 토큰의 owner",
      await NFTcreatorContract.methods.ownerOf(tokenId).call()
    );
    // createSale
    const date = new Date();

    //saleFactory로 권한 승인시키기
    await NFTcreatorContract.methods
      .approve(SaleFactoryAddress, tokenId)
      .send({ from: accounts[0] });

    //판매등록
    const response2 = await SaleFactoryContract.methods
      .createSale(
        tokenId,
        10,
        20,
        Math.round(date.getTime() / 1000),
        Math.round(date.getTime() / 1000) + 30,
        SSFTokenAddress,
        NFTcreatorAddress
      )
      .send({ from: accounts[0] });

    // Sale컨트랙트 목록
    const response3 = await SaleFactoryContract.methods.allSales().call();
    console.log("allsales", response3); // allsales

    // 방금 판매등록한 토큰의 Sale컨트랙트 확인
    const saleAddress = response2.events.NewSale.returnValues._saleContract;
    console.log("지금 판매등록한 Sale컨트랙트 주소", saleAddress); // 지금 판매등록한 Sale컨트랙트 주소
    const SaleContract = createSaleContract(saleAddress);
    const response4 = await SaleContract.methods.getSaleInfo().call();
    console.log("sale컨트랙트주소에 맞는 Sale컨트랙트의 정보", response4);
    // const response5 = await SaleContract.methods.getBlockTimeStamp().call();
    // console.log(response5)
    // const response6 = await SaleContract.methods.getTimeLeft().call();
    // console.log(response6)
    const response7 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("판매등록 후 토큰의 owner", response7);

    // 판매 취소
    await SaleContract.methods.cancelSales().send({ from: accounts[0] });
    const response8 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("판매 취소후 토큰의 owner", response8);

    // 토큰아이디로 Sale컨트랙트address 찾기 (위의 Sale컨트랙트 주소와 일치해야됨)
    const response9 = await SaleFactoryContract.methods
      .getSaleContractAddress(tokenId)
      .call();
    console.log("토큰아이디로 조회한 Sale컨트랙트 주소", response9);

    /////////////////// ERC20 민팅 테스트
    // await SSFTokenContract.methods.mint(1000).send({from: accounts[0]});
  };

  const [tokenId, setTokenId] = useState();
  const [account, setAccount] = useState("");
  const [saleContract, setSaleContract] = useState<any>()
  const [saleContractAddress, setSaleContractAddress] = useState<any>()

  const [bidAmount, setBidAmount] = useState<any>("")
  const [purchaseAmount, setPurchaseAmount] = useState<any>("")
  const accountCall = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" })
    setAccount(accounts[0])
  }
  useEffect(() => {
    accountCall()
  }, [account]);

  const onClickUpdate = async (e) => {
    e.preventDefault();
    accountCall()
  }

  const onClickMint = async (e) => {
    e.preventDefault();
    if (!account) return ;
    const response = await NFTcreatorContract.methods
      .create(account, "testURI2")
      .send({
        from: account,
      });
    await setTokenId(response.events.createNFT.returnValues._tokenId);
    console.log("방금 민팅한 토큰 id", response.events.createNFT.returnValues._tokenId);
    console.log(
      "방금 민팅한 토큰의 owner",
      await NFTcreatorContract.methods.ownerOf(response.events.createNFT.returnValues._tokenId).call()
    );
  }

  const onClickCreateSale = async (e) => {
    e.preventDefault();
    //saleFactory로 권한 승인시키기
    await NFTcreatorContract.methods
      .approve(SaleFactoryAddress, tokenId)
      .send({ from: account });

    //판매등록
    const date = new Date();
    const response2 = await SaleFactoryContract.methods
      .createSale(
        tokenId,
        20,
        20,
        Math.round(date.getTime() / 1000),
        Math.round(date.getTime() / 1000) + 999999999999,
        SSFTokenAddress,
        NFTcreatorAddress
      )
      .send({ from: account });

    // 방금 판매등록한 토큰의 Sale컨트랙트 확인
    const temp = (response2.events.NewSale.returnValues._saleContract);
    console.log("지금 판매등록한 Sale컨트랙트 주소", temp); // 지금 판매등록한 Sale컨트랙트 주소
    await setSaleContractAddress(temp);
    const nowSaleContract = await createSaleContract(temp)
    await setSaleContract(nowSaleContract);
    const response4 = await nowSaleContract.methods.getSaleInfo().call();
    console.log("sale컨트랙트주소에 맞는 Sale컨트랙트의 정보", response4);
    // const response5 = await SaleContract.methods.getBlockTimeStamp().call();
    // console.log(response5)
    // const response6 = await SaleContract.methods.getTimeLeft().call();
    // console.log(response6)
    const response7 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("판매등록 후 토큰의 owner", response7);
  }

  const onClickCancelSale = async (e) => {
    e.preventDefault();
    await saleContract.methods.cancelSales().send({ from: account });
    const response8 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("판매 취소후 토큰의 owner", response8);
  }

  const onClickCreateAuction = async (e) => {
    e.preventDefault();
    //saleFactory로 권한 승인시키기
    await NFTcreatorContract.methods
      .approve(SaleFactoryAddress, tokenId)
      .send({ from: account });

    //경매등록
    const date = new Date();
    const response2 = await SaleFactoryContract.methods
      .createSale(
        tokenId,
        20,
        99999999999,
        Math.round(date.getTime() / 1000),
        Math.round(date.getTime() / 1000) + 90,
        SSFTokenAddress,
        NFTcreatorAddress
      )
      .send({ from: account });

    // 방금 경매등록한 토큰의 Sale컨트랙트 확인
    const temp = (response2.events.NewSale.returnValues._saleContract);
    await setSaleContractAddress(temp);
    console.log("지금 경매등록한 Sale컨트랙트 주소", temp); // 지금 판매등록한 Sale컨트랙트 주소
    const nowSaleContract = await createSaleContract(temp)
    await setSaleContract(nowSaleContract);
    const response4 = await nowSaleContract.methods.getSaleInfo().call();
    console.log("sale컨트랙트주소에 맞는 Sale컨트랙트의 정보", response4);
    // const response5 = await SaleContract.methods.getBlockTimeStamp().call();
    // console.log(response5)
    // const response6 = await SaleContract.methods.getTimeLeft().call();
    // console.log(response6)
    const response7 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("경매등록 후 토큰의 owner", response7);
  }

  const onClickCancelAuction = async (e) => {
    e.preventDefault();
    await saleContract.methods.cancelAuction().send({ from: account });
    const response8 = await NFTcreatorContract.methods.ownerOf(tokenId).call();
    console.log("경매 취소후 토큰의 owner", response8);
  }

  const onClickBid = async (e) => {
    e.preventDefault();
    //sale로 권한 승인시키기
    await SSFTokenContract.methods
      .approve(saleContractAddress, bidAmount)
      .send({ from: account });
    
    //bid 요청
    const response = await saleContract.methods.bid(bidAmount).send({ from: account });
    const temp = (response.events.HighestBidIncereased.returnValues.bidder);
    const temp2 = (response.events.HighestBidIncereased.returnValues.amount);
    console.log("현재 최고 제안자", temp)
    console.log("현재 최고 제안가", temp2)
  }

  const onClickPurchase = async (e) => {
    e.preventDefault();
    //sale로 권한 승인시키기
    await SSFTokenContract.methods
      .approve(saleContractAddress, purchaseAmount)
      .send({ from: account });

    //purchase 요청
    const response = await saleContract.methods.purchase(purchaseAmount).send({ from: account });
    const temp = (response.events.SaleEnded.returnValues.winner);
    const temp2 = (response.events.SaleEnded.returnValues.amount);
    console.log("구매자", temp)
    console.log("구매가격", temp2)
  }

  const onClickConfirmItem = async (e) => {
    e.preventDefault();
    const response = await saleContract.methods.confirmItem().send({ from: account });
    const temp = (response.events.SaleEnded.returnValues.winner);
    const temp2 = (response.events.SaleEnded.returnValues.amount);
    console.log("경매끝 최종 구매자", temp)
    console.log("경매끝 최종 구매 가격", temp2)
  }

  const onClickAddCoin = async (e) => {
    e.preventDefault();
    await SSFTokenContract.methods.mint(2000).send({ from: account });
  }

  const onClickSendCoin = async (e) => {
    e.preventDefault();
  //   const prkey="a630f5724bbeb3c7ce6c28eef75b51377802c600a309630209ee6720f94cf786"
  //   const tempAccount = web3.eth.accounts.privateKeyToAccount(prkey).address;
  //   const transaction = SSFTokenContract.methods.forceToTransfer("0x0B8360BE1DA812ac879e6f38A21ce1CF57511d6e", account, 1000)
  //   const options = {
  //     to      : transaction._parent._address,
  //     data    : transaction.encodeABI(),
  //     gas     : await transaction.estimateGas({from: tempAccount}),
  // };
  //   const signed = await web3.eth.accounts.signTransaction(options, prkey)
  //   const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction as string);
  //   return receipt;
    await SSFTokenContract.methods.forceToTransfer("0x0B8360BE1DA812ac879e6f38A21ce1CF57511d6e", account, 1000).send({ from: "0x0B8360BE1DA812ac879e6f38A21ce1CF57511d6e" });
  }

  const onClickTokenOwner = async (e) => {
    e.preventDefault();
    console.log(await NFTcreatorContract.methods.ownerOf(tokenId).call());
  }

  const onClickSetApprovedForAll = async (e) => {
    e.preventDefault();
    await NFTcreatorContract.methods
      .setApprovalForAll(SaleFactoryAddress, true)
      .send({ from: account });
  }

  const onClickSetApprovedForAllERC20 = async (e) => {
    e.preventDefault();
    await SSFTokenContract.methods
      .setApprovalForAll(SaleFactoryAddress, true)
      .send({ from: account });
  }


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
    // console.log((e.target as HTMLInputElement).value)
  };

  const onChangeDescription = (e: React.ChangeEvent) => {
    setDescription((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };

  const onChangeBid = async (e: React.ChangeEvent) => {
    await setBidAmount((e.target as HTMLInputElement).value);
    console.log(bidAmount);
  };

  const onChangePurchase = async (e: React.ChangeEvent) => {
    await setPurchaseAmount((e.target as HTMLInputElement).value);
    console.log((e.target as HTMLInputElement).value);
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    console.log("메인파일변화");
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeMainFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent) => {
    console.log("썸네일파일변화");
    setThumbnail((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
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

  console.log(file);
  console.log(thumbnail);

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
            <p className="secondpart">100MB를 넘지않는</p>
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
            value={tokenName}
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
        <div>
          <video src={"https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/da79a0c6-bd02-42d3-bd17-25ac3540783d.m4a"} controls></video>
        </div>
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
        <p>지금 연결된 지갑: {account}</p>
        <p>ERC20 address: {SSFTokenAddress}</p>
        <ButtonBox>
          <button onClick={onClickUpdate}>지갑업데이트</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickTokenOwner}>토큰주인이 누구?</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickMint}>민팅</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickCreateSale}>판매등록</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickCancelSale}>cancelSales</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickCreateAuction}>경매등록</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickCancelAuction}>cancelAuction</button>
        <ButtonBox>
          <button onClick={onClickAddCoin}>돈충전</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickSendCoin}>지갑2에게 돈나눠주기</button>
        </ButtonBox>
        </ButtonBox>
        <input type="text" onChange={onChangeBid} value={bidAmount} />
        <ButtonBox>
          <button onClick={onClickBid}>bid</button>
        </ButtonBox>
        <input type="text" onChange={onChangePurchase} value={purchaseAmount} />
        <ButtonBox>
          <button onClick={onClickPurchase}>purchase</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickConfirmItem}>confirmItem</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickSetApprovedForAll}>setApprovedForAll to SaleFactory</button>
        </ButtonBox>
        <ButtonBox>
          <button onClick={onClickSetApprovedForAllERC20}>setApprovedForAll to SaleFactory ERC20</button>
        </ButtonBox>
      </FormBox>

    </Wrapper>
  );
};

export default YNTest;
