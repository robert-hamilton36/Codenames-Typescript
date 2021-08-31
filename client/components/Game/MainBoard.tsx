import React, { useEffect, useState } from 'react'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useUserContext } from '../../contexts/UserContext'

import { WordList } from '../GetWords/WordList'
import { DisplayWordGrid } from './DisplayWordGrid'

import { restartGameState } from '../../utility/createNewGameObject'
import { gameWon } from '../../utility/gameStateInfoFunctions'

import { GameInfo, GameState, TeamPoints } from '../../types/gameState'

export const MainBoard: React.FC<Props> = ({ data }) => {
  const [newGameWords, setNewGameWords] = useState<string[]>(null)
  const [gameState, setGameState] = useState<GameState>(null)
  const [scoresForWin, setScoresForWin] = useState<TeamPoints>(null)
  const { user } = useUserContext()
  const { gameId } = useGameId()

  const { restartNewGame } = useGameplayActions()

  const restartGame = () => {
    restartNewGame(gameId, gameState, scoresForWin)
  }

  useEffect(() => {
    const { gameState, scoresForWin } = restartGameState(newGameWords)
    setGameState(gameState)
    setScoresForWin(scoresForWin)
  }, [newGameWords])

  if (gameWon(data) && user.host && !newGameWords) {
    return (
      <div className='board' data-testid='wordListDiv'>
        <WordList setFinalWordList={setNewGameWords} />
      </div>
    )
  }

  if (gameWon(data) && user.host && newGameWords) {
    return (
      <>
        <DisplayWordGrid wordList={gameState.words} />
        <div className='actions'>
          <button onClick={restartGame} data-testid='newGameButton'>Create new game</button>
        </div>
      </>
    )
  }

  return (
    <DisplayWordGrid wordList={data.gameState.words} />
  )
}
interface Props {
  data: GameInfo
}
