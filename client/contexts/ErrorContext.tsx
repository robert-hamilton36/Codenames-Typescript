import React, { useContext, useState } from 'react'

const ErrorContext = React.createContext(null)

export function useErrorContext (): ContextReturn {
  return useContext(ErrorContext)
}

export const ErrorProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [error, setError] = useState<Error>(null)

  const provided = {
    error,
    setError
  }
  return (
    <ErrorContext.Provider value={provided}>
      {children}
    </ErrorContext.Provider>
  )
}

interface ContextReturn {
  error: Error
  setError: SetError
}

export type SetError = React.Dispatch<React.SetStateAction<Error>>
