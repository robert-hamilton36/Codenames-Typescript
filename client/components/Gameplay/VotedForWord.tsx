import React from 'react'
import { VoteObject, WordObj } from '../../types/gameState'

export const VotedForWord: React.FC<Props> = ({ selectedCard, usersVote, handleVote, handleUnvote, handleLockIn }) => {
  if (!selectedCard) {
    return (
      <div data-testid='noSelectedCardVotedForWordDiv'>
        <h1 data-testid='votedForHeader'>Voted for: {usersVote.wordObj.word}</h1>
        <button onClick={handleUnvote} data-testid='removeVoteButton'>Remove {usersVote.wordObj.word} vote</button>
        {usersVote.locked
          ? <button onClick={handleLockIn} data-testid='removeLockinButton'>Remove Lock-in</button>
          : <button onClick={handleLockIn} data-testid='lockinButton'>Lock-in Vote</button>
        }
      </div>
    )
  }
  if (selectedCard.word === usersVote.wordObj.word) {
    return (
      <div data-testid='selectedWordSameAsVotedWordDiv'>
        <h1 data-testid='selectedCardHeader'>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleUnvote} data-testid='removeVoteButton'>Remove {usersVote.wordObj.word} vote</button>
        {usersVote.locked
          ? <button onClick={handleLockIn} data-testid='removeLockinButton'>Remove Lock-in</button>
          : <button onClick={handleLockIn} data-testid='lockinButton'>Lock-in Vote</button>
        }
      </div>
    )
  }

  if (selectedCard.word !== usersVote.wordObj.word) {
    return (
      <div data-testid='currentVoteNotSameAsSelectedCardDiv'>
        <h1 data-testid='votedForHeader'>Voted for: {usersVote.wordObj.word}</h1>
        <h1 data-testid='selectedCardHeader'>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleVote} data-testid='changeVoteButton'>Change Vote to {selectedCard.word}</button>
      </div>
    )
  }
}

interface Props {
  selectedCard: WordObj,
  usersVote: VoteObject,
  handleVote: () => void,
  handleUnvote: () => void,
  handleLockIn: () => void
}
