import React from 'react'
import { useErrorContext } from '../../contexts/ErrorContext'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { GameInfo } from '../../types/gameState'
import { validateGameStart } from '../../validations/gameStatevalidations'

export const StartGameButton: React.FC<Props> = ({ gameInfo }) => {
  const { gameId } = useGameId()
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
    <button onClick={handleStart} data-testid='startGameButton'>Start Game</button>
  )
}

interface Props {
  gameInfo: GameInfo
}
