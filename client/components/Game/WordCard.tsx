import React from 'react'

import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { WordObj } from '../../types/gameState'
import { useUserContext } from '../../contexts/UserContext'
import { getClassNameForWordCard } from '../../utility/getClassNameForWordCard'

interface IProps {
  word: WordObj
}

export const WordCard: React.FC<IProps> = ({ word }) => {
  const { selectedCard, setSelectedCard } = useSelectedCard()
  const { user } = useUserContext()

  const className = getClassNameForWordCard(selectedCard, user, word)
  return (
    <div className={className} onClick={() => setSelectedCard(word)}>
      <h1>{word.word}</h1>
    </div>
  )
}
