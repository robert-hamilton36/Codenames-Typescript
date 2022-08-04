import React from 'react'

import { GameState } from '../../types/gameState'

export const Hint: React.FC<Props> = ({ gameState }) => {
  if (gameState.hint) {
    return (
      <>
        <p data-testid='guessesLeftParagraph'>Guesses left: {gameState.guessesLeft}</p>
        <p data-testid='hintParagraph'>Hint: {gameState.hint.hint} {gameState.hint.numberOfWords}</p>
      </>
    )
  } else if (gameState.gameStart) {
    return (
      <h1 data-testid='waitForHintHeader'>Waiting for hint</h1>
    )
  } else {
    return (
      <h1 data-testid='waitForGameStartHeader'>Waiting for game start</h1>
    )
  }
}

interface Props {
  gameState: GameState
}
