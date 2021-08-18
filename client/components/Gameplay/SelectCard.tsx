import React from 'react'
import { useGuessActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'

import { useSelectedCard } from '../../contexts/SelectedCardContext'

export const SelectCard: React.FC = () => {
  const { selectedCard } = useSelectedCard()
  const { gameId } = useGameId()
  const { makeGuess, endTurn } = useGuessActions()

  const handleTurnChange = () => {
    return endTurn(gameId)
  }

  const submitChoice = () => {
    return makeGuess(gameId, selectedCard.index)
  }

  if (selectedCard?.revealed) {
    return (
      <h1 data-testid='cardRevealedHeader'>This card is already revealed</h1>
    )
  }

  if (selectedCard) {
    return (
      <>
        <h1 data-testid='selectedWordheader'>Selected word: {selectedCard.word}</h1>
        <button onClick={submitChoice} data-testid='selectWordButton'>Select Word</button>
        <button onClick={handleTurnChange} data-testid='endTurnButton'>End Turn</button>
      </>
    )
  }

  return (
    <>
      <h1 data-testid='noSelectedcardHeader'>Pick card team agrees on</h1>
      <button onClick={handleTurnChange}data-testid='endTurnButton'>End Turn</button>
    </>
  )
}
