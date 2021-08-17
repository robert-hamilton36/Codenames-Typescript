import React from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'
import { User } from '../../types/gameState'
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
            <th data-testid='redHeader'>Red</th>
            <th data-testid='blueHeader'>Blue</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colSpan={2} data-testid='spymasterHeader'>Spymasters</th>
          </tr>
        </thead>
        <tbody data-testid='spymastersContainer'>
          {makeSpymasterTable}
        </tbody>
        <thead>
          <tr>
            <th colSpan={2} data-testid='operativeHeader'>Operatives</th>
          </tr>
        </thead>
        <tbody data-testid='operativesContainer'>
          {makeOperativeTable}
        </tbody>
      </table>

      {selectedPlayer && user.host && <HostOptions selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer}/>}
    </div>
  )
}

type Props = {playerList: User[]}
