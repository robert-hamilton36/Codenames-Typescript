import firebase from 'firebase/app'
import 'firebase/firestore'
import React, { useState } from 'react'

import { Message } from './Message'
import { useUserContext } from '../../contexts/UserContext'
import { GameInfo } from '../../types/gameState'
// import { writeNewMessage } from '../../firebase/messageActions'
import { useFirebase } from '../../contexts/FirebaseContext'

export const MessageContainer: React.FC<Props> = ({ game }) => {
  const { user } = useUserContext()
  const { firestore } = useFirebase()

  const [teamView, setTeamView] = useState<'red' | 'blue' | 'general'>('general')
  const [message, setMessage] = useState('')

  const writeNewMessage: WriteNewMessage = (gameId, message) => {
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
    writeNewMessage('FnygfZBAKj0jhZ04XBUC', message)
    setMessage('')
    return null
  }

  console.log(game)

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
          {teamView === 'general' && <button onClick={() => setTeamView(user.team)}>{user.team}</button>}
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

type WriteNewMessage = (gameId: string, message: string) => Promise<firebase.firestore.Transaction>
