import { Server, Socket } from 'socket.io'
import { Server as HttpServer } from 'http'
import { playerDisconnectsFromGame } from './firebase'

const ioServer: (server: HttpServer) => void = (server) => {
  const io = new Server(server)

  io.on('connection', (socket: ISocket) => {
    console.log('new connection: ' + socket.id)

    socket.on('player-data', (uid, gameId) => {
      socket.manualLeave = false
      socket.uid = uid
      socket.gameId = gameId
      console.log(socket?.uid)
      console.log(socket?.gameId)
    })

    socket.on('player-manually-leaves-game', () => {
      socket.manualLeave = true
    })

    socket.on('disconnect', () => {
      console.log('Goodbye' + socket.id)
      if (!socket.manualLeave) {
        playerDisconnectsFromGame(socket.uid || '', socket.gameId || '')
      } else {
        console.log('manualLeave')
      }
    })
  })
}

interface ISocket extends Socket {
  uid?: string
  gameId?: string
  manualLeave?: boolean
}

export default ioServer
