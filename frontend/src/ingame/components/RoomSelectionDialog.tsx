import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CustomRoomTable } from "./CustomRoomTable";
import { CreateRoomForm } from "./CreateRoomForm";
import { useAppSelector } from "../hooks";

import phaserGame from "../PhaserGame";
import Bootstrap from "../scenes/Bootstrap";

const Backdrop = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`;

const Wrapper = styled.div`
  background: #222639;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 5px #0000006f;
`;

const CustomRoomWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .tip {
    font-size: 18px;
  }
`;

const BackButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #eee;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 8px;
    height: 120px;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #33ac96;
  }
`;

const ProgressBar = styled(LinearProgress)`
  width: 360px;
`;

export default function RoomSelectionDialog() {
  const [showCustomRoom, setShowCustomRoom] = useState(false);
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
  const Setting = useAppSelector((state) => state.edit.EditMode);
  const handleConnect = () => {
    // ⭐ bootstrap 연결하기
    if (lobbyJoined) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap;
      // bootstrap.network
      //   .joinOrCreatePublic()
      //   .then(() => bootstrap.launchGame(Setting))
      //   .catch((error) => console.error(error));
    } else {
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
      >
        <Alert
          severity="error"
          variant="outlined"
          style={{ background: "#fdeded", color: "#7d4747" }}
        >
          서버가 연결이 안되었습니다.
        </Alert>
      </Snackbar>
      <Backdrop>
        <Wrapper>
          {showCreateRoomForm ? ( // 방만들기 눌렀을때
            <CustomRoomWrapper>
              <Title>방 만들기</Title>
              <BackButtonWrapper>
                <IconButton onClick={() => setShowCreateRoomForm(false)}>
                  <ArrowBackIcon />
                </IconButton>
              </BackButtonWrapper>
              <CreateRoomForm />
            </CustomRoomWrapper>
          ) : showCustomRoom ? ( //방만들기x 방 보기o
            <CustomRoomWrapper>
              <Title>
                open rooms
                <Tooltip title="방 보러오세요" placement="top">
                  <IconButton>
                    <HelpOutlineIcon className="tip" />
                  </IconButton>
                </Tooltip>
              </Title>
              <BackButtonWrapper>
                <IconButton onClick={() => setShowCustomRoom(false)}>
                  <ArrowBackIcon />
                </IconButton>
              </BackButtonWrapper>
              <CustomRoomTable />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowCreateRoomForm(true)}
              >
                방 만들러가기
              </Button>
            </CustomRoomWrapper>
          ) : (
            // 방만들기x 방 보기x => 메인
            <>
              <Title>N-CITY에 오신것을 환영합니다</Title>
              <Content>
                <img src="/essets/login/logo.png" alt="logo" />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleConnect}
                >
                  연습용 방 만들기
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    lobbyJoined
                      ? setShowCustomRoom(true)
                      : setShowSnackbar(true)
                  }
                >
                  방 참가하기/만들기
                </Button>
              </Content>
            </>
          )}
        </Wrapper>
        {!lobbyJoined && ( // 서버 끊겼을때
          <ProgressBarWrapper>
            <h3> 서버 연결중...</h3>
            <ProgressBar color="secondary" />
          </ProgressBarWrapper>
        )}
      </Backdrop>
    </>
  );
}
