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
  console.log('a user connected')

  socket.on('join-room', ({ name, roomId }: Schema.JoinRoomRequest) => {
    const user = new User(name)
    const _room = rooms[roomId]
    console.log(_room)
    const room = _room ? _room.addUser(user) : new Room(roomId, [user])
    rooms[roomId] = room

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

  socket.on('start-game', ({ roomId, userId }: Schema.StartGameRequest) => {})

  socket.on('draw-card', function (msg) {
    console.log(msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(3001, () => {
  console.log('listening on localhost:3000')
})
