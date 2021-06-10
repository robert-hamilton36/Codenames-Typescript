import React from 'react'
import { database } from '../firebase'

const App: React.FC = () => {
  const handleClick = () => {
    database.games.add({
      players: ['host']
    })
  }

  return (
    <>
      <h1>App has arrived</h1>
      <button onClick={handleClick}>Create game</button>
    </>
  )
}

export default App
