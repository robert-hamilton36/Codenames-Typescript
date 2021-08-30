import React, { useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { MessageContainer } from './MessageContainer'
import { WriteNewMessage } from './WriteNewMessage'
import { GameInfo, MessageTeams } from '../../types/gameState'

export const ChatContainer: React.FC<Props> = ({ game }) => {
  const [teamView, setTeamView] = useState<MessageTeams>('general')
  const { user } = useUserContext()

  return (
    <div className="chatContainer">
      <h1 data-testid='header'>{teamView} chat</h1>
      <MessageContainer messages={game.messages} teamView={teamView}/>
      {teamView !== 'general'
        ? <button onClick={() => setTeamView('general')} data-testid='generalButton'>General</button>
        : <button onClick={() => setTeamView(user?.team)} data-testid='userTeamButton'>{user?.team}</button>
      }
      <WriteNewMessage teamView={teamView} />
    </div>
  )
}

interface Props {
  game: GameInfo
}
