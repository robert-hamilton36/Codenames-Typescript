import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { AskName } from '../components/AskName'

import { useJoinGameActions } from '../contexts/FirebaseContext'
import { useGameId } from '../contexts/GameIdContext'
import { useUserContext } from '../contexts/UserContext'

import { usePageNumber } from '../hooks/usePageNumber'

export const JoinTestGame: React.FC = () => {
  const { pageNumber, nextPage, previousPage } = usePageNumber(1)
  const { joinGame } = useJoinGameActions()
  const { user } = useUserContext()
  const { setGameId } = useGameId()

  const history = useHistory()

  const handleJoin = () => {
    const newUser = {
      ...user,
      host: true
    }
    return joinGame(newUser, 'Test')
      .then(() => setGameId('Test'))
      .then(() => history.push('/game'))
  }

  const handleHome = () => {
    history.push('/')
  }

  useEffect(() => {
    if (user.name !== '') {
      nextPage()
    }
  }, [user])

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
        <button onClick={handleJoin}>Join Game</button>
        <button onClick={previousPage}>Back</button>
      </>
    )
  }
}
