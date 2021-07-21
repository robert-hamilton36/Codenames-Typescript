import React from 'react'
import 'firebase/firestore'
import firebase from 'firebase/app'

import { MessageObj, PlayerObject } from '../../types/gameState'
import { useUserContext } from '../../contexts/UserContext'
import { useFirebase } from '../../contexts/FirebaseContext'

export const Message: React.FC<Props> = ({ messageObj, teamView }) => {
  const { user } = useUserContext()
  const owner = messageObj.user.uid === user.uid || user.host
  const { firestore } = useFirebase()

  const deleteMessages = (gameId: string, messageObj: MessageObj, team: TeamMessages): Promise<firebase.firestore.Transaction> => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          const path = 'messages.' + team
          return transaction.update(ref, { [path]: firebase.firestore.FieldValue.arrayRemove(messageObj) })
        })
    })
  }

  const handleDelete = () => {
    deleteMessages('3CGSsXSrXjiFisnASZe9', messageObj, teamView)
    return null
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
    user: PlayerObject
    message: string
  }
  teamView: TeamMessages
}

type TeamMessages = 'red' | 'blue' | 'general'
