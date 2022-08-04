import React from 'react'

import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'

import { WordObj } from '../../types/gameState'

import { getClassNameForWordCard } from '../../utility/getClassNameForWordCard'

export const WordCard: React.FC<Props> = ({ word }) => {
  const { selectedCard, setSelectedCard } = useSelectedCard()
  const { user } = useUserContext()

  const className = getClassNameForWordCard(selectedCard, user, word)
  return (
    <div className={className} onClick={() => setSelectedCard(word)} data-testid='wordContainer'>
      <h1 data-testid='wordHeader'>{word.word}</h1>
    </div>
  )
}

interface Props {
  word: WordObj
}
