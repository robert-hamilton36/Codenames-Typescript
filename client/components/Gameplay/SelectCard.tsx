import React from 'react'
import { useSelectedCard } from '../../contexts/SelectedCardContext'

export const SelectCard: React.FC = () => {
  const { selectedCard } = useSelectedCard()

  const handleTurnChange = () => {
    // firebase.actions.changeTeamsTurn()
  }

  const submitChoice = () => {
    return null
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
