import firebase from 'firebase/app'
import 'firebase/firestore'

import { TransactionRevealWordHandleGuess, TransactionEndTurn, TransactionAddLog } from './firebaseTransactions'

import { firestore } from '../contexts/FirebaseContext'

import { GameInfo } from '../types/gameInfo'
import { LogEntry } from '../types/gameLog'
import { User } from '../types/user'

import { getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

export const guessActions = (firestore: firestore): GuessActionsReturn => {
  const endTurn = (gameId: string, user: User, log: LogEntry) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const gameData = data.data() as GameInfo
          const nextTeam = getNextTurnsTeam(gameData)
          TransactionAddLog(ref, transaction, log)
          return TransactionEndTurn(ref, transaction, nextTeam)
        })
    })
  }

  const makeGuess = (gameId: string, wordIndex: number, user: User, log: LogEntry) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const gameData = data.data() as GameInfo
          TransactionAddLog(ref, transaction, log)
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
  endTurn: (gameId: string, user: User, log: LogEntry) => Promise<firebase.firestore.Transaction>
  makeGuess: (gameId: string, wordIndex: number, user: User, log: LogEntry) => Promise<firebase.firestore.Transaction>
}
