import React, { useContext } from 'react'
import { useNewUser } from './hooks/useNewUser'

const UserContext = React.createContext(null)

export function useUserContext (): ContextReturn {
  return useContext(UserContext)
}

interface ContextReturn {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<string>>
}

interface User {
  name: string,
  uid: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function UserProvider ({ children }) {
  const [user, setUser] = useNewUser()

  const provided = {
    user,
    setUser
  }
  return (
    <UserContext.Provider value={provided}>
      {children}
    </UserContext.Provider>
  )
}
