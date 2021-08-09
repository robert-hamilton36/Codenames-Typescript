import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AskName } from '../components/AskName'
import { GameList } from '../components/GameList'
import { useFirestoreCollectionSubscriber, useJoinGameActions } from '../contexts/FirebaseContext'
import { useGameId } from '../contexts/GameIdContext'
import { useUserContext } from '../contexts/UserContext'
import { usePageNumber } from '../hooks/usePageNumber'

export const Lobby: React.FC = () => {
  const games = useFirestoreCollectionSubscriber('Games')
  const [gameToJoin, setGameToJoin] = useState<string>(null)
  const { pageNumber, nextPage, previousPage } = usePageNumber(3)
  const { joinGame } = useJoinGameActions()
  const { setGameId } = useGameId()
  const { user } = useUserContext()
  const history = useHistory()

  const handleJoinGame = () => {
    nextPage()
    return joinGame(user, gameToJoin)
      .then(() => setGameId(gameToJoin))
      .then(() => history.push('/game'))
  }

  const handleHome = () => {
    history.push('/')
  }

  useEffect(() => {
    console.log(gameToJoin)
    if (user.name !== '') {
      nextPage()
    }
  }, [user, gameToJoin])

  if (!games) {
    return (<h1>Loading ...</h1>)
  }

  if (pageNumber === 0) {
    return (
      <>
        <AskName />
        <button onClick={handleHome}>Home</button>
      </>
    )
  }

  if (pageNumber === 1) {
    return (
      <>
        <GameList games={games} setGameToJoin={setGameToJoin} />
        <button onClick={previousPage}>Back</button>
      </>
    )
  }

  if (pageNumber === 2) {
    handleJoinGame()
  }

  if (pageNumber === 3) {
    return (<h1>Loading ...</h1>)
  }
}
