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
      <li key={word} data-testid='liEdit'>
        <form onSubmit={handleSubmit} data-testid='form'>
          <input type="text" name="newWord" value={newWord} onChange={(e) => setNewWord(e.target.value)} data-testid='newWordInput'/>
          <input type="submit" value="Submit" data-testid='newWordSubmit'/>
        </form>
      </li>
    )
  }
  return (
    <li key={word} data-testid='liDisplay'>
      <p data-testid='word' className='getWord'>{word}</p>
      <button onClick={(() => setEditing(true))} data-testid='editButton'>
        Edit
      </button>
      <button onClick={() => actionNewWord(word)} data-testid='newWordButton'>
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
