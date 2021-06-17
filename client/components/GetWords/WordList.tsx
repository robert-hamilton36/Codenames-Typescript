import React, { useEffect, useState } from 'react'
import { getWords } from '../../contexts/FirebaseContext'
import { shuffleArray } from '../../utility/shuffleArray'
import { Word } from './Word'

export const WordList: React.FC<Props> = ({ setFinalWordList }) => {
  const [wordList, setWordList] = useState([])
  const allWords = getWords()

  useEffect(() => {
    const newArray = shuffleArray(allWords)
    setWordList(newArray.slice(0, 25))
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
      <ul>
        {wordList.map((word, idx) => <Word key={word + idx} word={word} setItem={setItem}/>)}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

interface Props {
  setFinalWordList: React.Dispatch<React.SetStateAction<string[]>>
}
