import React from 'react'
import { useErrorContext } from '../../contexts/ErrorContext'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { validateGameStart } from '../../Validations/gameStateValidations'

export const StartGameButton: React.FC<Props> = ({ gameInfo }) => {
  const { gameId } = useUserContext()
  const { startGame } = useGameplayActions()
  const { setError } = useErrorContext()

  const handleStart = () => {
    try {
      if (validateGameStart(gameInfo)) {
        startGame(gameId)
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <button onClick={handleStart}>Start Game</button>
  )
}

interface Props {
  gameInfo: GameInfo
}
