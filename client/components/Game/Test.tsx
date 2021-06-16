import React from 'react'
import { DisplayWordGrid } from './DisplayWordGrid'

export const Test: React.FC = () => {
  const wordList = [
    'africa',
    'agent',
    'air',
    'alien',
    'amazon',
    'angel',
    'antarctica',
    'apple',
    'arm',
    'back',
    'band',
    'bank',
    'bark',
    'beach',
    'belt',
    'berlin',
    'berry',
    'board',
    'bond',
    'boom',
    'bow',
    'box',
    'bug',
    'canada',
    'capital'
  ]
  return (
    <div className="board">
      <DisplayWordGrid wordList={wordList}/>
    </div>
  )
}
