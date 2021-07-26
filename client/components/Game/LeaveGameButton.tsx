import React from 'react'
import { useHistory } from 'react-router-dom'

import { useJoinGameActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'

export const LeaveGameButton: React.FC = () => {
  const { user, gameId } = useUserContext()
  const { leaveGame } = useJoinGameActions()
  const history = useHistory()

  const handleClick = () => {
    return leaveGame(user.uid, gameId)
      .then(() => history.push('/'))
  }
  return (
    <button onClick={handleClick}>Leave Game</button>
  )
}
