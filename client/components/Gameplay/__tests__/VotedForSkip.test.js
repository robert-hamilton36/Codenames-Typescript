import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { VotedForSkip } from '../VotedForSkip'
import { beforeGameStartWordList } from '../../../testing/mockdata/wordObjects'
import { voteObjSkipPlayerObi, voteObjSkipLockedPlayerObi } from '../../../testing/mockdata/voteObjects'

const handleVote = jest.fn()
const handleUnvote = jest.fn()
const handleLockIn = jest.fn()

const parkCardObject = beforeGameStartWordList[0]

afterEach(() => jest.clearAllMocks())

describe('tests for no selected card', () => {
  test('should render correct text and values, when usersVote is not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()

    const votedToSkipHeader = getByTestId('votedToSkipHeader')
    const skipButton = getByTestId('skipButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(votedToSkipHeader.textContent).toBe('Voted to skip')
    expect(skipButton.textContent).toBe('Remove Skip Vote')

    expect(removeLockinButton).toBeNull()
    expect(lockinButton).not.toBeNull()

    expect(lockinButton.textContent).toBe('Lock-in Vote')
  })

  test('should call handleUnvote, when usersVote is not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')
    const skipButton = getByTestId('skipButton')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()
    expect(skipButton.textContent).toBe('Remove Skip Vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(skipButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call handleLockIn, when usersVote is not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')
    const lockinButton = getByTestId('lockinButton')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()
    expect(lockinButton.textContent).toBe('Lock-in Vote')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(lockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })

  test('should render correct text and values, when usersVote is locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()

    const votedToSkipHeader = getByTestId('votedToSkipHeader')
    const skipButton = getByTestId('skipButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(votedToSkipHeader.textContent).toBe('Voted to skip')
    expect(skipButton.textContent).toBe('Remove Skip Vote')

    expect(removeLockinButton).not.toBeNull()
    expect(lockinButton).toBeNull()

    expect(removeLockinButton.textContent).toBe('Remove Lock-in')
  })

  test('should call handleUnvote, when usersVote is locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')
    const skipButton = getByTestId('skipButton')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()
    expect(skipButton.textContent).toBe('Remove Skip Vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(skipButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call handleLockIn, when usersVote is locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={null} usersVote={voteObjSkipLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')
    const removeLockinButton = getByTestId('removeLockinButton')

    expect(selectedCardVotedForSkip).toBeNull()
    expect(noSelectedCardVotedForSkip).not.toBeNull()
    expect(removeLockinButton.textContent).toBe('Remove Lock-in')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(removeLockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })
})

describe('tests for when there is a selected card', () => {
  test('should render correct text and values, when usersVote is not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={parkCardObject} usersVote={voteObjSkipPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')

    expect(selectedCardVotedForSkip).not.toBeNull()
    expect(noSelectedCardVotedForSkip).toBeNull()

    const selectedCardHeader = getByTestId('selectedCardHeader')
    const voteButton = getByTestId('voteButton')

    expect(selectedCardHeader.textContent).toBe('Selected Card: ' + parkCardObject.word)
    expect(voteButton.textContent).toBe('Vote for ' + parkCardObject.word)
  })

  test('should call handleVote, when usersVote is not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForSkip selectedCard={parkCardObject} usersVote={voteObjSkipPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const selectedCardVotedForSkip = queryByTestId('selectedCardVotedForSkip')
    const noSelectedCardVotedForSkip = queryByTestId('noSelectedCardVotedForSkip')
    const voteButton = getByTestId('voteButton')

    expect(selectedCardVotedForSkip).not.toBeNull()
    expect(noSelectedCardVotedForSkip).toBeNull()
    expect(voteButton.textContent).toBe('Vote for ' + parkCardObject.word)

    expect(handleVote).toHaveBeenCalledTimes(0)

    fireEvent.click(voteButton)

    expect(handleVote).toHaveBeenCalledTimes(1)
  })
})
