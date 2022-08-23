import React from 'react'
import { render } from '@testing-library/react'
import { PlayerInfo } from '../PlayerInfo'
import { DeviceList } from '../DeviceList'
import { PlayerList } from '../PlayerList'

import { redSpymaster, blueSpymaster, redHostOperative, blueOperative } from '../../../testing/mockdata/players'

jest.mock('../DeviceList')
jest.mock('../PlayerList')

const MockedDeviceList = DeviceList as jest.Mock
const MockedPlayerList = PlayerList as jest.Mock

beforeEach(() => {
  jest.resetAllMocks()

  MockedDeviceList.mockImplementation(({ devices }) => (
    <div data-testid='deviceList'>
      <ul>
        {devices.map((device, index) => {
          return <li key={device.uid}data-testid={'device' + index}>{device.name}</li>
        })}
      </ul>
    </div>
  ))

  MockedPlayerList.mockImplementation(({ playerList }) => (
    <div data-testid='playerList'>
      <ul>
        {playerList.map((device, index) => {
          return <li key={device.uid}data-testid={'player' + index}>{device.name}</li>
        })}
      </ul>
    </div>
  ))
})

test('should render DeviceList when game is tabletop, with no playerList', () => {
  const { queryByTestId } = render(<PlayerInfo playerList={[]} tableTop={true}/>)

  const listOfDevices = queryByTestId('deviceList')
  const listOfPlayers = queryByTestId('playerList')

  const device0 = queryByTestId('device0')
  const player0 = queryByTestId('player0')

  expect(DeviceList).toHaveBeenCalled()
  expect(PlayerList).not.toHaveBeenCalled()
  expect(listOfDevices).not.toBeNull()
  expect(listOfPlayers).toBeNull()

  expect(device0).toBeNull()
  expect(player0).toBeNull()
})

test("should render PlayerList when game isn't tabletop, with no playerList", () => {
  const { queryByTestId } = render(<PlayerInfo playerList={[]} tableTop={false}/>)

  const listOfDevices = queryByTestId('deviceList')
  const listOfPlayers = queryByTestId('playerList')

  const device0 = queryByTestId('device0')
  const player0 = queryByTestId('player0')

  expect(DeviceList).not.toHaveBeenCalled()
  expect(PlayerList).toHaveBeenCalled()
  expect(listOfDevices).toBeNull()
  expect(listOfPlayers).not.toBeNull()

  expect(device0).toBeNull()
  expect(player0).toBeNull()
})

test('should render DeviceList with players when game is tabletop', () => {
  const { queryByTestId } = render(<PlayerInfo playerList={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]} tableTop={true}/>)

  const listOfDevices = queryByTestId('deviceList')
  const listOfPlayers = queryByTestId('playerList')

  const device0 = queryByTestId('device0')
  const player0 = queryByTestId('player0')

  const device2 = queryByTestId('device2')
  const player2 = queryByTestId('player2')

  expect(DeviceList).toHaveBeenCalled()
  expect(PlayerList).not.toHaveBeenCalled()
  expect(listOfDevices).not.toBeNull()
  expect(listOfPlayers).toBeNull()

  expect(device0.textContent).toBe(redSpymaster.name)
  expect(player0).toBeNull()

  expect(device2.textContent).toBe(redHostOperative.name)
  expect(player2).toBeNull()
})

test("should render PlayerList with players when game isn't tabletop", () => {
  const { queryByTestId } = render(<PlayerInfo playerList={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]} tableTop={false}/>)

  const listOfDevices = queryByTestId('deviceList')
  const listOfPlayers = queryByTestId('playerList')

  const device1 = queryByTestId('device1')
  const player1 = queryByTestId('player1')

  const device3 = queryByTestId('device3')
  const player3 = queryByTestId('player3')

  expect(DeviceList).not.toHaveBeenCalled()
  expect(PlayerList).toHaveBeenCalled()
  expect(listOfDevices).toBeNull()
  expect(listOfPlayers).not.toBeNull()

  expect(device1).toBeNull()
  expect(player1.textContent).toBe(blueSpymaster.name)

  expect(device3).toBeNull()
  expect(player3.textContent).toBe(blueOperative.name)
})
