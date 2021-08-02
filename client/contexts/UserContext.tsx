import React, { useContext, useState } from 'react'
import { useNewUser, UserActions } from '../hooks/useNewUser'
import { User } from '../types/gameState'

const UserContext = React.createContext(null)

export function useUserContext (): ContextReturn {
  return useContext(UserContext)
}

export const useUserActions = (): UserActions => {
  const { userActions } = useUserContext()
  return userActions
}

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
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
  user: User,
  userActions: UserActions,
  gameId: string,
  setGameId: React.Dispatch<React.SetStateAction<string>>
}
