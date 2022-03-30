import { Modal, Input, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation } from "react-query";
import { postRegisterAuction, postRegisterPurchase } from "../../store/apis/deal";
import {
  NFTcreatorAddress,
  NFTcreatorContract,
  SaleFactoryAddress,
  SaleFactoryContract,
  SSFTokenAddress,
  SSFTokenContract,
} from "../../web3Config";
interface Iprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    productId: number;
    productTitle: string;
    productPrice: number;
    productThumbnailUrl: string;
    productFavorite: number;
    productRegDt: Object;
    productCode: number;
    productState: number;
    productFavoriteCount: number;
    favorite: boolean;
    tokenId?: number;
  };
}
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50%;
  height: 60%;
  border-radius: 5px;
  .title {
    text-align: center;
    font-size: 2.5vh;
    width: 80%;
    border-bottom: 1px solid red;
    margin: auto;
  }
`;
const Session1 = styled.div`
  .choiceBox {
    width: 35vw;
    height: 20vh;
    margin: auto;
    display: flex;
    align-items: center;
    .choice1 {
      flex: 5;
      cursor: pointer;
      font-size: 2rem;
      text-align: center;
      background-color: #ffefef;
      font-weight: 1000;
      &:hover {
        background-color: #fecdbb;
        transition: 0.1s;
      }
    }
    .choice2 {
      /* border: 1px solid gray; */
      flex: 5;
      cursor: pointer;
      font-size: 2rem;
      text-align: center;
      background-color: #ffefef;
      font-weight: 1000;
      &:hover {
        background-color: #fecdbb;
        transition: 0.1s;
      }
    }
  }
  .endChoice {
    align-items: center;
    background-color: #fecdbb;
    font-weight: 1000;
    font-size: 1.5rem;
    width: 35vw;
    height: 7vh;
    margin: auto;
    text-align: center;
    p {
      padding-top: 0.5rem;
    }
  }
  #choiced {
    display: none;
    transition: all 0.3s;
  }
  #endChoice {
    display: none;
    transition: all 0.3s;
  }
`;
const Session2 = styled.div`
  margin: auto;
  margin-top: 10vh;
  text-align: center;

  .price {
    font-size: 2rem;
    font-weight: 1000;
    input {
      font-size: 2rem;
      width: 10rem;
      text-align: right;
    }
    img {
      position: absolute;
      height: 3rem;
    }
  }
  .back {
    width: 3vw;
    height: 7vh;
    margin-top: 12vh;
    font-weight: 1000;
    font-size: 2rem;
    margin-right: 5rem;
  }
  .sell {
    width: 50%;
    height: 7vh;
    margin-top: 12vh;
    font-size: 2rem;
    /* font-weight: 1000; */
    /* background-color:#FEAD9D ; */
    &:hover {
      /* background-color:#FB8973 ; */
    }
  }
`;
const Exit = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;
const SaleModal: React.FC<Iprops> = ({ open, setOpen, item }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [session1, setSession1] = useState("");
  const [value, setValue] = useState(0);
  const [period, setPeriod] = useState(0);
  const { ethereum } = window;

  const resistSell = useMutation<any, Error>(
    "resistSell",
    async () => {
      return await postRegisterPurchase(value, item.productId);
    },
    {
      onSuccess: async (res) => {
        console.log("구매등록성공", res);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  );

  const resistAuction = useMutation<any, Error>(
    "resistAuction",
    async () => {
      return await postRegisterAuction(value, item.productId, period);
    },
    {
      onSuccess: async (res) => {
        console.log("경매등록성공", res);
      },
      onError: (err: any) => {
        console.log(err, "에러발생");
      },
    }
  );

  const onClickSell = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) {
      alert("지갑을 연결해주세요");
      return;
    } else if (value === 0) {
      alert("구매시작가를 입력해주세요");
      return;
    }
    try {
      // 판매등록
      const date = new Date();
      const response = await SaleFactoryContract.methods
        .createSale(
          item.tokenId,
          value,
          value,
          Math.round(date.getTime() / 1000),
          Math.round(date.getTime() / 1000) + 999999999999,
          SSFTokenAddress,
          NFTcreatorAddress
        )
        .send({ from: accounts[0] });
      console.log(response);
      console.log(item.productId, value)
      await resistSell.mutate();
      window.location.reload();
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };

  const onClickAuction = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts[0]) {
      alert("지갑을 연결해주세요");
      return;
    } else if (value === 0) {
      alert("경매시작가를 입력해주세요");
      return;
    } else if (period === 0) {
      alert("경매기간을 입력해주세요");
      return;
    }
    try {
      //경매등록
      const date = new Date();
      const response = await SaleFactoryContract.methods
        .createSale(
          item.tokenId,
          20,
          999999999999,
          Math.round(date.getTime() / 1000),
          Math.round(date.getTime() / 1000 + (period * 60 * 60 * 24)),
          SSFTokenAddress,
          NFTcreatorAddress
        )
        .send({ from: accounts[0] });
      console.log(response);
      await resistAuction.mutate();
      window.location.reload();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  useEffect(() => {
    setSession1("");
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <div className="title">
          <h1>판매등록</h1>
        </div>
        <Exit>
          <CloseIcon
            onClick={() => {
              handleClose();
            }}
          />
        </Exit>
        <Session1>
          <div id={session1 && "choiced"} className="choiceBox">
            <div onClick={() => setSession1("Fix")} className="choice1">
              <p>즉시 판매</p>
            </div>
            <div onClick={() => setSession1("Auction")} className="choice2">
              <p>경매로 올리기</p>
            </div>
          </div>
          <div id={session1 ? undefined : "endChoice"} className="endChoice">
            {session1 === "Fix" && <p>즉시 판매</p>}
            {session1 === "Auction" && <p>경매로 올리기</p>}
          </div>
        </Session1>
        {session1 === "Fix" && (
          <Session2>
            <div className="price">
              희망 가격 :{" "}
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(Number(e.target.value));
                  console.log(value);
                }}
              />{" "}
              NCT
            </div>
            <Button
              onClick={() => setSession1("")}
              className="back"
              variant="contained"
              color="inherit"
            >
              <ArrowBackIcon />
            </Button>
            <Button
              className="sell"
              variant="contained"
              color="primary"
              onClick={onClickSell}
            >
              판매 개시
            </Button>
          </Session2>
        )}
        {session1 === "Auction" && (
          <Session2>
            <div className="price">
              시작가격 :{" "}
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(Number(e.target.value));
                  console.log(value);
                }}
              />{" "}
              NCT
            </div>
            <div className="price">
              경매기간 :{" "}
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPeriod(Number(e.target.value));
                  console.log(period);
                }}
              />
              일
            </div>
            <Button
              onClick={() => setSession1("")}
              className="back"
              variant="contained"
              color="inherit"
            >
              <ArrowBackIcon />
            </Button>
            <Button
              className="sell"
              variant="contained"
              color="primary"
              onClick={onClickAuction}
            >
              경매 올리기
            </Button>
          </Session2>
        )}
      </Wrapper>
    </Modal>
  );
};

export default SaleModal;
