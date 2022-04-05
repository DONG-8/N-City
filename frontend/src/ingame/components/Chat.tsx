import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

import phaserGame from "../PhaserGame";
// import { setEdit } from "../GameApp";
import Game from "../scenes/Game";

import { getColorByString } from "../util";
import { useAppDispatch, useAppSelector } from "../hooks";
import { MessageType, setFocused, setShowChat } from "../stores/ChatStore";

const Backdrop = styled.div`
  margin-bottom: 5vh;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 400px;
  width: 500px;
  max-height: 50%;
  max-width: 50%;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const FabWrapper = styled.div`
  margin-top: auto;
`;

const ChatHeader = styled.div`
  position: relative;
  height: 35px;
  background: #000000a7;
  border-radius: 5px 5px 0px 0px;

  h3 {
    color: #fff;
    margin: 7px;
    font-size: 17px;
    text-align: center;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const ChatBox = styled(Box)`
  height: 100%;
  width: 99.5%;
  overflow: hidden;
  background: #2c2c2c;
  border: 1px solid #00000029;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 2px;

  p {
    margin: 3px;
    text-shadow: 0.3px 0.3px black;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  span {
    color: white;
    font-weight: normal;
  }

  .notification {
    color: grey;
    font-weight: normal;
  }

  :hover {
    background: #3a3a3a;
  }
`;

const InputWrapper = styled.form`
  box-shadow: 10px 10px 10px #00000018;
  border: 1px solid orange;
  border-radius: 0px 0px 5px 5px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
`;

const InputTextField = styled(InputBase)`
  border-radius: 0px 0px 5px 5px;
  input {
    padding: 5px;
    color: white;
  }
`;

const dateFormatter = new Intl.DateTimeFormat("en", {
  //3/20/22, 11:19 PM
  timeStyle: "short",
  dateStyle: "short",
});

const Message = ({ chatMessage, messageType }) => {
  // Message = 채팅 한줄 한줄
  const [tooltipOpen, setTooltipOpen] = useState(false); // 툴팁켜기 state

  return (
    <MessageWrapper
      onMouseEnter={() => {
        setTooltipOpen(true);
      }}
      onMouseLeave={() => {
        setTooltipOpen(false);
      }}
    >
      <Tooltip // 툴팁에 title 안에 값을 바꿔주면 값이 바뀐다.
        open={tooltipOpen}
        title={dateFormatter.format(chatMessage.createdAt)}
        placement="right"
        arrow
      >
        {messageType === MessageType.REGULAR_MESSAGE ? (
          <p style={{ color: getColorByString(chatMessage.author) }}>
            {chatMessage.author}: <span>{chatMessage.content}</span>
          </p>
        ) : (
          //기본 회색으로 '메세지 출력'
          <p className="notification">
            {chatMessage.author} {chatMessage.content}
          </p>
        )}
      </Tooltip>
    </MessageWrapper>
  );
};

export default function Chat() {
  const [inputValue, setInputValue] = useState(""); // 인풋창
  const messagesEndRef = useRef<HTMLDivElement>(null); // 메세지 오면 맨 밑으로 가기
  const inputRef = useRef<HTMLInputElement>(null); // 인풋 창 focus?
  const chatMessages = useAppSelector((state) => state.chat.chatMessages);
  const focused = useAppSelector((state) => state.chat.focused);
  const showChat = useAppSelector((state) => state.chat.showChat);
  const dispatch = useAppDispatch(); // set~ 함수들 사용하기 위한
  const game = phaserGame.scene.keys.game as Game;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }; // 인풋창 수정

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      // esc 누르면  꺼지게 하기
      inputRef.current?.blur(); // focus 없애기
      dispatch(setShowChat(false));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.blur(); // 엔터 누르면 focus를 게임으로 옮기기
    const val = inputValue.trim(); // 공백제거
    setInputValue(""); // 비워주기
    if (val) {
      // val 이 빈 값이 아니라면
      game.network.addChatMessage(val); // 네트워크로 메세지 보내기
      game.myPlayer.updateDialogBubble(val); // 내캐릭터 말풍선 바꾸기
    }
  };

  const scrollToBottom = () => {
    // 채팅오면 맨밑으로 보내기
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 포커스 주기
    if (focused) {
      inputRef.current?.focus(); // <=>  inputRef.current?.blur()
    }
  }, [focused]);

  useEffect(() => {
    // 메세지가 바뀌면, 채팅창을 켜면 ? 맨밑으로 이동
    scrollToBottom();
  }, [chatMessages, showChat]);

  return (
    <Backdrop>
      <Wrapper>
        {showChat ? (
          <>
            <ChatHeader>
              <h3>Chat</h3>
              <IconButton
                aria-label="close dialog"
                className="close"
                onClick={() => dispatch(setShowChat(false))}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </ChatHeader>
            <ChatBox>
              {chatMessages.map(({ messageType, chatMessage }, index) => (
                <Message
                  chatMessage={chatMessage}
                  messageType={messageType}
                  key={index}
                />
              ))}
              <div ref={messagesEndRef} />
            </ChatBox>
            <InputWrapper onSubmit={handleSubmit}>
              <InputTextField
                inputRef={inputRef}
                autoFocus={focused}
                fullWidth
                placeholder="Press Enter to chat"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={() => {
                  if (!focused) dispatch(setFocused(true));
                }}
                // 포커스를 잃었을 경우
                onBlur={() => dispatch(setFocused(false))}
              />
            </InputWrapper>
          </>
        ) : (
          // 채팅창을 안열었을 경우 아이콘 보여주기
          <FabWrapper>
            <Fab
              color="warning"
              aria-label="showChat"
              onClick={() => {
                dispatch(setShowChat(true));
                dispatch(setFocused(true));
              }}
            >
              <ChatBubbleOutlineIcon />
            </Fab>
          </FabWrapper>
        )}
      </Wrapper>
    </Backdrop>
  );
}
