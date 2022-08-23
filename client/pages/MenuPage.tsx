import React from 'react'
import { useHistory } from 'react-router-dom'

export const MenuPage: React.FC = () => {
  const history = useHistory()

  const handleJoin = () => {
    history.push('/lobby')
  }

  const handleHost = () => {
    history.push('/host')
  }

  const handleTest = () => {
    history.push('/test')
  }

  return (
    <div className='menu'>
      <h1>SpyWords</h1>
      <div className='buttons'>
        <button onClick={handleJoin}>Join Game</button>
        <button onClick={handleHost}>Host Game</button>
        <button onClick={handleTest}>Test Game</button>
      </div>
    </div>
  )
}
