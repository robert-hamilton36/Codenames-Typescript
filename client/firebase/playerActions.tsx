import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestore } from '../contexts/FirebaseContext'
import { TeamColour } from '../types/gameState'

export const playerActions = (firestore: firestore): playerActionReturn => {
  const changePlayersTeam = (gameId: string, userID: string, team: TeamColour) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const player = data.data().players.find((player) => player.uid === userID)
          transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(player) })
          player.team = team
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(player) })
        })
    })
  }

  const editPlayerHost = (gameId: string, userID: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const player = data.data().players.find((player) => player.uid === userID)
          transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(player) })
          // todo: remove delete keyword
          player.host ? delete player.host : player.host = true
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(player) })
        })
    })
  }

  const editSpymasterOperative = (gameId: string, userID: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          console.log(data.data())
          const player = data.data().players.find((player) => player.uid === userID)
          console.log(player)
          transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(player) })
          // todo: remove delete keyword
          player.spymaster ? delete player.spymaster : player.spymaster = true
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(player) })
        })
    })
  }

  return {
    changePlayersTeam,
    editPlayerHost,
    editSpymasterOperative
  }
}

export interface playerActionReturn {
  changePlayersTeam: (gameId: string, userID: string, team: TeamColour) => Promise<firebase.firestore.Transaction>
  editPlayerHost: (gameId: string, userID: string) => Promise<firebase.firestore.Transaction>
  editSpymasterOperative: (gameId: string, userID: string) => Promise<firebase.firestore.Transaction>
}
