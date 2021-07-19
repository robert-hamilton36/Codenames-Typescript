import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { GameState, Hint, Team, TeamPoints } from '../types/gameState'

export const gameplayActions = (firestore: firestore): GameplayActionReturn => {
  const startGame = (gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return ref.update({ 'gameState.gameStart': true })
  }

  const restartNewGame = (gameId: string, gameState: GameState, scoresForWin: TeamPoints) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          transaction.update(ref, { gameState: gameState })
          return transaction.update(ref, { 'settings.scoreForWin': scoresForWin })
        })
    })
  }

  const setHint = (gameId: string, hint: Hint) => {
    const ref = firestore.collection('Games').doc(gameId)
    const numOfGuesses = hint.numberOfWords + 1
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          transaction.update(ref, { 'gameState.hint': hint })
          return transaction.update(ref, { 'gameState.guessesLeft': numOfGuesses })
        })
    })
  }

  const changeTeamsTurn = (gameId: string, team: Team) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(() => {
          transaction.update(ref, { 'gameState.hint': firebase.firestore.FieldValue.delete() })
          return transaction.update(ref, { 'gameState.teamTurn': team })
        })
    })
  }

  const teamWinGame = (gameId: string, team: Team) => {
    const ref = firestore.collection('Games').doc(gameId)
    return ref.update({ 'gameState.win': team })
  }

  return {
    startGame,
    restartNewGame,
    setHint,
    changeTeamsTurn,
    teamWinGame
  }
}

interface GameplayActionReturn {
  startGame: (gameId: string) => Promise<void>
  restartNewGame: (gameId: string, gameState: GameState, scoresForWin: TeamPoints) => Promise<firebase.firestore.Transaction>
  setHint: (gameId: string, hint: Hint) => Promise<firebase.firestore.Transaction>
  changeTeamsTurn: (gameId: string, team: Team) => Promise<firebase.firestore.Transaction>
  teamWinGame: (gameId: string, team: Team) => Promise<void>
}
