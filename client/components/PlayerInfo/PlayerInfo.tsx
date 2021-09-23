import React from 'react'

import { DeviceList } from './DeviceList'
import { PlayerList } from './PlayerList'

import { User } from '../../types/user'

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
