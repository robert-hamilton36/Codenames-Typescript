import React from 'react'
import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'

export const StartGameButton: React.FC = () => {
  const { user, gameId } = useUserContext()
  const { startGame } = useGameplayActions()

  const handleStart = () => {
    startGame(gameId)
  }
  if (user.host) {
    return (
      <button onClick={handleStart}>Start Game</button>
    )
  }
  return null
}
