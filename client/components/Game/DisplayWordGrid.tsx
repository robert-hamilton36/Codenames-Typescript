import React from 'react'

import { WordList } from '../../types/gameState'
import { makeArrayFromObject } from '../../utility/makeArrayFromObject'
import { WordCard } from './WordCard'

export const DisplayWordGrid: React.FC<Props> = ({ wordList }) => {
  const wordListArray = makeArrayFromObject(wordList)
  return (
    <div className="board">
      {wordListArray.map((word) => <WordCard key={word.word} word={word}/>)}
    </div>

  )
}

interface Props {
  wordList: WordList
}
