import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createMemoryHistory } from 'history'

import { LeaveGameButton } from '../LeaveGameButton'

import { useJoinGameActions, useVoteActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useSocketActions } from '../../../contexts/SocketContext'
import { useToaster } from '../../../contexts/ToasterContext'
import { useUserContext } from '../../../contexts/UserContext'

import { redSpymaster } from '../../../testing/mockdata/players'
import { Router } from 'react-router'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/SocketContext')
jest.mock('../../../contexts/ToasterContext')
jest.mock('../../../contexts/UserContext')

const leaveGame = jest.fn(() => Promise.resolve())
const removePlayersVote = jest.fn(() => Promise.resolve())
const setToaster = jest.fn(() => Promise.resolve())
const playerLeavesSocket = jest.fn(() => Promise.resolve())

const promise = Promise.resolve()

beforeEach(() => {
  useUserContext.mockReturnValue({ user: redSpymaster })
  useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
  useJoinGameActions.mockReturnValue({ leaveGame })
  useVoteActions.mockReturnValue({ removePlayersVote })
  useToaster.mockReturnValue({ setToaster })
  useSocketActions.mockReturnValue({ playerLeavesSocket })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text', () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Router history={history}>
      <LeaveGameButton />
    </Router>
  )
  const leaveGameButton = getByTestId('leaveGameButton')

  expect(leaveGameButton.textContent).toBe('Leave Game')
})

test('should call the correct function when leaveGameButton is clicked', async () => {
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Router history={history}>
      <LeaveGameButton />
    </Router>
  )

  const leaveGameButton = getByTestId('leaveGameButton')

  expect(leaveGameButton.textContent).toBe('Leave Game')

  await fireEvent.click(leaveGameButton)

  expect(removePlayersVote).toHaveBeenCalledTimes(1)
  await act(() => promise)
  expect(removePlayersVote).toHaveBeenCalledWith('7RVPD97JXBht7q1eFe8z', redSpymaster.uid)

  expect(playerLeavesSocket).toHaveBeenCalledTimes(1)

  expect(leaveGame).toHaveBeenCalledTimes(1)
  expect(leaveGame).toHaveBeenCalledWith(redSpymaster.uid, '7RVPD97JXBht7q1eFe8z')

  expect(setToaster).toHaveBeenCalledTimes(1)
  expect(setToaster.mock.calls[0][0]).toBeNull()

  expect(history.location.pathname).toBe('/')
})
