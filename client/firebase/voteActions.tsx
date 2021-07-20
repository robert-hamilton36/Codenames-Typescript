import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { VoteObject } from '../types/gameState'

export const voteActions = (firestore: firestore): VoteActionReturn => {
  const clearVotes = (gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return ref.update({ 'gameState.votes': [] })
  }

  const addPlayerVote = (gameId: string, voteObj: VoteObject) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const votesArray = data.data().gameState.votes
          // checks to see if player has already voted and remove old vote
          if (votesArray.find((vote) => vote.player.uid === voteObj.player.uid)) {
            const filteredVoteArray = votesArray.filter(vote => vote.player.uid !== voteObj.player.uid)
            filteredVoteArray.push(voteObj)
            return transaction.update(ref, { 'gameState.votes': filteredVoteArray })
          } else {
            return transaction.update(ref, { 'gameState.votes': firebase.firestore.FieldValue.arrayUnion(voteObj) })
          }
        })
    })
  }

  const removePlayersVote = (gameId: string, userId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const filteredVoteArray = data.data().gameState.votes.filter(vote => vote.player.uid !== userId)
          return transaction.update(ref, { 'gameState.votes': filteredVoteArray })
        })
    })
  }

  const invertLockStatusForPlayersVote = (gameId: string, userId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const voteArray = data.data().gameState.votes
          const returnedArray = voteArray.map((voteObj) => {
            if (voteObj.player.uid === userId) {
              return {
                wordObj: voteObj.wordObj,
                player: voteObj.player,
                locked: !voteObj.locked
              }
            }
            return voteObj
          })
          return transaction.update(ref, { 'gameState.votes': returnedArray })
        })
    })
  }

  return {
    clearVotes,
    addPlayerVote,
    removePlayersVote,
    invertLockStatusForPlayersVote
  }
}

export interface VoteActionReturn {
  clearVotes: (gameId: string) => Promise<void>
  addPlayerVote: (gameId: string, voteObj: VoteObject) => Promise<firebase.firestore.Transaction>
  removePlayersVote: (gameId: string, playerUid: string) => Promise<firebase.firestore.Transaction>
  invertLockStatusForPlayersVote: (gameId: string, userId: string) => Promise<firebase.firestore.Transaction>
}
