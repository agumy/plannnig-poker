import * as React from 'react'
import { SocketContext } from '../context/SocketContext'

type JoinRoom = (param: { name: string; roomId: string }) => void

export const useJoinRoom = (): JoinRoom => {
  const { client } = React.useContext(SocketContext)

  const joinRoom = React.useCallback<JoinRoom>(
    ({ name, roomId }) => {
      client.emit('join-room', { name, roomId })
    },
    [client]
  )

  return joinRoom
}
