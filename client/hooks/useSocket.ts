import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

const useSocket = (uid: string, gameId: string, connection = ''): void => {
  const socket = useRef<Socket<DefaultEventsMap> | null>(null)

  useEffect(() => {
    socket.current = io(connection)

    socket.current.on('connect', () => {
      socket.current.emit('player-data', uid, gameId)
    })

    return () => {
      socket?.current.disconnect()
    }
  }, [])
}

export default useSocket
