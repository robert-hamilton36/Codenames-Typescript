import React from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'
import { PlayerObject } from '../../types/gameState'
import { makePlayerTableRows } from '../../utility/playerlistFunctions'
import { HostOptions } from './HostOptions'

export const PlayerList: React.FC<Props> = ({ playerList }) => {
  const [selectedPlayer, setSelectedPlayer] = usePlayerSelectorDeselector()
  const [makeSpymasterTable, makeOperativeTable] = makePlayerTableRows(playerList, setSelectedPlayer)
  const { user } = useUserContext()

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Red</th>
            <th>Blue</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colSpan={2}>Spymasters</th>
          </tr>
        </thead>
        <tbody>
          {makeSpymasterTable}
        </tbody>
        <thead>
          <tr>
            <th colSpan={2}>Operatives</th>
          </tr>
        </thead>
        <tbody>
          {makeOperativeTable}
        </tbody>
      </table>

      {selectedPlayer && user.host && <HostOptions selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer}/>}
    </div>
  )
}

type Props = {playerList: PlayerObject[]}
