import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useAppSelector } from "../hooks";

import phaserGame from "../PhaserGame";
import Bootstrap from "../scenes/Bootstrap";

export interface IRoomData {
  roomId : string
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}

const CreateRoomFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 20px;
`;

export const CreateRoomForm = () => {
  const [values, setValues] = useState<IRoomData>({ // 방이름 방설명 패스워드
    roomId: '',
    name: '',
    description: '',
    password: null,
    autoDispose: true, // 알아서 가지다 ⭐?
  });
  const [showPassword, setShowPassword] = useState(false); //비밀번호 보이기
  const [nameFieldEmpty, setNameFieldEmpty] = useState(false); // 제목이 비었어요
  const [descriptionFieldEmpty, setDescriptionFieldEmpty] = useState(false); // 설명이 비었어
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined); // ⭐ 로비로 들어갈수 있나요
  const Setting = useAppSelector((state) => state.edit.EditMode);

  const handleChange =
    (prop: keyof IRoomData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value }); // 인풋창 바꾸기
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 제출하기
    event.preventDefault();
    const isValidName = values.name !== ""; // 이름이 빈칸이 아니라면 true , 빈칸이면 false
    const isValidDescription = values.description !== ""; // 설명 가능한지 아닌지 확인

    if (isValidName === nameFieldEmpty) setNameFieldEmpty(!nameFieldEmpty); // 이름이 비어있으면 비어있다고 바꾸는 함수
    if (isValidDescription === descriptionFieldEmpty)
      setDescriptionFieldEmpty(!descriptionFieldEmpty);

    if (isValidName && isValidDescription && lobbyJoined) {
      // 빈값이 없고 , 로비로 들어왔다면?
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap; // ⭐ 부트스트랩 시작
      // bootstrap.network // ⭐ 게임시작하기
      //   .createCustom(values)
      //   .then(() => bootstrap.launchGame(Setting))
      //   .catch((error) => console.error(error));
    }
  };

  return (
    <CreateRoomFormWrapper onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        color="secondary"
        autoFocus
        error={nameFieldEmpty}
        helperText={nameFieldEmpty && "Name is required"}
        onChange={handleChange("name")}
      />

      <TextField
        label="Description"
        variant="outlined"
        color="secondary"
        error={descriptionFieldEmpty}
        helperText={descriptionFieldEmpty && "Description is required"}
        multiline
        rows={4}
        onChange={handleChange("description")}
      />

      <TextField
        type={showPassword ? "text" : "password"}
        label="Password (optional)"
        onChange={handleChange("password")}
        color="secondary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" color="secondary" type="submit">
        Create
      </Button>
    </CreateRoomFormWrapper>
  );
};
