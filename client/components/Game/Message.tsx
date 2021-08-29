import React from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { useMessageActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { User, MessageTeams } from '../../types/gameState'

export const Message: React.FC<Props> = ({ messageObj, teamView }) => {
  const { user } = useUserContext()
  const { gameId } = useGameId()
  const { deleteMessage } = useMessageActions()

  const userCanDelete = messageObj.user.uid === user.uid || user.host

  const handleDelete = () => {
    return deleteMessage(gameId, messageObj, teamView)
  }

  return (
    <li className="message" data-testid='liContainer'>
      <p data-testid='message'>{messageObj.user.name}: {messageObj.message}</p>
      {userCanDelete &&
      <button onClick={handleDelete} data-testid='deleteButton'>
          Delete
      </button>}
    </li>
  )
}

interface Props {
  messageObj: {
    user: User
    message: string
  }
  teamView: MessageTeams
}
