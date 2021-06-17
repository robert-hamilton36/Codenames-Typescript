import React, { useState } from 'react'

export const Word: React.FC<Props> = ({ word, setItem }) => {
  const [editing, setEditing] = useState(false)
  const [newWord, setNewWord] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditing(true)
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
    </li>
  )
}

interface Props {
  word: string
  setItem: (newWord: string, oldWord: string) => void
}
