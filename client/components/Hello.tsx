import React from 'react'

import { useGameplayActions, useGuessActions, useFirestoreSubscriber, getWords } from '../contexts/FirebaseContext'
import { useUserActions, useUserContext } from '../contexts/UserContext'
import { restartGameState } from '../utility/createNewGameObject'
import { shuffleArray } from '../utility/shuffleArray'

export const Hello: React.FC = () => {
  const { user } = useUserContext()
  const { setUser } = useUserActions()
  const gameId = 'Test'
  const data = useFirestoreSubscriber(gameId)
  const { startGame, restartNewGame, setHint, changeTeamsTurn, teamWinGame } = useGameplayActions()
  const { endTurn, makeGuess } = useGuessActions()
  // const { } = useVoteActions()
  const words = getWords()

  const handleStart = () => {
    startGame(gameId)
  }

  const handleLogin = () => {
    setUser('Katie')
  }

  const handleHint = () => {
    setHint(gameId, { hint: 'fire', numberOfWords: 2 })
  }

  const handleChangeTeamTurn = (team) => {
    changeTeamsTurn(gameId, team)
  }

  const handleRestart = () => {
    const wordGrid = shuffleArray(words)
    console.log(wordGrid.slice(24))
    const { gameState, scoresForWin } = restartGameState(wordGrid.slice(0, 25))
    console.log(gameState)
    console.log(scoresForWin)
    restartNewGame(gameId, gameState, scoresForWin)
  }

  const handleTeamWin = (team) => {
    teamWinGame(gameId, team)
  }

  const handleWrongGuess = () => {
    endTurn(gameId)
  }

  const handleReveal = () => {
    makeGuess(gameId, 0)
  }

  return (
    <>
      <h1>App has arrived</h1>

      {user && <h1>Hello { user.name } </h1>}
      {user && <h1>{user.uid}</h1>}
      {gameId && <h1>{gameId}</h1>}
      {data && data.players.map((player) => <h1 key={player.uid}>{player.name}</h1>)}
      {!user.name && <button onClick={handleLogin}>Login</button>}
      {data && !data.gameState.gameStart && <button onClick={handleStart}>Start Game</button>}
      {data && !data.gameState.hint && <button onClick={handleHint}>Add hint</button>}
      {data && data.gameState.teamTurn === 'red' && <button onClick={() => handleChangeTeamTurn('blue')}>Change Team Blue</button>}
      {data && data.gameState.teamTurn === 'blue' && <button onClick={() => handleChangeTeamTurn('red')}>Change Team Red</button>}
      <button onClick={() => handleTeamWin('blue')}>Blue Win</button>
      <button onClick={() => handleTeamWin('red')}>Red Win</button>
      <button onClick={handleWrongGuess}>Guess Wrong</button>
      <button onClick={handleReveal}>Guess 0</button>
      <button onClick={handleRestart}>Restart</button>
    </>
  )
}
