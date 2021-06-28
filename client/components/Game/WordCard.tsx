import React from 'react'
import { WordObj } from '../../types/gameState'

interface IProps {
  word: WordObj
}

export const WordCard: React.FC<IProps> = ({ word }) => {
  return (
    <div className="codeCard">
      <h1>{word.word}</h1>
    </div>
  )
}
