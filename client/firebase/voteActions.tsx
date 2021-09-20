import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { GameInfo, LogEntry, User, VoteObject } from '../types/gameState'
import { checkForUnanimousVote, filterOutUsersOldVote, findUsersVoteInvertItsLockStatus } from './firebaseActionHelperFunctions'
import { TransactionAddLog, TransactionEndTurn, TransactionRevealWordHandleGuess } from './firebaseTransactions'
import { getNextTurnsTeam } from '../utility/gameStateInfoFunctions'

export const voteActions = (firestore: firestore): VoteActionReturn => {
  const addPlayerVote = (gameId: string, voteObj: VoteObject) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const votes = data.data().gameState.votes
          // checks to see if player has already voted and removes that old vote
          const filteredVoteArray = filterOutUsersOldVote(votes, voteObj.player.uid)
          filteredVoteArray.push(voteObj)
          return transaction.update(ref, { 'gameState.votes': filteredVoteArray })
        })
    })
  }

  const removePlayersVote = (gameId: string, userId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const votes = data.data().gameState.votes
          const filteredVoteArray = filterOutUsersOldVote(votes, userId)
          return transaction.update(ref, { 'gameState.votes': filteredVoteArray })
        })
    })
  }

  const invertLockStatusForPlayersVote = (gameId: string, user: User, log: LogEntry) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const gameInfo = data.data() as GameInfo
          const nextTeam = getNextTurnsTeam(gameInfo)
          const numberOfOperativesInCurrentTeam = gameInfo.players.filter(player => !player.spymaster && player.team === gameInfo.gameState.teamTurn)
          const votes = gameInfo.gameState.votes
          const usersVote = votes.find(vote => vote.player.uid === user.uid)
          const returnedArray = findUsersVoteInvertItsLockStatus(votes, user.uid)
          // checks to see if consensus for a guess has been reached
          // and then makes the guess
          if (checkForUnanimousVote(returnedArray, numberOfOperativesInCurrentTeam.length)) {
            if (usersVote.skip) {
              TransactionAddLog(ref, transaction, log)
              return TransactionEndTurn(ref, transaction, nextTeam)
            }
            TransactionAddLog(ref, transaction, log)
            return TransactionRevealWordHandleGuess(ref, transaction, usersVote.wordObj.index, gameInfo)
          }
          return transaction.update(ref, { 'gameState.votes': returnedArray })
        })
    })
  }

  return {
    addPlayerVote,
    removePlayersVote,
    invertLockStatusForPlayersVote
  }
}

export interface VoteActionReturn {
  addPlayerVote: (gameId: string, voteObj: VoteObject) => Promise<firebase.firestore.Transaction>
  removePlayersVote: (gameId: string, playerUid: string) => Promise<firebase.firestore.Transaction>
  invertLockStatusForPlayersVote: (gameId: string, user: User, log: LogEntry) => Promise<firebase.firestore.Transaction>
}
