import React from 'react'
import { useFirestoreCollectionSubscriber } from '../contexts/FirebaseContext'

export const Lobby: React.FC = () => {
  const games = useFirestoreCollectionSubscriber('Games')
  console.log(games)
  if (!games) {
    return (<h1>Loading ...</h1>)
  }

  return (
    <ul>
      {games.map((game, id) => <li key={game + id}>{game}</li>)}
    </ul>
  )
}
