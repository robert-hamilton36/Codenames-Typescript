import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { LeaveGameButton } from '../LeaveGameButton'

import { useJoinGameActions, useVoteActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useUserContext } from '../../../contexts/UserContext'

import { redSpymaster } from '../../../testing/mockdata/players'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/UserContext')

const leaveGame = jest.fn(() => Promise.resolve())
const removePlayersVote = jest.fn(() => Promise.resolve())

beforeEach(() => {
  useUserContext.mockReturnValue({ user: redSpymaster })
  useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
  useJoinGameActions.mockReturnValue({ leaveGame })
  useVoteActions.mockReturnValue({ removePlayersVote })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text', () => {
  const { getByTestId } = render(<LeaveGameButton />)

  const leaveGameButton = getByTestId('leaveGameButton')

  expect(leaveGameButton.textContent).toBe('Leave Game')
})

test('should call the correct function when leaveGameButton is clicked', () => {
  const { getByTestId } = render(<LeaveGameButton />)

  const leaveGameButton = getByTestId('leaveGameButton')

  expect(leaveGameButton.textContent).toBe('Leave Game')

  fireEvent.click(leaveGameButton)

  expect(removePlayersVote).toHaveBeenCalledTimes(1)
  expect(removePlayersVote.mock.calls[0][0]).toBe('7RVPD97JXBht7q1eFe8z')
  expect(removePlayersVote.mock.calls[0][1]).toBe(redSpymaster.uid)
})

// todo, mock react-router-dom
