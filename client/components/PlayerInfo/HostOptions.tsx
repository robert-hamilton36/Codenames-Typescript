import React from 'react'
import { PlayerObject } from '../../types/gameState'

export const HostOptions: React.FC<Props> = ({ selectedPlayer }) => {
  const makePlayerOperative = () => {
    return null
  }

  const makerPlayerSpymaster = () => {
    return null
  }

  const removePlayer = () => {
    return null
  }

  return (
    <div>
      <h1>Selected Player: {selectedPlayer.name}</h1>
      <h1>Team: {selectedPlayer.team}</h1>
      {selectedPlayer.host ? <button onClick={() => makePlayerOperative()}>Make Operative</button> : <button onClick={() => makerPlayerSpymaster()}>Make Spymaster</button>}
      <button onClick={removePlayer}>Kick </button>
    </div>
  )
}

interface Props {
  selectedPlayer: PlayerObject
}
