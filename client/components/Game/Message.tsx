import React from 'react'

import { User, MessageTeams } from '../../types/gameState'
import { useUserContext } from '../../contexts/UserContext'
import { useMessageActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'

export const Message: React.FC<Props> = ({ messageObj, teamView }) => {
  const { user } = useUserContext()
  const { gameId } = useGameId()

  const owner = messageObj.user.uid === user.uid || user.host
  const { deleteMessage } = useMessageActions()

  const handleDelete = () => {
    return deleteMessage(gameId, messageObj, teamView)
  }

  return (
    <li className="message">
      <div>
        <p>{messageObj.user.name}:{messageObj.message}</p>
        {owner &&
        <button onClick={handleDelete}>
            Delete
        </button>}
      </div>
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
