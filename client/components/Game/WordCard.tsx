import React from 'react'

import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { WordObj } from '../../types/gameState'
import { useUserContext } from '../../contexts/UserContext'
import { getClassNameForWordCard } from '../../utility/getClassNameForWordCard'

export const WordCard: React.FC<Props> = ({ word }) => {
  const { selectedCard, setSelectedCard } = useSelectedCard()
  const { user } = useUserContext()

  const className = getClassNameForWordCard(selectedCard, user, word)
  return (
    <div className={className} onClick={() => setSelectedCard(word)}>
      <h1>{word.word}</h1>
    </div>
  )
}

interface Props {
  word: WordObj
}
