import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { GameInfo, Team } from '../types/gameState'
import { calculatePointsFromDataAndCurrentRevealedWord, checkForWin, getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

export const guessActions = (firestore: firestore): GuessActionsReturn => {
  const guessRightContinueTurn = (gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          return transaction.update(ref, { 'gameState.guessesLeft': firebase.firestore.FieldValue.increment(-1) })
        })
    })
  }

  const endTurn = (gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const nextTeam = getNextTurnsTeam(data.data() as GameInfo)
          transaction.update(ref, { 'gameState.hint': firebase.firestore.FieldValue.delete() })
          transaction.update(ref, { 'gameState.guessesLeft': 0 })
          return transaction.update(ref, { 'gameState.teamTurn': nextTeam })
        })
    })
  }

  const changeWordToRevealed = (gameId: string, wordIndex: number) => {
    const ref = firestore.collection('Games').doc(gameId)
    const location = 'gameState.words.' + wordIndex + '.revealed'
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const teamPoints = calculatePointsFromDataAndCurrentRevealedWord(data.data() as GameInfo, wordIndex)

          transaction.update(ref, { [location]: true })
          transaction.update(ref, { 'gameState.teamPoints': teamPoints })
          if (checkForWin(data.data() as GameInfo)) {
            transaction.update(ref, { 'gameState.gameStart': false })
            return transaction.update(ref, { 'gameState.win': true })
          }
          return null
        })
    })
  }

  return {
    guessRightContinueTurn,
    endTurn,
    changeWordToRevealed
  }
}

export interface GuessActionsReturn {
  guessRightContinueTurn: (gameId: string) => Promise<firebase.firestore.Transaction>
  endTurn: (gameId: string, nextTeam: Team) => Promise<firebase.firestore.Transaction>
  changeWordToRevealed: (gameId: string, wordIndex: number) => Promise<firebase.firestore.Transaction>
}
