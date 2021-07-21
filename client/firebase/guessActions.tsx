import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { GameInfo } from '../types/gameState'
import { calculatePointsFromDataAndCurrentRevealedWord, checkForWin, getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

export const guessActions = (firestore: firestore): GuessActionsReturn => {
  const __guessRightContinueTurn = (ref, transaction) => {
    console.log('__guessRightContinueTurn')
    return transaction.update(ref, { 'gameState.guessesLeft': firebase.firestore.FieldValue.increment(-1) })
  }

  const __endTurn = (ref, transaction, nextTeam) => {
    console.log('__endTurn')
    transaction.update(ref, { 'gameState.hint': firebase.firestore.FieldValue.delete() })
    transaction.update(ref, { 'gameState.guessesLeft': 0 })
    return transaction.update(ref, { 'gameState.teamTurn': nextTeam })
  }

  const calculateGuessResults = (gameData: GameInfo, votedWordIndex: number, ref, transaction) => {
    console.log('calculateGuessResults')
    const nextTeam = getNextTurnsTeam(gameData)
    const votedWord = gameData.gameState.words[votedWordIndex]
    if (votedWord.key === 'assassin') {
      return transaction.update(ref, { 'gameState.win': nextTeam })
    }

    if (votedWord.key !== gameData.gameState.teamTurn || gameData.gameState.guessesLeft === 1) {
      // end turn as wrong card selected, or this was the last guessesLeft
      __endTurn(ref, transaction, nextTeam)
    } else {
      __guessRightContinueTurn(ref, transaction)
    }
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
          calculateGuessResults(data.data() as GameInfo, wordIndex, ref, transaction)
          return null
        })
    })
  }

  return {
    endTurn,
    changeWordToRevealed
  }
}

export interface GuessActionsReturn {
  endTurn: (gameId: string) => Promise<firebase.firestore.Transaction>
  changeWordToRevealed: (gameId: string, wordIndex: number) => Promise<firebase.firestore.Transaction>
}

// old functions from first revision
// guessRightContinueTurn: (gameId: string) => Promise<firebase.firestore.Transaction>
// const guessRightContinueTurn = (gameId: string) => {
//   const ref = firestore.collection('Games').doc(gameId)
//   return firestore.runTransaction((transaction) => {
//     return transaction.get(ref)
//       .then(() => {
//         return transaction.update(ref, { 'gameState.guessesLeft': firebase.firestore.FieldValue.increment(-1) })
//       })
//   })
// }
