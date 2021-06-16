import React from 'react'
import { WordCard } from './WordCard'

interface IProps {
  wordList: string[]
}

export const DisplayWordGrid: React.FC<IProps> = ({ wordList }) => {
  return (
    <>
      {wordList.map((word) => <WordCard key={word} word={word}/>)}
    </>
  )
}
