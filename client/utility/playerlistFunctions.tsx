import React from 'react'

import { User } from '../types/gameState'

export const makePlayerTableRows: MakePlayerTables = (playerlist: User[], setSelectedPlayer: SetSelectedPlayer) => {
  const blueSpymaster = playerlist.find(player => player.spymaster && player.team === 'blue')
  const redSpymaster = playerlist.find(player => player.spymaster && player.team === 'red')
  const blueOperatives = playerlist.filter(player => !player.spymaster && player.team === 'blue')
  const redOperatives = playerlist.filter(player => !player.spymaster && player.team === 'red')

  // find which team has the most players, which is the number of rows to make
  const noOfOperativeRows = blueOperatives.length > redOperatives.length ? blueOperatives.length : redOperatives.length
  const operativeTable: JSX.Element[] = []
  for (let x = 0; x < noOfOperativeRows; x++) {
    operativeTable.push(
      <tr key={'operativeRow' + x} data-testid = {'operativeRow' + x}>
        {redOperatives[x] ? <td key={'red' + x} onClick={() => setSelectedPlayer(redOperatives[x])} >{redOperatives[x].name}</td> : <td className = 'noOperative' data-testid = {'noRedOperative' + x}></td>}
        {blueOperatives[x] ? <td key={'blue' + x} onClick={() => setSelectedPlayer(blueOperatives[x])} >{blueOperatives[x].name}</td> : <td className = 'noOperative' data-testid = {'noBlueOperative' + x}></td>}
      </tr>)
  }

  let spymasterTable: JSX.Element
  if (blueSpymaster || redSpymaster) {
    spymasterTable = (
      <tr>
        {redSpymaster ? <td onClick={() => setSelectedPlayer(redSpymaster)}>{redSpymaster.name}</td> : <td className = 'noSpymaster' data-testid = 'noRedSpymaster'></td>}
        {blueSpymaster ? <td onClick={() => setSelectedPlayer(blueSpymaster)}>{blueSpymaster.name}</td> : <td className = 'noSpymaster' data-testid = 'noBlueSpymaster'></td>}
      </tr>
    )
  }

  return [spymasterTable, operativeTable]
}

type MakePlayerTables = (playerlist: User[], setSelectedPlayer: SetSelectedPlayer) => (JSX.Element | JSX.Element[])[]
type SetSelectedPlayer = (Value: User) => void
