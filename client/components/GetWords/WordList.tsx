import React, { useEffect, useState } from 'react'
import { getWords } from '../../contexts/FirebaseContext'
import { shuffleArray } from '../../utility/shuffleArray'
import { Word } from './Word'

export const WordList: React.FC<Props> = ({ setFinalWordList, nextPage, previousPage }) => {
  const [wordList, setWordList] = useState<string[]>([])
  const allWords = getWords()

  const getNewWords = () => {
    const newArray = shuffleArray(allWords)
    setWordList(newArray.slice(0, 25))
  }

  const getNewSingleWord = () => {
    let word: string
    if (!wordList.includes(word)) {
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
    nextPage()
  }

  return (
    <div>
      <ul>
        {wordList.map((word, idx) => <Word key={word + idx} word={word} setItem={setItem} getNewWord = {getNewSingleWord}/>)}
      </ul>
      <button onClick={previousPage}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={getNewWords}>Get New Words</button>
    </div>
  )
}

interface Props {
  setFinalWordList: React.Dispatch<React.SetStateAction<string[]>>
  nextPage: () => void
  previousPage: () => void
}
