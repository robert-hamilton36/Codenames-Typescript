import React from 'react'

import { usePlayerActions, useJoinGameActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'

import { User } from '../../types/user'

import { getOppositeRole, getOppositeTeamColour } from '../../utility/playerInfoFunctions'

export const HostOptions: React.FC<Props> = ({ selectedPlayer, setSelectedPlayer }) => {
  const { editSpymasterOperative, changePlayersTeam } = usePlayerActions()
  const { kickPlayer } = useJoinGameActions()
  const { gameId } = useGameId()

  const makePlayerOperativeOrSpymaster = () => {
    return editSpymasterOperative(gameId, selectedPlayer.uid)
      .then(() => {
        return setSelectedPlayer(null)
      })
  }

  const removePlayer = () => {
    return kickPlayer(selectedPlayer.uid, gameId)
      .then(() => {
        return setSelectedPlayer(null)
      })
  }

  const changePlayerTeam = () => {
    return changePlayersTeam(gameId, selectedPlayer.uid, getOppositeTeamColour(selectedPlayer))
      .then(() => {
        return setSelectedPlayer(null)
      })
  }

  return (
    <div data-testid='hostOptionsContainer'>
      <h1 data-testid='nameHeader'>Selected Player: {selectedPlayer.name}</h1>
      <h1 data-testid='teamHeader'>Team: {selectedPlayer.team}</h1>
      <button onClick={makePlayerOperativeOrSpymaster} data-testid='buttonChangeRole'>Make {getOppositeRole(selectedPlayer)}</button>
      <button onClick={changePlayerTeam} data-testid='buttonChangeTeam'>{getOppositeTeamColour(selectedPlayer)} Team</button>
      <button onClick={removePlayer} data-testid='buttonKick'>Kick</button>
    </div>
  )
}

interface Props {
  selectedPlayer: User
  setSelectedPlayer: (Value: User) => void
}
