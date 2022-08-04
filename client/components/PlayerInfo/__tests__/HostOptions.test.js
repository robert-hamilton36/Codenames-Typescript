import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { HostOptions } from '../HostOptions'
import { usePlayerActions, useJoinGameActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'

import { redSpymaster, blueSpymaster, redOperative, blueOperative } from '../../../testing/mockdata/players'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')

const editSpymasterOperative = jest.fn(() => Promise.resolve())
const changePlayersTeam = jest.fn(() => Promise.resolve())
const kickPlayer = jest.fn(() => Promise.resolve())

beforeEach(() => {
  jest.clearAllMocks()

  usePlayerActions.mockReturnValue({ editSpymasterOperative, changePlayersTeam })
  useJoinGameActions.mockReturnValue({ kickPlayer })
  useGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
})

test('should render with correct text and values with no selected player', () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={{}} setSelectedPlayer={setSelectedPlayer}/>)

  const selectedPlayerName = getByTestId('nameHeader')
  const selectedPlayerTeam = getByTestId('teamHeader')
  const changeRoleButton = getByTestId('buttonChangeRole')
  const changeTeamButton = getByTestId('buttonChangeTeam')
  const kickButton = getByTestId('buttonKick')

  expect(selectedPlayerName.textContent).toBe('Selected Player: ')
  expect(selectedPlayerTeam.textContent).toBe('Team: ')
  // getOppositeRole defaults to spymaster
  expect(changeRoleButton.textContent).toBe('Make spymaster')
  // getOppositeTeamColour defaults to red
  expect(changeTeamButton.textContent).toBe('red Team')
  expect(kickButton.textContent).toBe('Kick')
})

test('should render with correct text and values with redSpymaster', () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={redSpymaster} setSelectedPlayer={setSelectedPlayer}/>)

  const selectedPlayerName = getByTestId('nameHeader')
  const selectedPlayerTeam = getByTestId('teamHeader')
  const changeRoleButton = getByTestId('buttonChangeRole')
  const changeTeamButton = getByTestId('buttonChangeTeam')
  const kickButton = getByTestId('buttonKick')

  expect(selectedPlayerName.textContent).toBe('Selected Player: ' + redSpymaster.name)
  expect(selectedPlayerTeam.textContent).toBe('Team: ' + redSpymaster.team)
  expect(changeRoleButton.textContent).toBe('Make operative')
  expect(changeTeamButton.textContent).toBe('blue Team')
  expect(kickButton.textContent).toBe('Kick')
})

test('should render with correct text and values with blueSpymaster', () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={blueSpymaster} setSelectedPlayer={setSelectedPlayer}/>)

  const selectedPlayerName = getByTestId('nameHeader')
  const selectedPlayerTeam = getByTestId('teamHeader')
  const changeRoleButton = getByTestId('buttonChangeRole')
  const changeTeamButton = getByTestId('buttonChangeTeam')
  const kickButton = getByTestId('buttonKick')

  expect(selectedPlayerName.textContent).toBe('Selected Player: ' + blueSpymaster.name)
  expect(selectedPlayerTeam.textContent).toBe('Team: ' + blueSpymaster.team)
  expect(changeRoleButton.textContent).toBe('Make operative')
  expect(changeTeamButton.textContent).toBe('red Team')
  expect(kickButton.textContent).toBe('Kick')
})

test('should render with correct text and values with redOperative', () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={redOperative} setSelectedPlayer={setSelectedPlayer}/>)

  const selectedPlayerName = getByTestId('nameHeader')
  const selectedPlayerTeam = getByTestId('teamHeader')
  const changeRoleButton = getByTestId('buttonChangeRole')
  const changeTeamButton = getByTestId('buttonChangeTeam')
  const kickButton = getByTestId('buttonKick')

  expect(selectedPlayerName.textContent).toBe('Selected Player: ' + redOperative.name)
  expect(selectedPlayerTeam.textContent).toBe('Team: ' + redOperative.team)
  expect(changeRoleButton.textContent).toBe('Make spymaster')
  expect(changeTeamButton.textContent).toBe('blue Team')
  expect(kickButton.textContent).toBe('Kick')
})

test('should render with correct text and values with blueOperative', () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={blueOperative} setSelectedPlayer={setSelectedPlayer}/>)

  const selectedPlayerName = getByTestId('nameHeader')
  const selectedPlayerTeam = getByTestId('teamHeader')
  const changeRoleButton = getByTestId('buttonChangeRole')
  const changeTeamButton = getByTestId('buttonChangeTeam')
  const kickButton = getByTestId('buttonKick')

  expect(selectedPlayerName.textContent).toBe('Selected Player: ' + blueOperative.name)
  expect(selectedPlayerTeam.textContent).toBe('Team: ' + blueOperative.team)
  expect(changeRoleButton.textContent).toBe('Make spymaster')
  expect(changeTeamButton.textContent).toBe('red Team')
  expect(kickButton.textContent).toBe('Kick')
})

test('should fire the correct functions when the change role button is clicked', async () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={blueOperative} setSelectedPlayer={setSelectedPlayer}/>)

  const changeRoleButton = getByTestId('buttonChangeRole')

  await fireEvent.click(changeRoleButton)

  expect(editSpymasterOperative).toHaveBeenCalledTimes(1)
  expect(editSpymasterOperative.mock.calls[0][0]).toBe('sUhCubsdZeKRsepPr9ag')
  expect(editSpymasterOperative.mock.calls[0][1]).toBe(blueOperative.uid)
  expect(setSelectedPlayer.mock.calls[0][0]).toBeNull()
  expect(setSelectedPlayer).toHaveBeenCalledTimes(1)
})

test('should fire the correct functions when the change team button is clicked', async () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={blueOperative} setSelectedPlayer={setSelectedPlayer}/>)

  const changeTeamButton = getByTestId('buttonChangeTeam')

  await fireEvent.click(changeTeamButton)

  expect(changePlayersTeam).toHaveBeenCalledTimes(1)
  expect(changePlayersTeam.mock.calls[0][0]).toBe('sUhCubsdZeKRsepPr9ag')
  expect(changePlayersTeam.mock.calls[0][1]).toBe(blueOperative.uid)
  expect(changePlayersTeam.mock.calls[0][2]).toBe('red')

  expect(setSelectedPlayer.mock.calls[0][0]).toBeNull()
  expect(setSelectedPlayer).toHaveBeenCalledTimes(1)
})

test('should fire the correct function when the kick button is clicked', async () => {
  const setSelectedPlayer = jest.fn()

  const { getByTestId } = render(<HostOptions selectedPlayer={blueOperative} setSelectedPlayer={setSelectedPlayer}/>)

  const kickButton = getByTestId('buttonKick')

  await fireEvent.click(kickButton)

  expect(kickPlayer).toHaveBeenCalledTimes(1)
  expect(kickPlayer.mock.calls[0][0]).toBe(blueOperative.uid)
  expect(kickPlayer.mock.calls[0][1]).toBe('sUhCubsdZeKRsepPr9ag')

  expect(setSelectedPlayer.mock.calls[0][0]).toBeNull()
  expect(setSelectedPlayer).toHaveBeenCalledTimes(1)
})
