import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { UserNotVoted } from '../UserNotVoted'
import { wordListNoReveals } from '../../../testing/mockdata/wordObjects'

const handleVote = jest.fn()
const handleSkip = jest.fn()

const parkCardObject = wordListNoReveals[0]

afterEach(() => jest.clearAllMocks())

test('should render with correct text and values when there is no selectedCard', () => {
  const { queryByTestId, getByTestId } = render(<UserNotVoted selectedCard={null} handleVote={handleVote} handleSkip={handleSkip}/>)

  const selectedCard = queryByTestId('selectedCardUserNotVotedDiv')
  const noSelectedCard = queryByTestId('noSelectedCardUserNotVotedDiv')

  expect(selectedCard).toBeNull()
  expect(noSelectedCard).not.toBeNull()

  const selectACardOrSkipHeader = getByTestId('selectACardOrSkipHeader')
  const skipButton = getByTestId('noSelectedCardSkipButton')

  expect(selectACardOrSkipHeader.textContent).toBe('Select a card or vote to skip')
  expect(skipButton.textContent).toBe('Vote to Skip')
})

test('should correctly use handleSkip when noSelectedCardSkipButton is clicked with no selectedCard', () => {
  const { queryByTestId, getByTestId } = render(<UserNotVoted selectedCard={null} handleVote={handleVote} handleSkip={handleSkip}/>)

  const selectedCard = queryByTestId('selectedCardUserNotVotedDiv')
  const noSelectedCard = queryByTestId('noSelectedCardUserNotVotedDiv')
  const skipButton = getByTestId('noSelectedCardSkipButton')

  expect(selectedCard).toBeNull()
  expect(noSelectedCard).not.toBeNull()
  expect(skipButton.textContent).toBe('Vote to Skip')

  expect(handleSkip).toHaveBeenCalledTimes(0)

  fireEvent.click(skipButton)

  expect(handleSkip).toHaveBeenCalledTimes(1)
})

test('should render with correct text and values when there is a selectedCard', () => {
  const { queryByTestId, getByTestId } = render(<UserNotVoted selectedCard={parkCardObject} handleVote={handleVote} handleSkip={handleSkip}/>)

  const selectedCard = queryByTestId('selectedCardUserNotVotedDiv')
  const noSelectedCard = queryByTestId('noSelectedCardUserNotVotedDiv')

  expect(selectedCard).not.toBeNull()
  expect(noSelectedCard).toBeNull()

  const selectedCardHeader = getByTestId('selectedCardHeader')
  const selectedCardVoteButton = getByTestId('selectedCardVoteButton')
  const selectedCardSkipButton = getByTestId('selectedCardSkipButton')

  expect(selectedCardHeader.textContent).toBe('Selected Card: ' + parkCardObject.word)
  expect(selectedCardVoteButton.textContent).toBe('Vote for ' + parkCardObject.word)
  expect(selectedCardSkipButton.textContent).toBe('Vote to Skip')
})

test('should correctly use handleVote when selectedCardVoteButton is clicked with a selectedCard', () => {
  const { queryByTestId, getByTestId } = render(<UserNotVoted selectedCard={parkCardObject} handleVote={handleVote} handleSkip={handleSkip}/>)

  const selectedCard = queryByTestId('selectedCardUserNotVotedDiv')
  const noSelectedCard = queryByTestId('noSelectedCardUserNotVotedDiv')
  const selectedCardVoteButton = getByTestId('selectedCardVoteButton')

  expect(selectedCard).not.toBeNull()
  expect(noSelectedCard).toBeNull()
  expect(selectedCardVoteButton.textContent).toBe('Vote for ' + parkCardObject.word)

  expect(handleVote).toHaveBeenCalledTimes(0)

  fireEvent.click(selectedCardVoteButton)

  expect(handleVote).toHaveBeenCalledTimes(1)
})

test('should correctly use handleSkip when selectedCardSkipButton is clicked with a selectedCard', () => {
  const { queryByTestId, getByTestId } = render(<UserNotVoted selectedCard={parkCardObject} handleVote={handleVote} handleSkip={handleSkip}/>)

  const selectedCard = queryByTestId('selectedCardUserNotVotedDiv')
  const noSelectedCard = queryByTestId('noSelectedCardUserNotVotedDiv')
  const skipButton = getByTestId('selectedCardSkipButton')

  expect(selectedCard).not.toBeNull()
  expect(noSelectedCard).toBeNull()
  expect(skipButton.textContent).toBe('Vote to Skip')

  expect(handleSkip).toHaveBeenCalledTimes(0)

  fireEvent.click(skipButton)

  expect(handleSkip).toHaveBeenCalledTimes(1)
})
