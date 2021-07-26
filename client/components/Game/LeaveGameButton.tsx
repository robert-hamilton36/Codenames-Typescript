import React from 'react'
import { useHistory } from 'react-router-dom'

import { useJoinGameActions, useVoteActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'

export const LeaveGameButton: React.FC = () => {
  const { user, gameId } = useUserContext()
  const { leaveGame } = useJoinGameActions()
  const { removePlayersVote } = useVoteActions()
  const history = useHistory()

  const handleClick = () => {
    return removePlayersVote(gameId, user.uid)
      .then(() => leaveGame(user.uid, gameId))
      .then(() => history.push('/'))
  }
  return (
    <button onClick={handleClick}>Leave Game</button>
  )
}
