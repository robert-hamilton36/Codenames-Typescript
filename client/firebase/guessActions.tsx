import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { GameInfo } from '../types/gameState'
import { TransactionRevealWordHandleGuess, TransactionEndTurn } from './firebaseTransactions'
import { getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

export const guessActions = (firestore: firestore): GuessActionsReturn => {
  const endTurn = (gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const nextTeam = getNextTurnsTeam(data.data() as GameInfo)
          return TransactionEndTurn(ref, transaction, nextTeam)
        })
    })
  }

  const makeGuess = (gameId: string, wordIndex: number) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const gameData = data.data() as GameInfo
          return TransactionRevealWordHandleGuess(ref, transaction, wordIndex, gameData)
        })
    })
  }

  return {
    endTurn,
    makeGuess
  }
}

export interface GuessActionsReturn {
  endTurn: (gameId: string) => Promise<firebase.firestore.Transaction>
  makeGuess: (gameId: string, wordIndex: number) => Promise<firebase.firestore.Transaction>
}
