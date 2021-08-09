import React, { useContext, useState } from 'react'

const GameIdContext = React.createContext<Context>(null)

export function useGameId (): Context {
  return useContext(GameIdContext)
}

export const GameIdProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [gameId, setGameId] = useState('')

  const value = {
    gameId,
    setGameId
  }
  return (
    <GameIdContext.Provider value={value}>
      {children}
    </GameIdContext.Provider>
  )
}

interface Context {
  gameId: string,
  setGameId: React.Dispatch<React.SetStateAction<string>>
}
