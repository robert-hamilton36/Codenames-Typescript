import React from 'react'
import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'
import { PlayerObject } from '../../types/gameState'
import { makePlayerTableRows } from '../../utility/playerlistFunctions'

const playerList: PlayerObject[] = [
  { host: true, name: 'Rob', uid: '2342543213a', team: 'red', spymaster: true },
  { name: 'Hugh', uid: '2342543213d', team: 'blue', spymaster: true },
  { uid: '2342543213w', team: 'blue', name: 'Sophie' },
  { uid: '2342543213z', team: 'blue', name: 'Katie' },
  { uid: '2342543213x', team: 'red', name: 'Aidan' },
  { uid: '2342543213c', team: 'red', name: 'Hugo' }
]

export const PlayerList: React.FC<Props> = () => {
  const [selectedPlayer, setSelectedPlayer] = usePlayerSelectorDeselector()
  const [makeSpymasterTable, makeOperativeTable] = makePlayerTableRows(playerList, setSelectedPlayer)

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

      {selectedPlayer && <h1>{selectedPlayer?.name}</h1>}
    </div>
  )
}

type Props = {playerList: PlayerObject[]}
