import firebase from 'firebase/app'
import 'firebase/firestore'

import { calculatePointsFromDataAndCurrentRevealedWord, checkForWin } from './firebaseActionHelperFunctions'

import { GameInfo } from '../types/gameInfo'
import { Team } from '../types/gameState'
import { LogEntry } from '../types/gameLog'

import { getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

const __TransactionDecreaseGuessesLeft = (ref: Ref, transaction: Transaction): Transaction => {
  return transaction.update(ref, { 'gameState.guessesLeft': firebase.firestore.FieldValue.increment(-1) })
}

const __TransactionHandleWin = (ref: Ref, transaction: Transaction): Transaction => {
  transaction.update(ref, { 'gameState.gameStart': false })
  return transaction.update(ref, { 'gameState.win': true })
}

const __TransactionChangeWordToRevealed = (ref: Ref, transaction: Transaction, wordIndex: number, gamedata: GameInfo): Transaction => {
  const location = 'gameState.words.' + wordIndex + '.revealed'
  const teamPoints = calculatePointsFromDataAndCurrentRevealedWord(gamedata, wordIndex)
  transaction.update(ref, { [location]: true })
  transaction.update(ref, { 'gameState.votes': [] })
  return transaction.update(ref, { 'gameState.teamPoints': teamPoints })
}

export const TransactionEndTurn = (ref: Ref, transaction: Transaction, nextTeam: Team): Transaction => {
  transaction.update(ref, { 'gameState.hint': firebase.firestore.FieldValue.delete() })
  transaction.update(ref, { 'gameState.guessesLeft': 0 })
  transaction.update(ref, { 'gameState.votes': [] })
  return transaction.update(ref, { 'gameState.teamTurn': nextTeam })
}

const __CalculateGuessResults = (ref: Ref, transaction: Transaction, gameData: GameInfo, votedWordIndex: number): Transaction => {
  const nextTeam = getNextTurnsTeam(gameData)
  const votedWord = gameData.gameState.words[votedWordIndex]
  if (votedWord.key === 'assassin') {
    return transaction.update(ref, { 'gameState.win': nextTeam })
  }

  if (votedWord.key !== gameData.gameState.teamTurn || gameData.gameState.guessesLeft === 1) {
    // end turn as wrong card selected, or this was the last guessesLeft
    return TransactionEndTurn(ref, transaction, nextTeam)
  } else {
    return __TransactionDecreaseGuessesLeft(ref, transaction)
  }
}

export const TransactionRevealWordHandleGuess = (ref: Ref, transaction: Transaction, wordIndex: number, gameData: GameInfo): Transaction => {
  if (checkForWin(gameData)) {
    return __TransactionHandleWin(ref, transaction)
  }
  __TransactionChangeWordToRevealed(ref, transaction, wordIndex, gameData)
  return __CalculateGuessResults(ref, transaction, gameData, wordIndex)
}

export const TransactionAddLog = (ref: Ref, transaction: Transaction, log: LogEntry): Transaction => {
  return transaction.update(ref, { gameLog: firebase.firestore.FieldValue.arrayUnion(log) })
}

type Ref = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
type Transaction = firebase.firestore.Transaction
