import React from 'react'

import { Hint } from './Hint'

import { GameState } from '../../types/gameState'

export const GameInfoContainer:React.FC<Props> = ({ gameState }) => {
  if (gameState.win) {
    return (
      <h1 data-testid='teamHasWonHeader'>{gameState.win} team has won!</h1>
    )
  }
  if (!gameState.gameStart) {
    return (
      <h1 data-testid='waitingHeader'>Waiting for game to start</h1>
    )
  }
  return (
    <>
      <h1 data-testid='teamsTurnHeader'>{gameState.teamTurn}&apos;s turn</h1>
      <Hint gameState={gameState} />
    </>
  )
}

interface Props {
  gameState: GameState
}
