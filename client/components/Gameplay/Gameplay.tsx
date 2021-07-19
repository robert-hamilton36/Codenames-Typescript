import React, { useEffect } from 'react'
import { useUserContext, useUserActions } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { gameStarted, gameWon, usersTeamsTurn } from '../../utility/gameStateInfoFunctions'
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

  if (!gameStarted(gameData)) {
    return (
      <h1>Waiting for game start</h1>
    )
  }

  if (gameWon(gameData)) {
    return (
      <h1>Waiting for host to start new game</h1>
    )
  }

  if (!usersTeamsTurn(gameData, user)) {
    return (
      <h1>Wait for your teams turn</h1>
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
