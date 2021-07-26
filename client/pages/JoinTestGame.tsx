import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { AskName } from '../components/AskName'
import { useJoinGameActions } from '../contexts/FirebaseContext'
import { useUserActions, useUserContext } from '../contexts/UserContext'
import { usePageNumber } from '../hooks/usePageNumber'

export const JoinTestGame: React.FC = () => {
  const { pageNumber, nextPage, previousPage } = usePageNumber(2)
  const { joinGame } = useJoinGameActions()
  const { user, setGameId } = useUserContext()
  const { makeHost } = useUserActions()
  const history = useHistory()

  const handleJoin = () => {
    return joinGame(user, 'Test')
      .then(() => setGameId('Test'))
      .then(() => history.push('/game'))
  }

  useEffect(() => {
    makeHost(true)
  }, [pageNumber])

  if (pageNumber === 0) {
    return (
      <AskName nextPage={nextPage} previousPage={previousPage} />
    )
  } else {
    return (
      <button onClick={handleJoin}>Join Game</button>
    )
  }
}
