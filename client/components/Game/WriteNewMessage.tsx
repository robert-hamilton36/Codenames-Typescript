import React, { useState } from 'react'

import { useMessageActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useUserContext } from '../../contexts/UserContext'

import { MessageTeams } from '../../types/messages'

export const WriteNewMessage: React.FC<Props> = ({ teamView }) => {
  const [message, setMessage] = useState('')

  const { user } = useUserContext()
  const { gameId } = useGameId()
  const { writeNewMessage } = useMessageActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    const messageObj = {
      message,
      user
    }
    return writeNewMessage(gameId, messageObj, teamView)
      .then(() => setMessage(''))
  }

  return (
    <form data-testid='newMessageForm'>
      <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)} data-testid='newMessageInput'/>
      <input type="submit" value="submit" onClick={handleSubmit} data-testid='submitButton'/>
    </form>
  )
}

interface Props{
  teamView: MessageTeams
}
