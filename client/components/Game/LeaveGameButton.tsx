import React from 'react'
import { useHistory } from 'react-router-dom'

import { useJoinGameActions, useVoteActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useUserContext } from '../../contexts/UserContext'
import { useToaster } from '../../contexts/ToasterContext'

export const LeaveGameButton: React.FC = () => {
  const { user } = useUserContext()
  const { setToaster } = useToaster()
  const { gameId } = useGameId()
  const { leaveGame } = useJoinGameActions()
  const { removePlayersVote } = useVoteActions()
  const history = useHistory()

  const handleClick = () => {
    return removePlayersVote(gameId, user.uid)
      .then(() => leaveGame(user.uid, gameId))
      .then(() => setToaster(null))
      .then(() => history.push('/'))
  }
  return (
    <button onClick={handleClick} data-testid='leaveGameButton'>Leave Game</button>
  )
}
