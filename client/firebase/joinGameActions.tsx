import { useUserContext } from '../contexts/UserContext'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { GameInfo, PlayerObject, TeamColour, User } from '../types/gameState'
import { firestore } from '../contexts/FirebaseContext'

const getNewPlayersTeam = (data): TeamColour => {
  let team: TeamColour
  if (data.data().settings.gameplayMode !== 'tabletop') {
    if (data.data().players.filter((person) => person.team === 'red').length <= data.data().players.filter((person) => person.team === 'Blue').length) {
      team = 'red'
    } else {
      team = 'blue'
    }
  }
  return team
}

export const joinGameActions = (firestore: firestore): JoinGameActionReturn => {
  const { setGameId } = useUserContext()

  const createGame = (newGame: GameInfo) => {
    return firestore.collection('Games')
      .add(newGame)
      .then(data => setGameId(data.id))
  }

  const joinGame = (user: User, gameId:string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then(data => {
          const team: TeamColour = getNewPlayersTeam(data)
          const playerObj: PlayerObject = { ...user, team }
          transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(playerObj) })
          return data
        })
    })
  }

  const leaveGame = (userId:string, gameId:string) => {
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

  const deleteGame = (gameId:string) => {
    return firestore.collection('Games').doc(gameId)
      .delete()
  }

  const kickPlayer = (userId:string, gameId:string) => {
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
    deleteGame,
    joinGame,
    leaveGame,
    kickPlayer
  }
}

type Data = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>

export interface JoinGameActionReturn {
  createGame: (newGame: GameInfo) => Promise<void>
  deleteGame: (gameId: string) => Promise<void>
  joinGame: (user: User, gameId: string) => Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
  leaveGame: (userId: string, gameId: string) => Promise<void>,
  kickPlayer: (userId: string, gameId: string) => Promise<firebase.firestore.Transaction>
}
