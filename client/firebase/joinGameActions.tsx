import { useUserContext } from '../contexts/UserContext'
import firebase from 'firebase/app'
import 'firebase/firestore'

// eslint-disable-next-line import/no-unresolved
import { GameState, PlayerObject, TeamColour, User } from '../types/gameState'
import { firestore } from '../contexts/FirebaseContext'

const getNewPlayersTeam: (data:Data) => TeamColour = (data) => {
  let team: TeamColour = ''
  if (data.data().settings.gameplayMode !== 'tabletop') {
    if (data.data().players.filter((person) => person.team === 'Red').length <= data.data().players.filter((person) => person.team === 'Blue').length) {
      team = 'Red'
    } else {
      team = 'Blue'
    }
  }
  return team
}

export const joinGameActions: (firestore: firestore) => ActionReturns = (firestore: firestore) => {
  const { setGameId } = useUserContext()

  const consoleLog = () => {
    console.log(firestore)
  }

  const createGame: CreateGame = (newGame: GameState) => {
    return firestore.collection('Games')
      .add(newGame)
      .then(data => setGameId(data.id))
  }

  const joinGame: JoinGame = (user: User, gameId:string) => {
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

  const leaveGame: LeaveGame = (userId:string, gameId:string) => {
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

  const deleteGame: DeleteGame = (gameId:string) => {
    return firestore.collection('Games').doc(gameId)
      .delete()
  }

  const kickPlayer: KickPlayer = (userId:string, gameId:string) => {
    const ref = firestore.collection('Games').doc(gameId)
    return firestore.runTransaction((transaction) => {
      return transaction.get(ref)
        .then((data) => {
          const array = data.data().players.filter((player) => player.uid === userId)
          return transaction.update(ref, { players: firebase.firestore.FieldValue.arrayRemove(array[0]) })
        })
    })
  }

  return {
    consoleLog,
    createGame,
    deleteGame,
    joinGame,
    leaveGame,
    kickPlayer
  }
}

type JoinGame = (user: User, gameId: string) => FirestoreTransactionPromise
type FirestoreTransactionPromise = Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
type CreateGame = (newGame: GameState) => Promise<void>
type DeleteGame = (gameId: string) => Promise<void>
type LeaveGame = (userId: string, gameId: string) => Promise<void>
type KickPlayer = (userId: string, gameId: string) => Promise<firebase.firestore.Transaction>
type Data = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>

export interface ActionReturns {
  consoleLog: () => void,
  createGame: CreateGame,
  deleteGame: DeleteGame,
  joinGame: JoinGame,
  leaveGame: LeaveGame,
  kickPlayer: KickPlayer
}
