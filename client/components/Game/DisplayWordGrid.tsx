import React from 'react'
import { WordObj } from '../../types/gameState'
import { WordCard } from './WordCard'

interface IProps {
  wordList: WordObj[]
}

const makeArrayFromWordListObject = (wordList) => {
  const newArray = []
  for (const x in wordList) {
    newArray.push(wordList[x])
  }

  return newArray
}

export const DisplayWordGrid: React.FC<IProps> = ({ wordList }) => {
  const wordListArray = makeArrayFromWordListObject(wordList)
  return (
    <>
      <div className="board">
        {wordListArray.map((word) => <WordCard key={word.word} word={word}/>)}
      </div>
    </>
  )
}
