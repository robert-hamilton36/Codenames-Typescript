import React from 'react'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useToaster } from '../../contexts/ToasterContext'

import { GameInfo } from '../../types/gameInfo'

import { validateGameStart } from '../../validations/gameStateValidations'

export const StartGameButton: React.FC<Props> = ({ gameInfo }) => {
  const { gameId } = useGameId()
  const { startGame } = useGameplayActions()
  const { setToaster } = useToaster()

  const handleStart = () => {
    try {
      if (validateGameStart(gameInfo)) {
        startGame(gameId)
      }
    } catch (error) {
      setToaster({ type: 'Error', message: error.message })
    }
  }

  return (
    <button onClick={handleStart} data-testid='startGameButton'>Start Game</button>
  )
}

interface Props {
  gameInfo: GameInfo
}
