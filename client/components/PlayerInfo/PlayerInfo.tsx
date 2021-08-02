import React from 'react'

import { User } from '../../types/gameState'
import { DeviceList } from './DeviceList'
import { PlayerList } from './PlayerList'

export const PlayerInfo: React.FC<Props> = ({ playerList, tableTop }) => {
  if (tableTop) {
    return (
      <DeviceList devices={playerList} />
    )
  } else {
    return (
      <PlayerList playerList={playerList} />
    )
  }
}

interface Props {
  playerList: User[]
  tableTop: boolean
}
