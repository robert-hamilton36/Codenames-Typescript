import React from 'react'
import { PlayerObject } from '../../types/gameState'
import { usePlayerActions, useJoinGameActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'
import { getOppositeRole, getOppositeTeamColour } from '../../utility/playerInfoFunctions'

export const HostOptions: React.FC<Props> = ({ selectedPlayer, setSelectedPlayer }) => {
  const { editSpymasterOperative, changePlayersTeam } = usePlayerActions()
  const { kickPlayer } = useJoinGameActions()
  const { gameId } = useUserContext()

  const makePlayerOperativeOrSpymaster = () => {
    console.log(selectedPlayer.uid)
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
    <div>
      <h1>Selected Player: {selectedPlayer.name}</h1>
      <h1>Team: {selectedPlayer.team}</h1>
      <button onClick={makePlayerOperativeOrSpymaster}>Make {getOppositeRole(selectedPlayer)}</button>
      <button onClick={changePlayerTeam}>{getOppositeTeamColour(selectedPlayer)} Team</button>
      <button onClick={removePlayer}>Kick </button>
    </div>
  )
}

interface Props {
  selectedPlayer: PlayerObject
  setSelectedPlayer: (Value: PlayerObject) => void
}
