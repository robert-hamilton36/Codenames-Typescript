import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { MessageObj, MessageTeams } from '../types/gameState'

export const messageActions = (firestore: firestore): MessageReturn => {
  const writeNewMessage = (gameId: string, message: MessageObj, messageTeam: MessageTeams) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          const path = 'messages.' + messageTeam
          const time = firebase.firestore.Timestamp.now()
          const object = {
            ...message,
            time: time
          }
          return transaction.update(ref, { [path]: firebase.firestore.FieldValue.arrayUnion(object) })
        })
    })
  }

  const deleteMessage = (gameId: string, messageObj: MessageObj, team: MessageTeams) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          const path = 'messages.' + team
          return transaction.update(ref, { [path]: firebase.firestore.FieldValue.arrayRemove(messageObj) })
        })
    })
  }

  return {
    writeNewMessage,
    deleteMessage
  }
}

export interface MessageReturn {
  writeNewMessage: (gameId: string, message: MessageObj, messageTeam: MessageTeams) => Promise<firebase.firestore.Transaction>
  deleteMessage: (gameId: string, messageObj: MessageObj, team: MessageTeams) => Promise<firebase.firestore.Transaction>
}
