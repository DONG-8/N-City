import React, { useState } from "react";
import styled from "styled-components";
import ConfirmModal from "../../components/admin/ConfirmModal";

const Wrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
`;

const Title = styled.div`
  background-color: #f8d9ce;
  display: flex;
  justify-content: flex-start;
  h1 {
    margin-left: 70px;
    font-size: 25px;
  }
`;

const FilterBar = styled.div`
  box-shadow: 2px 2px 2px gray;
  margin: auto;
  margin-top: -2vh;
  width: 70%;
  display: flex;
  div {
    cursor: pointer;
    flex: 2.5;
    height: 5vh;
    text-align: center;
    &:hover {
      background-color: white;
      transition: 0.3s;
    }
    p {
      font-size: 2vh;
      margin-top: 1vh;
      font-weight: 1000;
    }
  }
  .influencer {
    background-color: #fecdbb;
  }
  .designer {
    background-color: #feaf84;
  }
  .enterprise {
    background-color: #fecdbb;
  }
  #select {
    background-color: white;
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
  border-radius: 10px;
  width: 80%;
  padding-right: 12px;
  .button {
    border-radius: 15px;
    margin: 0 5px;
    padding: 10px 0;
    font-weight: bold;
    text-align: center;
  }
  div {
    font-weight: bold;
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
    width: 40%;
  }
  .file {
    width: 12%;
    button {
      background-color: #ff865b;
      color: #fff;
      width: 100px;
      &:hover {
        font-weight: bold;
      }
      &:active {
        background-color: #de5d30;
      }
    }
  }
  .approveBtn {
    width: 8%;
    background-color: #399b20;
    color: #fff;
    width: 70px;
    &:hover {
      font-weight: bold;
    }
    &:active {
      background-color: #2e8518;
    }
  }
  .rejectBtn {
    width: 8%;
    background-color: #e34558;
    color: #fff;
    width: 70px;
    &:hover {
      font-weight: bold;
    }
    &:active {
      background-color: #b72a3b;
    }
  }
`;

export interface IApply {
  id: string;
  name: string;
  email: string;
  file?: any; // 나중에 수정하기
}

const Admin = () => {
  const [influencer, setInfluencer] = useState<IApply[]>([
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동ds", name: "동탁fsd", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동ㄴㅇㄹ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "ㄴ동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동ㄴㅇ", name: "동ㅇㄴ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
  ]);
  const [designer, setDesigner] = useState<IApply[]>([
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동ds", name: "동탁fsd", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동fa탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁ss", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동s탁", email: "sdfas@gmail.com", file: "File" },
    { id: "ㄴ동", name: "동sds탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동ㄴㅇ", name: "동ㅇㄴ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동ㄴㅇㄹ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동s", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
  ]);
  const [enterprise, setEnterprise] = useState<IApply[]>([
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "sdsd동ds", name: "동탁fsd", email: "sdfas@gmail.com", file: "File" },
    { id: "동sd", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동sdf", name: "동ddd탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "ㅇㄹ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "ㄴ동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동ㄴㅇ", name: "동ㅇㄴ탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동탁", email: "sdfas@gmail.com", file: "File" },
    { id: "동", name: "동sdsd탁", email: "sdfas@gmail.com", file: "File" },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState("influencer");
  const [control, setControl] = useState("");
  const [selectedItem, setSelectedItem] = useState<IApply>();
  const [index, setIndex] = useState<number>(-1);
  // 이름, 이메일, 파일

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

  const removeList = (apply: any) => {
    const temp = [...chooseList()];
    setIndex(temp.indexOf(apply));
    if (index > -1) {
      temp.splice(index, 1);
    }

    switch (status) {
      case "influencer":
        setInfluencer(temp);
        break;
      case "designer":
        setDesigner(temp);
        break;
      case "enterprise":
        setEnterprise(temp);
        break;
      default:
        break;
    }
  };

  const chooseList = () => {
    switch (status) {
      case "influencer":
        return influencer;
      case "designer":
        return designer;
      case "enterprise":
        return enterprise;
      default:
        return influencer;
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <Wrapper>
      <Title>
        <h1>관리자 페이지</h1>
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
      </FilterBar>
      <List>
        {chooseList().map((apply, idx) => {
          return (
            <ListItem key={idx}>
              <div className="id">아이디: {apply.id}</div>
              <div className="name">이름: {apply.name}</div>
              <div className="email">이메일: {apply.email}</div>
              <div className="file button">
                <a href="파일소스" download="파일이름">
                  <button className="button">첨부파일</button>
                </a>
              </div>

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
            </ListItem>
          );
        })}
      </List>
      <ConfirmModal
        visible={isOpen}
        onClose={handleModalClose}
        control={control}
        removeList={removeList}
        selectedItem={selectedItem}
        setIsOpenProp={setIsOpen}
      ></ConfirmModal>
    </Wrapper>
  );
};

export default Admin;
