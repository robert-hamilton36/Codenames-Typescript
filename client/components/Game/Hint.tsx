import React from 'react'
import { GameState } from '../../types/gameState'

export const Hint: React.FC<Props> = ({ gameState }) => {
  if (gameState.hint) {
    return (
      <>
        <p>Guesses left: {gameState.guessesLeft} </p>
        <p>Hint: {gameState.hint.hint} {gameState.hint.numberOfWords}</p>
      </>
    )
  } else if (gameState.gameStart) {
    return (
      <h1>Waiting for hint</h1>
    )
  } else {
    return (
      <h1>Waiting for game start</h1>
    )
  }
}

type Props = { gameState: GameState }
