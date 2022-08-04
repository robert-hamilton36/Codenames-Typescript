import firebase from 'firebase/app'
import 'firebase/firestore'

import { GameInfo } from '../client/types/gameInfo'
import { User } from '../client/types/user'

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

const __makeNewHostTransaction = (transaction: Transaction, ref: Ref, playerToBeNewHost: User) => {
  transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(playerToBeNewHost) })
  const newHost = {
    host: true,
    ...playerToBeNewHost
  }
  return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(newHost) })
}

export const playerDisconnectsFromGame = (uid: string, gameId: string): Promise<firebase.firestore.Transaction | null> => {
  const ref = firestore.collection('Games').doc(gameId)
  return firestore.runTransaction((transaction) => {
    return transaction.get(ref)
      .then((data) => {
        const gameData = data.data() as GameInfo
        const leavingPlayer = gameData.players.filter((player) => player.uid === uid)[0]
        const otherPlayers = gameData.players.filter((player) => player.uid !== uid)
        // if game has one player left and that player is leaving, delete the game
        if (gameData?.players.length === 1) {
          ref.delete()
          return null
        }

        if (leavingPlayer.host) {
          __makeNewHostTransaction(transaction, ref, otherPlayers[0])
        }
        return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(leavingPlayer) })
      })
  })
}

type Ref = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
type Transaction = firebase.firestore.Transaction
