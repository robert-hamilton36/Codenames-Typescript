import React from 'react'
import 'firebase/firestore'
import firebase from 'firebase/app'

import { MessageObj, PlayerObject } from '../../types/gameState'
import { useUserContext } from '../../contexts/UserContext'
import { useFirebase } from '../../contexts/FirebaseContext'

export const Message:React.FC<Props> = ({ messageObj, teamView }) => {
  const { user } = useUserContext()
  const owner = messageObj.user.uid === user.uid || user.host
  const { firestore } = useFirebase()

  const deleteMessages: DeleteMessages = (gameId, messageObj, team) => {
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
    deleteMessages('FnygfZBAKj0jhZ04XBUC', messageObj, teamView)
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
  teamView: 'red' | 'blue' | 'general'
}

type DeleteMessages = (gameId: string, messageObj: MessageObj, team: 'red' | 'blue' | 'general') => Promise<firebase.firestore.Transaction>