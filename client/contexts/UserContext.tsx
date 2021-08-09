import React, { useContext } from 'react'
import { useNewUser, UserActions } from '../hooks/useNewUser'
import { User } from '../types/gameState'

const UserContext = React.createContext<Context>(null)

export function useUserContext (): Context {
  return useContext(UserContext)
}

export const useUserActions = (): UserActions => {
  const { userActions } = useUserContext()
  return userActions
}

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, userActions] = useNewUser()

  const value = {
    user,
    userActions
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
interface Context {
  user: User,
  userActions: UserActions,
}
