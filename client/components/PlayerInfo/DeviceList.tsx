import React from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'
import { User } from '../../types/gameState'
import { HostOptions } from './HostOptions'

export const DeviceList: React.FC<Props> = ({ devices }) => {
  const [selectedDevice, setSelectedDevice] = usePlayerSelectorDeselector()
  const { user } = useUserContext()

  return (
    <div className = "playerList">
      <table>
        <tbody>
          {devices.map((device) => {
            let string = device.name + ' - '
            device.spymaster ? string += 'Spymaster' : string += ' Operative'
            return <tr key={device.name}><td onClick={() => setSelectedDevice(device)}>{string}</td></tr>
          })}
        </tbody>
      </table>
      {selectedDevice && user.host && <HostOptions selectedPlayer={selectedDevice} setSelectedPlayer={setSelectedDevice} />}
    </div>
  )
}

interface Props {
  devices: User[]
}
