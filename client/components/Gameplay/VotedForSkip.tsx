import React from 'react'

import { VoteObject, WordObj } from '../../types/gameState'

export const VotedForSkip: React.FC<Props> = ({ selectedCard, usersVote, handleVote, handleUnvote, handleLockIn }) => {
  if (selectedCard) {
    return (
      <div data-testid='selectedCardVotedForSkip'>
        <h1 data-testid='selectedCardHeader'>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleVote} data-testid='voteButton'>Vote for {selectedCard.word}</button>
      </div>
    )
  }

  return (
    <div data-testid='noSelectedCardVotedForSkip'>
      <h1 data-testid='votedToSkipHeader'>Voted to skip</h1>
      <button onClick={handleUnvote} data-testid='skipButton'>Remove Skip Vote</button>
      {usersVote.locked
        ? <button onClick={handleLockIn} data-testid='removeLockinButton'>Remove Lock-in</button>
        : <button onClick={handleLockIn} data-testid='lockinButton'>Lock-in Vote</button>
      }
    </div>
  )
}

interface Props {
  selectedCard: WordObj,
  usersVote: VoteObject,
  handleVote: () => void,
  handleUnvote: () => void,
  handleLockIn: () => void
}
