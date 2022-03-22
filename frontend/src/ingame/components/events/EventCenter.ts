import Phaser from 'phaser'

export const phaserEvents = new Phaser.Events.EventEmitter()

export enum Event {
  PLAYER_JOINED = 'player-joined', // 들어왔다
  PLAYER_UPDATED = 'player-updated', // 매번 업데이트마다
  PLAYER_LEFT = 'player-left', // 떠났다
  PLAYER_DISCONNECTED = 'player-disconnected', // 연결이 끊어졌다
  MY_PLAYER_READY = 'my-player-ready', // 준비완료
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change', // 이름을 바꿨다.
  MY_PLAYER_TEXTURE_CHANGE = 'my-player-texture-change', // 캐릭터를 바꿨다
  MY_PLAYER_VIDEO_CONNECTED = 'my-player-video-connected', //비디오 연결했다.
  ITEM_USER_ADDED = 'item-user-added', // 아이템을 이용한다
  ITEM_USER_REMOVED = 'item-user-removed', // 아이템 삭제
  UPDATE_DIALOG_BUBBLE = 'update-dialog-bubble', // 말풍선
}
