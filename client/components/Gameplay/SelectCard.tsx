import React from 'react'
import { useGuessActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'

import { makeUserGuessLog } from '../../utility/makeLog'
import { LogEntry } from '../../types/gameState'

export const SelectCard: React.FC<Props> = ({ gameLog }) => {
  const { selectedCard } = useSelectedCard()
  const { user } = useUserContext()
  const { gameId } = useGameId()
  const { makeGuess, endTurn } = useGuessActions()

  const handleTurnChange = () => {
    const log = makeUserGuessLog(gameLog, user)
    return endTurn(gameId, user, log)
  }

  const submitChoice = () => {
    const log = makeUserGuessLog(gameLog, user, selectedCard)
    return makeGuess(gameId, selectedCard.index, user, log)
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
      <h1 data-testid='noSelectedcardHeader'>Select a card</h1>
      <button onClick={handleTurnChange}data-testid='endTurnButton'>End Turn</button>
    </>
  )
}

interface Props {
  gameLog: LogEntry[]
}
