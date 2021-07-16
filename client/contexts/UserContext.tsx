import React, { useContext, useState } from 'react'
import { useNewUser, UserActions } from '../hooks/useNewUser'
import { PlayerObject } from '../types/gameState'

const UserContext = React.createContext(null)

export function useUserContext (): ContextReturn {
  return useContext(UserContext)
}

export const useUserActions = (): UserActions => {
  const { userActions } = useUserContext()
  return userActions
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function UserProvider ({ children }) {
  const [user, userActions] = useNewUser()
  const [gameId, setGameId] = useState('')

  const provided = {
    user,
    userActions,
    gameId,
    setGameId
  }
  return (
    <UserContext.Provider value={provided}>
      {children}
    </UserContext.Provider>
  )
}
interface ContextReturn {
  user: PlayerObject,
  userActions: UserActions,
  gameId: string,
  setGameId: React.Dispatch<React.SetStateAction<string>>
}
