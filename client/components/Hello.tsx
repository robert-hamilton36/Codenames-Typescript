import React from 'react'
import { useFirebase, useFirestoreSubscriber } from '../contexts/FirebaseContext'

import { useUserContext } from '../contexts/UserContext'

export const Hello: React.FC = () => {
  const { user, setUser, gameId } = useUserContext()
  const { actions } = useFirebase()

  const data = useFirestoreSubscriber(gameId)

  const handleClick = () => {
    actions.createGame({ players: [user], settings: { gameplayMode: 'individual' } })
  }

  const handleJoin = () => {
    actions.joinGame({ name: 'Obi Wan', uid: '34342-fad-231' }, gameId)
  }

  const handleKick = () => {
    actions.kickPlayer('34342-fad-231', gameId)
  }

  const handleLeave = () => {
    actions.leaveGame(user.uid, gameId)
  }

  const handleDelete = () => {
    actions.deleteGame(gameId)
  }

  const handleLogin = () => {
    setUser('Anakin')
  }

  const handleLogOut = () => {
    setUser('')
  }
  return (
    <>
      <h1>App has arrived</h1>

      {user && <h1>Hello { user.name } </h1>}
      {user && <h1>{user.uid}</h1>}
      {gameId && <h1>{gameId}</h1>}
      {data && data.players.map((player) => <h1 key={player.uid}>{player.name}</h1>)}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogOut}>LogOut</button>
      <button onClick={handleClick}>Create game</button>
      <button onClick={handleJoin}>Join</button>
      <button onClick={handleKick}>Kick</button>
      <button onClick={handleLeave}>Leave</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}
