import React, { useContext, useState } from 'react'
import { useNewUser } from '../hooks/useNewUser'

const UserContext = React.createContext(null)

export function useUserContext (): ContextReturn {
  return useContext(UserContext)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function UserProvider ({ children }) {
  const [user, setUser] = useNewUser()
  const [gameId, setGameId] = useState('')

  const provided = {
    user,
    setUser,
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
  setUser: React.Dispatch<React.SetStateAction<string>>,
  gameId: string,
  setGameId: React.Dispatch<React.SetStateAction<string>>
}

interface User {
  name: string,
  uid: string
}
