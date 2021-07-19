import React from 'react'
import { GameInfo } from '../../types/gameState'
import { gamesCurrentTurnHasAHint, voteSystemIsIndividualVote, voteSystemIsSpymasterLocksIn } from '../../utility/gameStateInfoFunctions'
import { MakeHint } from './MakeHint'
import { SelectCard } from './SelectCard'

export const SpymasterTurnActions: React.FC<Props> = ({ gameData }) => {
  if (!gamesCurrentTurnHasAHint(gameData)) {
    return (
      <MakeHint />
    )
  }

  if (voteSystemIsSpymasterLocksIn(gameData)) {
    return (
      <SelectCard />
    )
  }

  if (voteSystemIsIndividualVote(gameData)) {
    return (
      <h1>Wait for team to lock-in votes</h1>
    )
  }
}

interface Props {
  gameData: GameInfo
}
