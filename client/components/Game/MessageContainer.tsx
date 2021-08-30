import React from 'react'

import { Message } from './Message'
import { Messages, MessageTeams } from '../../types/gameState'

export const MessageContainer: React.FC<Props> = ({ messages, teamView }) => {
  return (
    <ol className ="messagesContainer" data-testid="messagesContainer">
      {messages[teamView].map((message, idx) => {
        return <Message key={idx} messageObj={message} teamView={teamView}/>
      })}
    </ol>
  )
}

interface Props {
  messages: Messages
  teamView: MessageTeams
}
