import React from 'react'
import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'
import { PlayerObject } from '../../types/gameState'
import { HostOptions } from './HostOptions'

export const DeviceList: React.FC<Props> = ({ devices }) => {
  const [selectedDevice, setSelectedDevice] = usePlayerSelectorDeselector()

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
      {selectedDevice && <HostOptions selectedPlayer={selectedDevice} />}
    </div>
  )
}

interface Props {
  devices: PlayerObject[]
}
