import React, { useContext } from 'react'
import { useSocket, SocketActions } from '../hooks/useSocket'

const SocketContext = React.createContext<SocketActions>(null)

export function useSocketActions (): SocketActions {
  return useContext(SocketContext)
}

export const SocketProvider: React.FC<Props> = ({ uid, gameId, children }) => {
  const { playerLeavesSocket } = useSocket(uid, gameId)

  const value = {
    playerLeavesSocket
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

interface Props {
  uid:string
  gameId: string
  children: React.ReactNode
}
