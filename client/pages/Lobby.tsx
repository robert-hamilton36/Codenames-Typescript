import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AskName } from '../components/AskName'
import { GameList } from '../components/GameList'
import { useFirestoreCollectionSubscriber, useJoinGameActions } from '../contexts/FirebaseContext'
import { useUserContext } from '../contexts/UserContext'
import { usePageNumber } from '../hooks/usePageNumber'

export const Lobby: React.FC = () => {
  const games = useFirestoreCollectionSubscriber('Games')
  const [gameToJoin, setGameToJoin] = useState<string>(null)
  const { pageNumber, nextPage, previousPage } = usePageNumber(3)
  const { joinGame } = useJoinGameActions()
  const { user, setGameId } = useUserContext()
  const history = useHistory()

  const handleJoinGame = () => {
    nextPage()
    return joinGame(user, gameToJoin)
      .then(() => setGameId(gameToJoin))
      .then(() => history.push('/game'))
  }
  if (!games) {
    return (<h1>Loading ...</h1>)
  }

  if (pageNumber === 0) {
    return <GameList games={games} setGameToJoin={setGameToJoin} nextPage={nextPage} />
  }

  if (pageNumber === 1) {
    return <AskName nextPage={nextPage} previousPage={previousPage}/>
  }

  if (pageNumber === 2) {
    handleJoinGame()
  }

  if (pageNumber === 3) {
    return (<h1>Loading ...</h1>)
  }
}
