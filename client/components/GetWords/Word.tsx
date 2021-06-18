import React, { useState } from 'react'

export const Word: React.FC<Props> = ({ word, setItem, getNewWord }) => {
  const [editing, setEditing] = useState(false)
  const [newWord, setNewWord] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditing(false)
    setItem(newWord, word)
  }

  const actionNewWord = (word) => {
    const newWord = getNewWord()
    setItem(newWord, word)
  }

  if (editing) {
    return (
      <li key={word}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="newWord" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
          <input type="submit" value="Enter"/>
        </form>
      </li>
    )
  }
  return (
    <li key={word}>
      {word}
      <button onClick={(() => setEditing(true))}>
        Change
      </button>
      <button onClick={() => actionNewWord(word)}>
        New Word
      </button>
    </li>
  )
}

interface Props {
  word: string
  setItem: (newWord: string, oldWord: string) => void
  getNewWord: () => string
}
