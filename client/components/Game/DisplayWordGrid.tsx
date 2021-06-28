import React from 'react'
import { WordObj } from '../../types/gameState'
import { WordCard } from './WordCard'

interface IProps {
  wordList: WordObj[]
}

export const DisplayWordGrid: React.FC<IProps> = ({ wordList }) => {
  return (
    <>
      <div className="board">
        {wordList.map((word) => <WordCard key={word.word} word={word}/>)}
      </div>
    </>
  )
}
