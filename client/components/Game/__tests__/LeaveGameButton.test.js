import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createMemoryHistory } from 'history'

import { LeaveGameButton } from '../LeaveGameButton'

import { useJoinGameActions, useVoteActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useUserContext } from '../../../contexts/UserContext'
import { useToaster } from '../../../contexts/ToasterContext'

import { redSpymaster } from '../../../testing/mockdata/players'
import { Router } from 'react-router'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/UserContext')
jest.mock('../../../contexts/ToasterContext')

const leaveGame = jest.fn(() => Promise.resolve())
const removePlayersVote = jest.fn(() => Promise.resolve())
const setToaster = jest.fn(() => Promise.resolve())

const promise = Promise.resolve()

beforeEach(() => {
  useUserContext.mockReturnValue({ user: redSpymaster })
  useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
  useJoinGameActions.mockReturnValue({ leaveGame })
  useVoteActions.mockReturnValue({ removePlayersVote })
  useToaster.mockReturnValue({ setToaster })
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
  expect(removePlayersVote.mock.calls[0][0]).toBe('7RVPD97JXBht7q1eFe8z')
  expect(removePlayersVote.mock.calls[0][1]).toBe(redSpymaster.uid)

  expect(leaveGame).toHaveBeenCalledTimes(1)
  expect(leaveGame.mock.calls[0][0]).toBe(redSpymaster.uid)
  expect(leaveGame.mock.calls[0][1]).toBe('7RVPD97JXBht7q1eFe8z')

  expect(setToaster).toHaveBeenCalledTimes(1)
  expect(setToaster.mock.calls[0][0]).toBeNull()

  expect(history.location.pathname).toBe('/')
})
