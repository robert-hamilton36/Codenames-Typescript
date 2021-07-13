import React from 'react'
import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { WordObj } from '../../types/gameState'

interface IProps {
  word: WordObj
}

export const WordCard: React.FC<IProps> = ({ word }) => {
  const { setSelectedCard } = useSelectedCard()
  return (
    <div className="codeCard" onClick={() => setSelectedCard(word)}>
      <h1>{word.word}</h1>
    </div>
  )
}
