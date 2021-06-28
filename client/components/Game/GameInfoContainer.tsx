import React from 'react'
import { GameState } from '../../types/gameState'
import { Hint } from './Hint'

export const GameInfoContainer:React.FC<Props> = ({ gameState }) => {
  if (gameState.win) {
    return (
      <div>
        <h1>{gameState.win} team has won!</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>{gameState.teamTurn}&apos;s turn</h1>
      <Hint gameState={gameState} />
    </div>
  )
}

type Props = {gameState: GameState}
