import React from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { gameStarted, usersTeamsTurn } from '../../utility/gameStateInfoFunctions'
import { OperativeTurnActions } from './OperativeTurnActions'
import { SpymasterTurnActions } from './SpymasterTurnActions'

export const Gameplay: React.FC<Props> = ({ gameData }) => {
  const { user } = useUserContext()

  if (!gameStarted(gameData)) {
    return null
  }

  if (!usersTeamsTurn(gameData, user)) {
    return (
      <h1 data-testid='notYourTeamsTurnHeader'>Wait for your teams turn</h1>
    )
  }

  if (user.spymaster) {
    return (
      <SpymasterTurnActions gameData={gameData}/>
    )
  }

  if (!user.spymaster) {
    return (
      <OperativeTurnActions gameData={gameData}/>
    )
  }
}

interface Props {
  gameData: GameInfo
}
