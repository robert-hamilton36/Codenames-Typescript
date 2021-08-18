import React from 'react'
import { WordObj } from '../../types/gameState'

export const UserNotVoted: React.FC<Props> = ({ selectedCard, handleVote, handleSkip }) => {
  if (selectedCard) {
    return (
      <div data-testid='selectedCardUserNotVotedDiv'>
        <h1 data-testid='selectedCardHeader'>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleVote} data-testid='selectedCardVoteButton'>Vote for {selectedCard.word}</button>
        <button onClick={handleSkip} data-testid='selectedCardSkipButton'>Vote to Skip</button>
      </div>
    )
  }

  return (
    <div data-testid='noSelectedCardUserNotVotedDiv'>
      <h1 data-testid='selectACardOrSkipHeader'>Select a card or vote to skip</h1>
      <button onClick={handleSkip} data-testid='noSelectedCardSkipButton'>Vote to Skip</button>
    </div>
  )
}

interface Props {
  selectedCard: WordObj,
  handleSkip: () => void,
  handleVote: () => void
}
