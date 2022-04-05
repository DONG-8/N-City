import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import ConfirmModal from "../../components/admin/ConfirmModal";
import MintERC20Modal from "../../components/admin/MintERC20Modal";
import { getAllAuthentication, getAuthNewUsers, patchAutentication, putAuthSendToken } from "../../store/apis/authentication";
import { SSFTokenContract } from "../../web3Config";

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

const Title = styled.div`
  background-color: #f8d9ce;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin-left: 70px;
    font-size: 25px;
  }
  div {
    display: flex;
    align-items: center;
    margin-right: 70px;
    button {
      font-family: "Noto Sans KR", sans-serif;
      border-radius: 15px;
      border: 1px solid black;
      padding: 10px 0;
      font-weight: bold;
      text-align: center;
      width: 180px;
    }
  }
`;

const FilterBar = styled.div`
  margin: auto;
  margin-top: 3vh;
  width: 70%;
  display: flex;
  div {
    cursor: pointer;
    flex: 2.5;
    height: 6vh;
    text-align: center;
    &:hover {
      background-color: whitesmoke;
      transition: 0.3s;
    }
    p {
      font-size: 2.5vh;
      margin-top: 1vh;
      font-weight: 600;
    }
  }
  div {
    /* background-color: #F5B6A0; */
    border-bottom: 2px solid #f43b00;
  }

  #select {
    background-color: white;
    border-left: 2px solid #f43b00;
    border-right: 2px solid #f43b00;
    border-top: 2px solid #f43b00;
    border-bottom: none;
    color: #ff7248;
    &:hover {
      background-color: #f9f9f9;
      transition: 0.3s;
    }
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  margin-bottom: 3px;
  width: 80%;
  padding-right: 10px;
  div {
    font-weight: 500;
    padding: 10px;
  }
  .id {
    width: 12%;
    margin-left: 20px;
  }
  .name {
    width: 12%;
  }
  .email {
    width: 20%;
  }
  .file {
    width: 12%;
    button {
      border: 1px solid #ff865b;
      color: #ff865b;
      width: 100px;
    }
  }
  .userId {
    width: 5%;
    margin-left: 20px;
  }
  .nickname {
    width: 10%;
  }
  .address {

  }  
  .button {
    border-radius: 15px;
    padding: 10px 0;
    font-weight: bold;
    text-align: center;
    width: 70px;
  }
  .sendBtn {
    border: 1px solid #3d1da9;
    color: #3d1da9;
    margin-right: 20px;
  }
  .approveBtn {
    border: 1px solid #399b20;
    color: #399b20;
  }
  .rejectBtn {
    margin-left: 10px;
    border: 1px solid #e34558;
    color: #e34558;
  }
`;

const ApproveBtnBox = styled.div`
  display: flex;
`

export interface IApply {
  "apply": {
    userNick: string;
    authentication: {
      authEmail: string;
      authExtra?: string;
      authId: number;
      authName: string;
      authRegAt: string;
      authType: number;
      authUrl: string;
    };
  };
  // "newUsers": {
  //   authId?: number;
  //   userAddress: string;
  //   userDescription?: string;
  //   userEmail?: string;
  //   userEmailConfirm: boolean;
  //   userId: number;
  //   userImgUrl?: string;
  //   userNick: string;
  //   userRole: string;
  // };
}

const Admin = () => {
  const [influencer, setInfluencer] = useState<IApply["apply"][]>([]);
  const [artist, setArtist] = useState<IApply["apply"][]>([]);
  const [enterprise, setEnterprise] = useState<IApply["apply"][]>([]);
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [tokenApplyUsers, setTokenApplyUsers] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMintOpen, setIsMintOpen] = useState<boolean>(false);
  const [status, setStatus] = useState("influencer");
  const [control, setControl] = useState("");
  const [selectedItem, setSelectedItem] = useState<IApply>();
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState(0)
  const [total, setTotal] = useState(0)
  const [newUserId, setNewUserId] = useState(0)
  // 이름, 이메일, 파일
  const { ethereum } = window;

  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAccount(accounts[0])
    console.log(accounts[0])
  }

  const getBalance = async () => {
    const response = await SSFTokenContract.methods.balanceOf(account).call();
    const response2 = await SSFTokenContract.methods.totalSupply().call();
    
    console.log(response)
    setBalance(response)
    setTotal(response2)
  }


  const getArtist = useMutation<any, Error>(
    "getDesiner",
    async () => {
      return await getAllAuthentication(4);
    },
    {
      onSuccess: (res) => {
        console.log("디자이너 불러오기 성공!",res);
        setArtist(res.content);
      },
      onError: (err: any) => {
        console.log("❌디자이너 불러오기 실패!",err);
      },
    }
  );
  const getInfluencer = useMutation<any, Error>(
    "getInfluencer",
    async () => {
      return await getAllAuthentication(5);
    },
    {
      onSuccess: (res) => {
        console.log("인플루언서 불러오기 성공!",res);
        setInfluencer(res.content);
      },
      onError: (err: any) => {
        console.log("❌인플루언서 불러오기 실패!",err);
      },
    }
  );
  const getEnterpise = useMutation<any, Error>(
    "getEnterpise",
    async () => {
      return await getAllAuthentication(3);
    },
    {
      onSuccess: (res) => {
        console.log("기업 불러오기 성공!",res);
        setEnterprise(res.content);
      },
      onError: (err: any) => {
        console.log("❌기업 불러오기 실패!",err);
      },
    }
  );

  const getNewUsers = useMutation<any, Error>(
    "getNewUsers",
    async () => {
      return await getAuthNewUsers("ROLE_NEW");
    },
    {
      onSuccess: (res) => {
        console.log("신규유저 불러오기 성공!",res);
        setNewUsers(res.content);
      },
      onError: (err: any) => {
        console.log("❌신규유저 불러오기 실패!",err);
      },
    }
  );

  const getReApplyTokenUsers = useMutation<any, Error>(
    "getNewUsers",
    async () => {
      return await getAuthNewUsers("ROLE_REQUEST");
    },
    {
      onSuccess: (res) => {
        console.log("토큰신청유저 불러오기 성공!",res);
        setTokenApplyUsers(res.content);
      },
      onError: (err: any) => {
        console.log("❌토큰신청유저 불러오기 실패!",err);
      },
    }
  );

  const putSendToken = useMutation<any, Error>(
    "putSendToken",
    async () => {
      return await putAuthSendToken(newUserId);
    },
    {
      onSuccess: (res) => {
        console.log("토큰전송 성공!",res);
      },
      onError: (err: any) => {
        console.log("❌토큰전송 실패!",err);
      },
    }
  );

  useEffect(()=>{
    getArtist.mutate()
    getInfluencer.mutate()
    getEnterpise.mutate()
    getNewUsers.mutate()
    getReApplyTokenUsers.mutate()
  }, [])

  const onClickApprove = (apply: IApply, idx: number) => {
    setControl("승인");
    setSelectedItem(apply);
    handleModalOpen();
  };

  const onClickReject = (apply: IApply, idx: number) => {
    setControl("거절");
    setSelectedItem(apply);
    handleModalOpen();
  };

  const onClickMint = () => {
    handleMintModalOpen();
  }

  const removeList = (apply: any) => {
    const temp = [...chooseList()];
    const idx = (temp.indexOf(apply));
    if (idx > -1) {
      temp.splice(idx, 1);
    }
    switch (status) {
      case "influencer":
        setInfluencer(temp);
        break;
      case "designer":
        setArtist(temp);
        break;
      case "enterprise":
        setEnterprise(temp);
        break;
      case "newUsers":
        setNewUsers(temp)
        break
      case "tokenApplyUsers":
        setTokenApplyUsers(temp)
        break
      default:
        break;
    }
  };

  const chooseList = () => {
    switch (status) {
      case "influencer":
        return influencer;
      case "designer":
        return artist;
      case "enterprise":
        return enterprise;
      case "newUsers":
        return newUsers;
      case "tokenApplyUsers":
        return tokenApplyUsers
      default:
        return influencer;
    }
  };

  const onClickSendToken = async (user, idx) => {
    try {
      setNewUserId(user.userId)
      await SSFTokenContract.methods
        .forceToTransfer(account, user.userAddress, 1000)
        .send({ from: account });
      await putSendToken.mutate();
      removeList(user)
      console.log("토큰전송 성공")
    } catch (error) {
      console.log(error)
      console.log("토큰전송 실패")
    }
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleMintModalOpen = () => {
    setIsMintOpen(true);
  };

  const handleMintModalClose = () => {
    setIsMintOpen(false);
  };

  ethereum.on('accountsChanged', (accounts) => {
    getBalance();
  });

  useEffect(() => {
    getAccount();
  }, [])
  useEffect(() => {
    getBalance();
  }, [account, newUsers])
  return (
    <Wrapper>
      <Title>
        <h1>관리자 페이지</h1>
        <div>
          <span>
            {account ? (
              <div>
                <div>소유 NCT: {balance}</div>
                <div>컨트랙트내의 총 NCT 수: {total}</div>
              </div>
            ) : (
              "지갑을 연결하세요"
            )}
          </span>
          <button onClick={onClickMint}>ERC20 토큰 민팅</button>
        </div>
      </Title>
      <FilterBar>
        <div
          className="influencer"
          id={status === "influencer" ? "select" : ""}
          onClick={() => {
            setStatus("influencer");
          }}
        >
          <p>인플루언서 신청</p>
        </div>
        <div
          className="designer"
          id={status === "designer" ? "select" : ""}
          onClick={() => {
            setStatus("designer");
          }}
        >
          <p>디자이너 신청</p>
        </div>
        <div
          className="enterprise"
          id={status === "enterprise" ? "select" : ""}
          onClick={() => {
            setStatus("enterprise");
          }}
        >
          <p>기업 신청</p>
        </div>
        <div
          className="newUsers"
          id={status === "newUsers" ? "select" : ""}
          onClick={() => {
            setStatus("newUsers");
          }}
        >
          <p>신규 유저</p>
        </div>
        <div
          className="tokenApplyUsers"
          id={status === "tokenApplyUsers" ? "select" : ""}
          onClick={() => {
            setStatus("tokenApplyUsers");
          }}
        >
          <p>토큰신청 유저</p>
        </div>
      </FilterBar>
      <List>
        {(status === "designer" || status === "influencer" || status === "enterprise") && chooseList().map((apply, idx) => {
          return (
            <ListItem key={idx}>
              <div className="id">닉네임: {apply.userNick}</div>
              <div className="name">이름: {apply.authentication.authName}</div>
              <div className="email">이메일: {apply.authentication.authEmail}</div>
              <div className="date">신청일: {apply.authentication.authRegAt}</div>
              <div className="file button">
                <a href={apply.authentication.authUrl} download={apply.userNick}>
                  <button className="button">첨부파일</button>
                </a>
              </div>
              <ApproveBtnBox>
                <button
                  className="approveBtn button"
                  onClick={() => onClickApprove(apply, idx)}
                >
                  승인
                </button>
                <button
                  className="rejectBtn button"
                  onClick={() => onClickReject(apply, idx)}
                >
                  거절
                </button>
              </ApproveBtnBox>
            </ListItem>
          );
        })}
        {status === "newUsers" && newUsers.map((user, idx) => {
          return (
            <ListItem key={idx}>
              <div className="userId">ID: {user.userId}</div>
              <div className="nickname">닉네임: {user.userNick}</div>
              <div className="address">지갑주소: {user.userAddress}</div>
              <ApproveBtnBox>
                <button
                  className="sendBtn button"
                  onClick={() => onClickSendToken(user, idx)}
                >
                  토큰전송
                </button>
              </ApproveBtnBox>
            </ListItem>)})}
            {status === "tokenApplyUsers" && tokenApplyUsers.map((user, idx) => {
          return (
            <ListItem key={idx}>
              <div className="userId">ID: {user.userId}</div>
              <div className="nickname">닉네임: {user.userNick}</div>
              <div className="address">지갑주소: {user.userAddress}</div>
              <ApproveBtnBox>
                <button
                  className="sendBtn button"
                  onClick={() => onClickSendToken(user, idx)}
                >
                  토큰전송
                </button>
              </ApproveBtnBox>
            </ListItem>)})}
      </List>
      <ConfirmModal
        visible={isOpen}
        onClose={handleModalClose}
        control={control}
        removeList={removeList}
        selectedItem={selectedItem}
        setIsOpenProp={setIsOpen}
      ></ConfirmModal>
      <MintERC20Modal
      visible={isMintOpen}
      onClose={handleMintModalClose}
      setIsOpenProp={setIsMintOpen}
      account={account}
      getBalance={getBalance}
      >
      </MintERC20Modal>
    </Wrapper>
  );
};

export default Admin;
