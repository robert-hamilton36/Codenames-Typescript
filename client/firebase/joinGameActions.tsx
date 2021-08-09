import firebase from 'firebase/app'
import 'firebase/firestore'

import { GameInfo, TeamColour, User } from '../types/gameState'
import { useGameId } from '../contexts/GameIdContext'
import { firestore } from '../contexts/FirebaseContext'
import { getTeamForNewPlayer } from '../utility/gameStateInfoFunctions'

export const joinGameActions = (firestore: firestore): JoinGameActionReturn => {
  const { setGameId } = useGameId()

  const createGame = (newGame: GameInfo) => {
    return firestore.collection('Games')
      .add(newGame)
      .then(data => setGameId(data.id))
  }

  const createTestGame = (newGame: GameInfo) => {
    return firestore.collection('Games')
      .doc('Test')
      .set(newGame)
      .then(() => setGameId('Test'))
  }

  const joinGame = (user: User, gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(data => {
          const gameState = data.data() as GameInfo
          const team: TeamColour = getTeamForNewPlayer(gameState)
          const playerObj: User = { ...user, team }
          transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(playerObj) })
          return data
        })
    })
  }

  const leaveGame = (userId: string, gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const array = data.data().players.filter((player) => player.uid === userId)
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(array[0]) })
        })
    })
      .then(() => setGameId(''))
  }

  const deleteGame = (gameId: string) => {
    return firestore.collection('Games').doc(gameId)
      .delete()
  }

  const kickPlayer = (userId: string, gameId: string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const player = data.data().players.find((player) => player.uid === userId)
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(player) })
        })
    })
  }

  return {
    createGame,
    createTestGame,
    deleteGame,
    joinGame,
    leaveGame,
    kickPlayer
  }
}

// type Data = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>

export interface JoinGameActionReturn {
  createGame: (newGame: GameInfo) => Promise<void>
  createTestGame: (newGame: GameInfo) => Promise<void>
  deleteGame: (gameId: string) => Promise<void>
  joinGame: (user: User, gameId: string) => Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
  leaveGame: (userId: string, gameId: string) => Promise<void>,
  kickPlayer: (userId: string, gameId: string) => Promise<firebase.firestore.Transaction>
}
