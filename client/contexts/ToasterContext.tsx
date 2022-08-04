import React, { useContext, useState } from 'react'

const ToasterContext = React.createContext<ContextReturn>(null)

export function useToaster (): ContextReturn {
  return useContext(ToasterContext)
}

export const ToasterProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [toaster, setToaster] = useState<Toaster>(null)

  const value = {
    toaster,
    setToaster
  }

  return (
    <ToasterContext.Provider value={value}>
      {children}
    </ToasterContext.Provider>
  )
}

type MessageType = 'Error' | 'message'

interface Toaster {
  type: MessageType
  message: string
}

interface ContextReturn {
  toaster: Toaster
  setToaster: React.Dispatch<React.SetStateAction<Toaster>>
}
