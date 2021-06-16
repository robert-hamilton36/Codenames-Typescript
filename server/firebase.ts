import firebase from 'firebase/app'
import 'firebase/firestore'

import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

const app: firebase.app.App = firebase.initializeApp(firebaseConfig)
const firestore: firebase.firestore.Firestore = app.firestore()

export const leaveGame: (uid: string, gameId: string) => Promise<firebase.firestore.Transaction | null > = (uid: string, gameId: string) => {
  const ref = firestore.collection('Games').doc(gameId)
  return firestore.runTransaction((transaction) => {
    return transaction.get(ref)
      .then((data) => {
        // if game has one player left and that player is leaving, delete the game
        if (data.data()?.players.length === 1) {
          ref.delete()
          return null
        }
        const array: Player[] = data.data()?.players.filter((player: Player) => player.uid === uid)
        return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(array[0]) })
      })
  })
}

interface Player {
  name: string
  uid: string
}