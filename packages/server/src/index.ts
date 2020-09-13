import http from 'http'
import express from 'express'
import socketIO from 'socket.io'

import * as Schema from '../../schema/index'
import { Room } from './model/Room'
import { User } from './model/User'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, express!')
})

const rooms: { [id: string]: Room | undefined } = {}

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  socket.on('join-room', ({ name, roomId }: Schema.JoinRoomRequest) => {
    const user = new User(socket.id, name)
    let room = rooms[roomId]

    if (room) {
      room.joinUser(user)
    } else {
      room = new Room(roomId, user)
      rooms[roomId] = room
    }

    socket.join(roomId)

    const joinRoomResponse: Schema.JoinRoomResponse = {
      user,
      isHost: user.id === room.host,
    }

    const userJoinResponse: Schema.UserJoinResponse = {
      room,
    }

    io.to(socket.id).emit('join-room', joinRoomResponse)
    io.sockets.in(roomId).emit('user-join', userJoinResponse)
  })

  socket.on('start-game', ({ roomId }: Schema.StartGameRequest) => {
    const response: Schema.StartGameResponse = { isPlaying: true }

    io.sockets.in(roomId).emit('start-game', response)
  })

  socket.on(
    'draw-card',
    ({ roomId, userId, point }: Schema.DrawCardRequest) => {
      const room = rooms[roomId]
      if (!room) {
        return
      }

      room.decidePoint(userId, point)

      const response: Schema.DrawCardResponse = { room }

      io.sockets.in(roomId).emit('draw-card', response)
    }
  )

  socket.on('disconnect', ({ roomId }) => {})
})

server.listen(3001, () => {
  console.log('listening on localhost:3000')
})
