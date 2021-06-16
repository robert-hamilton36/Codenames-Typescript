import React from 'react'

interface IProps {
  word: string
}

export const WordCard: React.FC<IProps> = ({ word }) => {
  return (
    <div className="codeCard">
      <h1>{word}</h1>
    </div>
  )
}
