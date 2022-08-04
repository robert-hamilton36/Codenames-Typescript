import React, { useEffect, useState } from 'react'

import { Word } from './Word'

import { getWords } from '../../contexts/FirebaseContext'

import { shuffleArray } from '../../utility/shuffleArray'

export const WordList: React.FC<Props> = ({ setFinalWordList }) => {
  const [wordList, setWordList] = useState<string[]>([])
  const allWords = getWords()

  const getNewWords = () => {
    const newArray = shuffleArray(allWords)
    setWordList(newArray.slice(0, 25))
  }

  const getNewSingleWord = () => {
    let word = shuffleArray(allWords).slice(0, 1)[0]
    while (wordList.includes(word)) {
      word = shuffleArray(allWords).slice(0, 1)[0]
    }
    return word
  }

  useEffect(() => {
    getNewWords()
  }, [allWords])

  const setItem = (newWord: string, oldWord: string) => {
    const words = wordList.map((word) => word === oldWord ? newWord : word)
    setWordList(words)
  }

  const handleSubmit = () => {
    setFinalWordList(wordList)
  }

  return (
    <div>
      <ul data-testid='wordList'>
        {wordList.map((word, idx) => <Word key={word + idx} word={word} setItem={setItem} getNewWord = {getNewSingleWord}/>)}
      </ul>
      <button onClick={handleSubmit} data-testid='submitButton'>Submit</button>
      <button onClick={getNewWords} data-testid='getNewWordsButton'>Get New Words</button>
    </div>
  )
}

interface Props {
  setFinalWordList: React.Dispatch<React.SetStateAction<string[]>>
}
