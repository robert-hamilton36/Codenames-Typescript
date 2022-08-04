import React from 'react'

import { MakeHint } from './MakeHint'
import { SelectCard } from './SelectCard'

import { GameInfo } from '../../types/gameInfo'

import { gamesCurrentTurnHasAHint, voteSystemIsIndividualLocksIn, voteSystemIsIndividualVote, voteSystemIsSpymasterLocksIn } from '../../utility/gameStateInfoFunctions'

export const SpymasterTurnActions: React.FC<Props> = ({ gameData }) => {
  if (!gamesCurrentTurnHasAHint(gameData)) {
    return (
      <MakeHint gameLog={gameData.gameLog}/>
    )
  }

  if (voteSystemIsSpymasterLocksIn(gameData)) {
    return (
      <SelectCard gameLog={gameData.gameLog}/>
    )
  }

  if (voteSystemIsIndividualVote(gameData) || voteSystemIsIndividualLocksIn(gameData)) {
    return (
      <h1 data-testid='waitForVotesHeader'>Wait for team to lock-in votes</h1>
    )
  }
}

interface Props {
  gameData: GameInfo
}
