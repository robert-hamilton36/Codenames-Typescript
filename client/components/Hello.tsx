import React from 'react'
// import { createGame } from '../firebase'

import { useUserContext } from '../contexts/UserContext'
import { joinGame } from '../firebase/firebase'

export const Hello: React.FC = () => {
  const { user, setUser, gameId, setGameId } = useUserContext()
  // const handleClick = async () => {
  //   createGame({ players: ['host'] })
  //     .then(data => setGameId(data.id))
  //     .catch(error => console.log(error))

  // }
  const handleClick = async () => {
    joinGame(user, 'uaR5XYbPZv5L54Zyibjq')
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  const handleLogin = () => {
    setUser('Anakin')
  }
  return (
    <>
      <h1>App has arrived</h1>

      {user && <h1>Hello { user.name } </h1>}
      {user && <h1>{user.uid}</h1>}
      {gameId && <h1>{gameId}</h1>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleClick}>Create game</button>
    </>
  )
}
