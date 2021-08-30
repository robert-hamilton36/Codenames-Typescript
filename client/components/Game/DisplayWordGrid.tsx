import React from 'react'

import { WordList } from '../../types/gameState'
import { makeArrayFromObjectValues } from '../../utility/makeArrayFromObjectValues'
import { WordCard } from './WordCard'

export const DisplayWordGrid: React.FC<Props> = ({ wordList }) => {
  const wordListArray = makeArrayFromObjectValues(wordList)
  return (
    <div className="board" data-testid='board'>
      {wordListArray.map((word) => <WordCard key={word.word} word={word}/>)}
    </div>

  )
}

interface Props {
  wordList: WordList
}
