import React from 'react'

import { Vote } from './Vote'
import { SelectCard } from './SelectCard'

import { GameInfo } from '../../types/gameInfo'

import { gameIsTabletopMode, gamesCurrentTurnHasAHint, getCurrentTurnsSpymatersName, voteSystemIsIndividualLocksIn, voteSystemIsIndividualVote } from '../../utility/gameStateInfoFunctions'

export const OperativeTurnActions: React.FC<Props> = ({ gameData }) => {
  if (gameIsTabletopMode(gameData)) {
    return (
      <>
        <h1 data-testid='tabletopModeOperativeHeader'>Deliberate with your team</h1>
        <h2>When you agree, tell spymaster your pick</h2>
      </>
    )
  }

  if (!gamesCurrentTurnHasAHint(gameData)) {
    return (
      <h1 data-testid='waitingForHintHeader'>Waiting for hint from {getCurrentTurnsSpymatersName(gameData)?.name}</h1>
    )
  }

  if (voteSystemIsIndividualVote(gameData)) {
    return (
      <Vote votes={gameData.gameState.votes} gameLog={gameData.gameLog}/>
    )
  }

  if (voteSystemIsIndividualLocksIn(gameData)) {
    return (
      <SelectCard gameLog={gameData.gameLog}/>
    )
  }

  return (
    <>
      <h1 data-testid='individualModeOperativeHeader'>Use chat to discuss and vote on word</h1>
      <h2>Then tell spymaster to vote</h2>
    </>
  )
}

interface Props {
  gameData: GameInfo
}
