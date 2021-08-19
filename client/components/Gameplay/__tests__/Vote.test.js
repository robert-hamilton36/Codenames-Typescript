import React from 'react'
import { render } from '@testing-library/react'
import { Vote } from '../Vote'

import { UserNotVoted } from '../UserNotVoted'
import { VotedForSkip } from '../VotedForSkip'
import { VotedForWord } from '../VotedForWord'

import { useVoteActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useSelectedCard } from '../../../contexts/SelectedCardContext'
import { useUserContext } from '../../../contexts/UserContext'

import { wordListNoReveals } from '../../../testing/mockdata/wordObjects'
import { voteObjMassPlayerAni, voteObjParkPlayerObi, voteObjSkipPlayerObi, voteObjSkipPlayerAni } from '../../../testing/mockdata/voteObjects'
import { redSpymaster as userAnakin } from '../../../testing/mockdata/players'

jest.mock('../UserNotVoted')
jest.mock('../VotedForSkip')
jest.mock('../VotedForWord')

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/SelectedCardContext')
jest.mock('../../../contexts/UserContext')

const addPlayerVote = jest.fn(() => Promise.resolve())
const removePlayersVote = jest.fn(() => Promise.resolve())
const invertLockStatusForPlayersVote = jest.fn(() => Promise.resolve())

UserNotVoted.mockReturnValue(<div data-testid='userNotVoted'>UserNotVoted</div>)
VotedForSkip.mockReturnValue(<div data-testid='votedForSkip'>VotedForSkip</div>)
VotedForWord.mockReturnValue(<div data-testid='votedForWord'>VotedForWord</div>)

const parkCardObj = wordListNoReveals[0]

beforeEach(() => {
  useGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
  useVoteActions.mockReturnValue({ addPlayerVote: addPlayerVote, removePlayersVote: removePlayersVote, invertLockStatusForPlayersVote: invertLockStatusForPlayersVote })
  useUserContext.mockReturnValue({ user: userAnakin })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text and values with no votes', () => {
  useSelectedCard.mockReturnValue(parkCardObj)
  const votes = []
  const { queryByTestId } = render(<Vote votes={votes}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values with one vote for a word which is not the usersVote', () => {
  useSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjParkPlayerObi]
  const { queryByTestId } = render(<Vote votes={votes}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values with one vote for a skip which is not the usersVote', () => {
  useSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjSkipPlayerObi]
  const { queryByTestId } = render(<Vote votes={votes}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values when user has voted for a word', () => {
  useSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjMassPlayerAni]
  const { queryByTestId } = render(<Vote votes={votes}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(userNotVoted).toBeNull()
  expect(votedForWord).not.toBeNull()
  expect(votedForWord.textContent).toBe('VotedForWord')
})

test('should render with correct text and values when user has voted for skip', () => {
  useSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjSkipPlayerAni]
  const { queryByTestId } = render(<Vote votes={votes}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(userNotVoted).toBeNull()
  expect(votedForWord).toBeNull()
  expect(votedForSkip).not.toBeNull()
  expect(votedForSkip.textContent).toBe('VotedForSkip')
})

test('should correctly update usersVote via useEffect when votes are updated', () => {
  const { rerender, queryByTestId } = render(<Vote votes={[voteObjSkipPlayerObi]}/>)

  let votedForSkip = queryByTestId('votedForSkip')
  let votedForWord = queryByTestId('votedForWord')
  let userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')

  rerender(<Vote votes={[voteObjSkipPlayerObi, voteObjSkipPlayerAni]}/>)

  votedForSkip = queryByTestId('votedForSkip')
  votedForWord = queryByTestId('votedForWord')
  userNotVoted = queryByTestId('userNotVoted')

  expect(userNotVoted).toBeNull()
  expect(votedForWord).toBeNull()
  expect(votedForSkip).not.toBeNull()
  expect(votedForSkip.textContent).toBe('VotedForSkip')
})
