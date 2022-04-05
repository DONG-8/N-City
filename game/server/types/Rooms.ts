export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'skyoffice',
  CUSTOM = 'custom',
}

export interface IRoomData {
  roomId : string
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}
