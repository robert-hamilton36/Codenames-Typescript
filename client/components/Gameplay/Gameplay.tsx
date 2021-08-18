import React, { useEffect } from 'react'

import { useUserContext, useUserActions } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { gameWon, usersTeamsTurn } from '../../utility/gameStateInfoFunctions'
import { OperativeTurnActions } from './OperativeTurnActions'
import { SpymasterTurnActions } from './SpymasterTurnActions'

export const Gameplay: React.FC<Props> = ({ gameData }) => {
  const { user } = useUserContext()

  // used for quick testing
  // const { setUser, setTeam, makeSpymaster, makeHost } = useUserActions()
  // useEffect(() => {
  //   setUser('Rob')
  //   setTeam('red')
  //   makeSpymaster(true)
  //   makeHost(true)
  // }, [])

  if (user.host && gameWon(gameData)) {
    // the component for this state is now rendered from main board
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
