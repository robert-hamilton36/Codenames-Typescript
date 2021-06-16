import React from 'react'
import { useHistory } from 'react-router-dom'

export const MenuPage: React.FC = () => {
  const history = useHistory()

  const handleJoin = () => {
    history.push('/lobby')
  }

  const handleHost = () => {
    history.push('/test')
  }

  return (
    <div>
      <h1>Code Names</h1>
      <button onClick={handleJoin}>Join Game</button>
      <button onClick={handleHost}>Host Game</button>
    </div>
  )
}
