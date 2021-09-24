import React from 'react'
import { useHistory } from 'react-router-dom'

import { useJoinGameActions, useVoteActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useSocketActions } from '../../contexts/SocketContext'
import { useToaster } from '../../contexts/ToasterContext'
import { useUserContext } from '../../contexts/UserContext'

export const LeaveGameButton: React.FC = () => {
  const { user } = useUserContext()
  const { setToaster } = useToaster()
  const { gameId } = useGameId()
  const { leaveGame } = useJoinGameActions()
  const { removePlayersVote } = useVoteActions()
  const { playerLeavesSocket } = useSocketActions()
  const history = useHistory()

  const handleClick = () => {
    return removePlayersVote(gameId, user.uid)
      .then(() => playerLeavesSocket())
      .then(() => leaveGame(user.uid, gameId))
      .then(() => setToaster(null))
      .then(() => history.push('/'))
  }
  return (
    <button onClick={handleClick} data-testid='leaveGameButton'>Leave Game</button>
  )
}
