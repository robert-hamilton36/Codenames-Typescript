import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

export const useSocket = (uid: string, gameId: string, connection = ''): SocketActions => {
  const socket = useRef<Socket<DefaultEventsMap> | null>(null)

  useEffect(() => {
    console.log('useEffect')
    socket.current = io(connection)

    socket.current.on('connect', () => {
      socket.current.emit('player-data', uid, gameId)
    })

    return () => {
      socket.current.disconnect()
    }
  }, [])

  const playerLeavesSocket = () => {
    socket.current.emit('player-manually-leaves-game')
  }

  return {
    playerLeavesSocket
  }
}

export interface SocketActions {
  playerLeavesSocket: () => void
}
