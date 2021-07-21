import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { Message } from './Message'
import { useUserContext } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
import { useFirebase } from '../../contexts/FirebaseContext'

export const MessageContainer: React.FC<Props> = ({ game }) => {
  const { user } = useUserContext()
  const { firestore } = useFirebase()

  const [teamView, setTeamView] = useState<'red' | 'blue' | 'general'>('general')
  const [message, setMessage] = useState('')

  const writeNewMessage = (gameId, message): Promise<firebase.firestore.Transaction> => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          const path = 'messages.' + teamView
          const time = firebase.firestore.Timestamp.now()
          const object = {
            message: message,
            time: time,
            user
          }
          return transaction.update(ref, { [path]: firebase.firestore.FieldValue.arrayUnion(object) })
        })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    writeNewMessage('3CGSsXSrXjiFisnASZe9', message)
    setMessage('')
    return null
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
