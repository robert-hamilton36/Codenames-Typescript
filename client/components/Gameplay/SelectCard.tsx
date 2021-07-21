import React from 'react'
import { useGuessActions } from '../../contexts/FirebaseContext'

import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'

export const SelectCard: React.FC = () => {
  const { selectedCard } = useSelectedCard()
  const { gameId } = useUserContext()
  const { changeWordToRevealed, endTurn } = useGuessActions()

  const handleTurnChange = () => {
    return endTurn(gameId)
  }

  const submitChoice = () => {
    return changeWordToRevealed(gameId, selectedCard.index)
  }

  if (selectedCard?.revealed) {
    return (
      <h1>This card is already revealed</h1>
    )
  }

  if (selectedCard) {
    return (
      <>
        <h1>Selected word: {selectedCard.word}</h1>
        <button onClick={submitChoice}>Select Word</button>
        <button onClick={handleTurnChange}>End Turn</button>
      </>
    )
  }

  return (
    <>
      <h1>Pick card team agrees on</h1>
      <button onClick={handleTurnChange}>End Turn</button>
    </>
  )
}
