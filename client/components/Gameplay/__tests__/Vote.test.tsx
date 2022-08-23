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
import { makeTeamGuessLog } from '../../../utility/makeLog'

import { wordListNoReveals } from '../../../testing/mockdata/wordObjects'
import { voteObjParkRedSpymaster, voteObjMassBlueSpymaster, voteObjSkipBlueSpymaster, voteObjSkipRedSpymaster } from '../../../testing/mockdata/voteObjects'
import { redSpymaster as userAnakin } from '../../../testing/mockdata/players'
import { userGameLog } from '../../../testing/mockdata/gameLog'

jest.mock('../UserNotVoted')
jest.mock('../VotedForSkip')
jest.mock('../VotedForWord')

const MockedUserNotVoted = UserNotVoted as jest.Mock
const MockedVotedForSkip = VotedForSkip as jest.Mock
const MockedVotedForWord = VotedForWord as jest.Mock

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/SelectedCardContext')
jest.mock('../../../contexts/UserContext')
jest.mock('../../../utility/makeLog')

const MockedUseVoteActions = useVoteActions as jest.Mock
const MockedUseGameId = useGameId as jest.Mock
const MockedUseSelectedCard = useSelectedCard as jest.Mock
const MockedUseUserContext = useUserContext as jest.Mock
const MockedMakeTeamGuessLog = makeTeamGuessLog as jest.Mock

const addPlayerVote = jest.fn(() => Promise.resolve())
const removePlayersVote = jest.fn(() => Promise.resolve())
const invertLockStatusForPlayersVote = jest.fn(() => Promise.resolve())

MockedUserNotVoted.mockReturnValue(<div data-testid='userNotVoted'>UserNotVoted</div>)
MockedVotedForSkip.mockReturnValue(<div data-testid='votedForSkip'>VotedForSkip</div>)
MockedVotedForWord.mockReturnValue(<div data-testid='votedForWord'>VotedForWord</div>)

MockedMakeTeamGuessLog.mockReturnValue(userGameLog[1])

const parkCardObj = wordListNoReveals[0]

beforeEach(() => {
  MockedUseGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
  MockedUseVoteActions.mockReturnValue({ addPlayerVote: addPlayerVote, removePlayersVote: removePlayersVote, invertLockStatusForPlayersVote: invertLockStatusForPlayersVote })
  MockedUseUserContext.mockReturnValue({ user: userAnakin })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text and values with no votes', () => {
  MockedUseSelectedCard.mockReturnValue(parkCardObj)
  const votes = []
  const { queryByTestId } = render(<Vote votes={votes} gameLog={[]}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values with one vote for a word which is not the usersVote', () => {
  MockedUseSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjMassBlueSpymaster]
  const { queryByTestId } = render(<Vote votes={votes} gameLog={[]}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values with one vote for a skip which is not the usersVote', () => {
  MockedUseSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjSkipBlueSpymaster]
  const { queryByTestId } = render(<Vote votes={votes} gameLog={[]}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')
})

test('should render with correct text and values when user has voted for a word', () => {
  MockedUseSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjParkRedSpymaster]
  const { queryByTestId } = render(<Vote votes={votes} gameLog={[]}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(userNotVoted).toBeNull()
  expect(votedForWord).not.toBeNull()
  expect(votedForWord.textContent).toBe('VotedForWord')
})

test('should render with correct text and values when user has voted for skip', () => {
  MockedUseSelectedCard.mockReturnValue(parkCardObj)
  const votes = [voteObjSkipRedSpymaster]
  const { queryByTestId } = render(<Vote votes={votes} gameLog={[]}/>)

  const votedForSkip = queryByTestId('votedForSkip')
  const votedForWord = queryByTestId('votedForWord')
  const userNotVoted = queryByTestId('userNotVoted')

  expect(userNotVoted).toBeNull()
  expect(votedForWord).toBeNull()
  expect(votedForSkip).not.toBeNull()
  expect(votedForSkip.textContent).toBe('VotedForSkip')
})

test('should correctly update usersVote via useEffect when votes are updated', () => {
  const { rerender, queryByTestId } = render(<Vote votes={[voteObjSkipBlueSpymaster]} gameLog={[]}/>)

  let votedForSkip = queryByTestId('votedForSkip')
  let votedForWord = queryByTestId('votedForWord')
  let userNotVoted = queryByTestId('userNotVoted')

  expect(votedForSkip).toBeNull()
  expect(votedForWord).toBeNull()
  expect(userNotVoted).not.toBeNull()
  expect(userNotVoted.textContent).toBe('UserNotVoted')

  rerender(<Vote votes={[voteObjSkipBlueSpymaster, voteObjSkipRedSpymaster]} gameLog={[]}/>)

  votedForSkip = queryByTestId('votedForSkip')
  votedForWord = queryByTestId('votedForWord')
  userNotVoted = queryByTestId('userNotVoted')

  expect(userNotVoted).toBeNull()
  expect(votedForWord).toBeNull()
  expect(votedForSkip).not.toBeNull()
  expect(votedForSkip.textContent).toBe('VotedForSkip')
})
