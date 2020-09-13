import io from 'socket.io-client'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

import * as Schema from '../../../schema/index'
import * as room from '../reducer/room'
import * as user from '../reducer/user'

const client = io(':3001')

const createCommands = (userId: string, roomId: string) => ({
  joinRoom: (name: string, roomId: string): void => {
    client.emit('join-room', { name, roomId })
  },
  startGame: (): void => {
    client.emit('start-game', { roomId })
  },
  drawCard: (point: number): void => {
    client.emit('draw-card', { userId, roomId, point })
  },
})

type Socket = {
  room?: room.State
  user?: user.State
  isPlaying?: boolean
  commands?: ReturnType<typeof createCommands>
}

export const SocketContext = React.createContext<Socket>({})

export const SocketProvider: React.FC = (props) => {
  const [roomState, dispatchRoom] = React.useReducer(
    room.reducer,
    room.initialState
  )

  const [userState, dispatchUser] = React.useReducer(
    user.reducer,
    user.initialState
  )

  const [isPlaying, setIsPlaying] = React.useState(false)
  const history = useHistory()

  React.useEffect(() => {
    client.on('join-room', (data: Schema.JoinRoomResponse) => {
      dispatchUser(user.userJoin({ ...data.user, isHost: data.isHost }))
      history.push('/play')
    })

    client.on('user-join', (data: Schema.UserJoinResponse) => {
      dispatchRoom(room.joinRoom(data.room))
    })

    client.on('start-game', (data: Schema.StartGameResponse) => {
      setIsPlaying(data.isPlaying)
    })

    client.on('draw-card', (data: Schema.DrawCardResponse) => {
      dispatchRoom(room.drawCard(data.room))
    })
  }, [])

  const value = React.useMemo(
    () => ({
      room: roomState,
      user: userState,
      isPlaying,
      commands: createCommands(userState.id, roomState.id),
    }),
    [roomState, userState, isPlaying]
  )

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  )
}
