import React from 'react'

import { HostOptions } from './HostOptions'

import { useUserContext } from '../../contexts/UserContext'

import { usePlayerSelectorDeselector } from '../../hooks/useSelectorDeselector'

import { User } from '../../types/user'

export const DeviceList: React.FC<Props> = ({ devices }) => {
  const [selectedDevice, setSelectedDevice] = usePlayerSelectorDeselector()
  const { user } = useUserContext()

  return (
    <div className = "playerList">
      <table>
        <tbody data-testid='deviceList'>
          {devices.map((device, index) => {
            let string = device.name + ' - '
            device.spymaster ? string += 'Spymaster' : string += 'Operative'
            return <tr key={device.uid}><td onClick={() => setSelectedDevice(device)} data-testid={'device' + index}>{string}</td></tr>
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
