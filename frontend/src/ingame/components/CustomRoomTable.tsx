import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LockIcon from '@mui/icons-material/Lock'
import { useAppSelector } from '../hooks'
import { getAvatarString, getColorByString } from '../util'

import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

const MessageText = styled.p`
  margin: 10px;
  font-size: 18px;
  color: #eee;
  text-align: center;
`

const CustomRoomTableContainer = styled(TableContainer)`
  max-height: 500px;

  table {
    min-width: 650px;
  }
`

const TableRowWrapper = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }

  .avatar {
    height: 30px;
    width: 30px;
    font-size: 15px;
  }

  .name {
    min-width: 100px;
    overflow-wrap: anywhere;
  }

  .description {
    min-width: 200px;
    overflow-wrap: anywhere;
  }

  .join-wrapper {
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .lock-icon {
    font-size: 18px;
  }
`

const PasswordDialog = styled(Dialog)`
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .MuiDialog-paper {
    background: #222639;
  }
`

export const CustomRoomTable = () => {
  const [password, setPassword] = useState('') // 비밀번호input
  const [selectedRoom, setSelectedRoom] = useState('')  // 방 고르기 몇번방 ?
  const [showPasswordDialog, setShowPasswordDialog] = useState(false) // 비밀번호 입력창
  const [showPasswordError, setShowPasswordError] = useState(false) // 틀렸다는 표시 뜨는 state
  const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false) // 비었다는 표시 -> required
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined) // 로비입장 
  const availableRooms = useAppSelector((state) => state.room.availableRooms) //가능한 방들 표시 해주기

  const handleJoinClick = (roomId: string, password: string | null) => {
    if (!lobbyJoined) return // ⭐ 로비로 입장 불가면 돌아가기
    const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap //⭐ 부트스트랩 시작
    bootstrap.network
      .joinRoom(roomId)
      .then(() => bootstrap.launchGame())
      .catch((error) => {
        console.error(error)
        if (password) setShowPasswordError(true)
      })
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => { // 패스워드 제출
    event.preventDefault()
    const isValidPassword = password !== ''

    if (isValidPassword === passwordFieldEmpty) setPasswordFieldEmpty(!passwordFieldEmpty)
    if (isValidPassword) handleJoinClick(selectedRoom, password)
  }

  const resetPasswordDialog = () => { // cancel 시 초기화
    setShowPasswordDialog(false)
    setPassword('')
    setPasswordFieldEmpty(false)
    setShowPasswordError(false)
  }

  return availableRooms.length === 0 ? ( // 방이 하나도 없으면
    <MessageText>만들어진 방이 없어요. 방을 새로 만드세요</MessageText>
  ) : (
    <>
      <CustomRoomTableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="center">
                <PeopleAltIcon />
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableRooms.map((room) => {
              const { roomId, metadata, clients } = room
              const { name, description, hasPassword } = metadata
              return (
                <TableRowWrapper key={roomId}>
                  <TableCell>
                    <Avatar className="avatar" style={{ background: getColorByString(name) }}>
                      {getAvatarString(name)}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="name">{name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="description">{description}</div>
                  </TableCell>
                  <TableCell>{roomId}</TableCell>
                  <TableCell align="center">{clients}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={hasPassword ? 'Password required' : ''}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          if (hasPassword) {
                            setShowPasswordDialog(true)
                            setSelectedRoom(roomId)
                          } else {
                            handleJoinClick(roomId, null)
                          }
                        }}
                      >
                        <div className="join-wrapper">
                          {hasPassword && <LockIcon className="lock-icon" />}
                          Join
                        </div>
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRowWrapper>
              )
            })}
          </TableBody>
        </Table>
      </CustomRoomTableContainer>
      <PasswordDialog open={showPasswordDialog} onClose={resetPasswordDialog}>
        <form onSubmit={handlePasswordSubmit}>
          <DialogContent className="dialog-content">
            <MessageText>비공개 방입니다. 패스워드를 입력하세요  </MessageText>
            <TextField
              autoFocus
              fullWidth
              error={passwordFieldEmpty}
              helperText={passwordFieldEmpty && 'Required'}
              value={password}
              label="Password"
              type="password"
              variant="outlined"
              color="secondary"
              onInput={(e) => {
                setPassword((e.target as HTMLInputElement).value)
              }}
            />
            {showPasswordError && (
              <Alert severity="error" variant="outlined">
                패스워드가 틀립니다
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={resetPasswordDialog}>
              취소
            </Button>
            <Button color="secondary" type="submit">
              들어가기
            </Button>
          </DialogActions>
        </form>
      </PasswordDialog>
    </>
  )
}
