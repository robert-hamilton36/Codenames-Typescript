import React, { useState } from 'react'

import { Message } from './Message'
import { useUserContext } from '../../contexts/UserContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useMessageActions } from '../../contexts/FirebaseContext'
import { GameInfo, MessageTeams } from '../../types/gameState'

export const MessageContainer: React.FC<Props> = ({ game }) => {
  const { user } = useUserContext()
  const { gameId } = useGameId()

  const { writeNewMessage } = useMessageActions()

  const [teamView, setTeamView] = useState<MessageTeams>('general')
  const [message, setMessage] = useState('')

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
    <div className="chatContainer">
      <h1>{teamView} chat</h1>
      <ol className ="messagesContainer">
        {game.messages[teamView].map((message, idx) => {
          return <Message key={idx} messageObj={message} teamView={teamView}/>
        })}
      </ol>
      {game.settings.gameplayMode !== 'tabletop' &&
        <div>
          {teamView !== 'general' && <button onClick={() => setTeamView('general')}>General</button>}
          {teamView === 'general' && <button onClick={() => setTeamView(user?.team)}>{user?.team}</button>}
        </div>
      }
      <form>
        <input type="text" name="message" value={message} onChange={(event) => setMessage(event.target.value)}/>
        <input type="submit" value="submit" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

interface Props {
  game: GameInfo
}
