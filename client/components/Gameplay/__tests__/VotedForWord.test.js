import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { VotedForWord } from '../VotedForWord'
import { beforeGameStartWordList } from '../../../testing/mockdata/wordObjects'
import { voteObjMassPlayerAni, voteObjParkPlayerObi, voteObjParkLockedPlayerObi } from '../../../testing/mockdata/voteObjects'

const handleVote = jest.fn()
const handleUnvote = jest.fn()
const handleLockIn = jest.fn()

const parkCardObject = beforeGameStartWordList[0]
const massCardObject = beforeGameStartWordList[1]

afterEach(() => jest.clearAllMocks())

describe('tests for no selected card', () => {
  test('should render correct text and values with a users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjMassPlayerAni} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()

    const votedForHeader = getByTestId('votedForHeader')
    const removeVoteButton = getByTestId('removeVoteButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(votedForHeader.textContent).toBe('Voted for: ' + voteObjMassPlayerAni.wordObj.word)
    expect(removeVoteButton.textContent).toBe('Remove ' + voteObjMassPlayerAni.wordObj.word + ' vote')

    expect(removeLockinButton).toBeNull()
    expect(lockinButton).not.toBeNull()

    expect(lockinButton.textContent).toBe('Lock-in Vote')
  })

  test('should call correct function, handleUnvote when remove vote button is pressed with a users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjMassPlayerAni} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeVoteButton = getByTestId('removeVoteButton')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeVoteButton.textContent).toBe('Remove ' + voteObjMassPlayerAni.wordObj.word + ' vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(removeVoteButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call correct function, handleLockIn when Lock-in vote button is pressed with a users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjMassPlayerAni} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const lockinButton = getByTestId('lockinButton')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(lockinButton.textContent).toBe('Lock-in Vote')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(lockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })

  test('should render correct text and values with a users vote thats locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()

    const votedForHeader = getByTestId('votedForHeader')
    const removeVoteButton = getByTestId('removeVoteButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(votedForHeader.textContent).toBe('Voted for: ' + voteObjParkLockedPlayerObi.wordObj.word)
    expect(removeVoteButton.textContent).toBe('Remove ' + voteObjParkLockedPlayerObi.wordObj.word + ' vote')

    expect(removeLockinButton).not.toBeNull()
    expect(lockinButton).toBeNull()

    expect(removeLockinButton.textContent).toBe('Remove Lock-in')
  })

  test('should call correct function, handleUnvote when remove vote button is pressed with a users vote thats locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeVoteButton = getByTestId('removeVoteButton')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeVoteButton.textContent).toBe('Remove ' + voteObjParkLockedPlayerObi.wordObj.word + ' vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(removeVoteButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call correct function, handleLockIn when Lock-in vote button is pressed with a users vote thats locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={null} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeLockinButton = getByTestId('removeLockinButton')

    expect(noSelectedCardVotedForWordDiv).not.toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeLockinButton.textContent).toBe('Remove Lock-in')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(removeLockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })
})

describe('tests for when selected card is the same as usersVote', () => {
  test('should render correct text and values when users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()

    const selectedCardHeader = getByTestId('selectedCardHeader')
    const removeVoteButton = getByTestId('removeVoteButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(selectedCardHeader.textContent).toBe('Selected Card: ' + parkCardObject.word)
    expect(removeVoteButton.textContent).toBe('Remove ' + parkCardObject.word + ' vote')

    expect(removeLockinButton).toBeNull()
    expect(lockinButton).not.toBeNull()

    expect(lockinButton.textContent).toBe('Lock-in Vote')
  })

  test('should call correct function, handleUnvote, when Remove vote button is clicked with a users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeVoteButton = getByTestId('removeVoteButton')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeVoteButton.textContent).toBe('Remove ' + parkCardObject.word + ' vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(removeVoteButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call correct function, handleLockIn, when lockInButton is clicked with a users vote not locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const lockinButton = getByTestId('lockinButton')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(lockinButton.textContent).toBe('Lock-in Vote')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(lockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })

  test('should render correct text and values when users vote is locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()

    const selectedCardHeader = getByTestId('selectedCardHeader')
    const removeVoteButton = getByTestId('removeVoteButton')

    const removeLockinButton = queryByTestId('removeLockinButton')
    const lockinButton = queryByTestId('lockinButton')

    expect(selectedCardHeader.textContent).toBe('Selected Card: ' + parkCardObject.word)
    expect(removeVoteButton.textContent).toBe('Remove ' + parkCardObject.word + ' vote')

    expect(removeLockinButton).not.toBeNull()
    expect(lockinButton).toBeNull()

    expect(removeLockinButton.textContent).toBe('Remove Lock-in')
  })

  test('should call correct function, handleUnvote, when Remove vote button is clicked with a users vote thats locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeVoteButton = getByTestId('removeVoteButton')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeVoteButton.textContent).toBe('Remove ' + parkCardObject.word + ' vote')

    expect(handleUnvote).toHaveBeenCalledTimes(0)

    fireEvent.click(removeVoteButton)

    expect(handleUnvote).toHaveBeenCalledTimes(1)
  })

  test('should call correct function, handleLockIn, when lockInButton is clicked with a users vote thats locked in', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={parkCardObject} usersVote={voteObjParkLockedPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const removeLockinButton = getByTestId('removeLockinButton')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).not.toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).toBeNull()
    expect(removeLockinButton.textContent).toBe('Remove Lock-in')

    expect(handleLockIn).toHaveBeenCalledTimes(0)

    fireEvent.click(removeLockinButton)

    expect(handleLockIn).toHaveBeenCalledTimes(1)
  })
})

describe('tests for when selected card is different then usersVote', () => {
  test('should render correct text and values', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={massCardObject} usersVote={voteObjParkPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).not.toBeNull()

    const votedForHeader = getByTestId('votedForHeader')
    const selectedCardHeader = getByTestId('selectedCardHeader')
    const changeVoteButton = getByTestId('changeVoteButton')

    expect(votedForHeader.textContent).toBe('Voted for: ' + voteObjParkPlayerObi.wordObj.word)
    expect(selectedCardHeader.textContent).toBe('Selected Card: ' + massCardObject.word)
    expect(changeVoteButton.textContent).toBe('Change Vote to ' + massCardObject.word)
  })

  test('should call correct function, handleVote, when vhangeVoteButton is clicked', () => {
    const { queryByTestId, getByTestId } = render(<VotedForWord selectedCard={massCardObject} usersVote={voteObjParkPlayerObi} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />)

    const noSelectedCardVotedForWordDiv = queryByTestId('noSelectedCardVotedForWordDiv')
    const selectedWordSameAsVotedWordDiv = queryByTestId('selectedWordSameAsVotedWordDiv')
    const currentVoteNotSameAsSelectedCardDiv = queryByTestId('currentVoteNotSameAsSelectedCardDiv')
    const changeVoteButton = getByTestId('changeVoteButton')

    expect(noSelectedCardVotedForWordDiv).toBeNull()
    expect(selectedWordSameAsVotedWordDiv).toBeNull()
    expect(currentVoteNotSameAsSelectedCardDiv).not.toBeNull()
    expect(changeVoteButton.textContent).toBe('Change Vote to ' + massCardObject.word)

    expect(handleVote).toHaveBeenCalledTimes(0)

    fireEvent.click(changeVoteButton)

    expect(handleVote).toHaveBeenCalledTimes(1)
  })
})
