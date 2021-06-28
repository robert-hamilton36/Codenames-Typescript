import React from 'react'

import { PlayerObject, User } from '../types/gameState'

export const makePlayerTableRows: MakePlayerTables = (playerlist: PlayerObject[], setSelectedPlayer: SetSelectedPlayer) => {
  const blueSpymaster = playerlist.find(player => player.spymaster && player.team === 'blue')
  const redSpymaster = playerlist.find(player => player.spymaster && player.team === 'red')
  const blueOperatives = playerlist.filter(player => !player.spymaster && player.team === 'blue')
  const redOperatives = playerlist.filter(player => !player.spymaster && player.team === 'red')

  // find which team has the most players, and so the number of rows to make
  const operativeRows = blueOperatives.length > redOperatives.length ? blueOperatives.length : redOperatives.length
  const operativeTable: JSX.Element[] = []
  for (let x = 0; x < operativeRows; x++) {
    operativeTable.push(
      <tr key={'operativeRow' + x}>
        {redOperatives[x] && <td key={'red' + x} onClick={() => setSelectedPlayer(redOperatives[x])} >{redOperatives[x].name}</td>}
        {blueOperatives[x] && <td key={'blue' + x} onClick={() => setSelectedPlayer(blueOperatives[x])} >{blueOperatives[x].name}</td>}
      </tr>)
  }

  const spymasterTable = (
    <tr>
      {redSpymaster ? <td onClick={() => setSelectedPlayer(redSpymaster)}>{redSpymaster.name}</td> : <td></td>}
      {blueSpymaster ? <td onClick={() => setSelectedPlayer(blueSpymaster)}>{blueSpymaster.name}</td> : <td></td>}
    </tr>
  )

  return [spymasterTable, operativeTable]
}

type MakePlayerTables = (playerlist: PlayerObject[], setSelectedPlayer: SetSelectedPlayer) => (JSX.Element | JSX.Element[])[]
type SetSelectedPlayer = (Value: User) => void
