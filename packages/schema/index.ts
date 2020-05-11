export interface IUser {
  id: string
  name: string
}

export interface IRoom {
  id: string
  members: IUser[]
  host: IUser['id']
}

export type JoinRoomRequest = {
  name: string
  roomId: string
}

export type JoinRoomResponse = {
  user: IUser
  isHost: boolean
}

export type UserJoinResponse = {
  room: IRoom
}

export type StartGameRequest = {
  userId: string
  roomId: string
}

export type StartGameResponse = {
  isPlaying: boolean
}

export type DrawCardRequest = {
  userId: string
  point: number
}

export type DrawCardResponse = {}
