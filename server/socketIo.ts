import { Server, Socket } from 'socket.io'
import { Server as HttpServer } from 'http'
import { leaveGame } from './firebase'

const ioServer: (server: HttpServer) => void = (server) => {
  const io = new Server(server)

  io.on('connection', (socket: ISocket) => {
    console.log('new connection:' + socket.id)

    socket.on('player-data', (uid, gameId) => {
      socket.uid = uid
      socket.gameId = gameId
      console.log(socket?.uid)
      console.log(socket?.gameId)
    })
    socket.on('disconnect', () => {
      console.log('Goodbye' + socket.id)
      leaveGame(socket.uid || '', socket.gameId || '')
    })
  })
}

interface ISocket extends Socket {
  uid?: string
  gameId?: string
}

export default ioServer
