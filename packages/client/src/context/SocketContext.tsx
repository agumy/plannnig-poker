import io from 'socket.io-client'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

import * as Schema from '../../../schema/index'
import * as room from '../reducer/room'
import * as user from '../reducer/user'

const client = io('http://localhost:3001')

const commands = {
  joinRoom: (name: string, roomId: string): void => {
    client.emit('join-room', { name, roomId })
  },
}

const value = {
  room: room.initialState,
  user: user.initialState,
  commands,
}

export const SocketContext = React.createContext(value)

export const SocketProvider: React.FC = (props) => {
  const [roomState, dispatchRoom] = React.useReducer(
    room.reducer,
    room.initialState
  )

  const [userState, dispatchUser] = React.useReducer(
    user.reducer,
    user.initialState
  )
  const history = useHistory()

  client.on('join-room', (data: Schema.JoinRoomResponse) => {
    dispatchUser(user.userJoin({ ...data.user, isHost: data.isHost }))
    history.push('/play')
  })

  client.on('user-join', (data: Schema.UserJoinResponse) => {
    dispatchRoom(room.joinRoom(data.room))
  })

  const value = React.useMemo(
    () => ({
      room: roomState,
      user: userState,
      commands,
    }),
    [roomState, userState]
  )

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  )
}
