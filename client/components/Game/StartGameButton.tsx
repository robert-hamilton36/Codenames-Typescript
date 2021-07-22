import React from 'react'
import { useErrorContext } from '../../contexts/ErrorContext'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { validateStart } from '../../utility/validation'

export const StartGameButton: React.FC<Props> = ({ gameInfo }) => {
  const { user, gameId } = useUserContext()
  const { startGame } = useGameplayActions()
  const { setError } = useErrorContext()

  const handleStart = () => {
    if (validateStart(gameInfo, setError)) {
      startGame(gameId)
    }
  }

  if (user.host && !gameInfo.gameState.gameStart) {
    return (
      <button onClick={handleStart}>Start Game</button>
    )
  }
  return null
}

interface Props {
  gameInfo: GameInfo
}
