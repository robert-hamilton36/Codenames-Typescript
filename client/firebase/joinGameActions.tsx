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

  const createGame: (newGame: GameState) => Promise<void> = (newGame: GameState) => {
    return firestore.collection('Games')
      .add(newGame)
      .then(data => setGameId(data.id))
  }

  const joinGame: JoinGame = (user: User, gameId:string, firestore: firestore) => {
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
  return {
    consoleLog,
    createGame,
    joinGame
  }
}

type JoinGame = (user: User, gameId: string, firestore: firebase.firestore.Firestore) => FirestoreTransactionPromise
type FirestoreTransactionPromise = Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
type Data = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>

interface ActionReturns {
  consoleLog: () => void,
  createGame: (newGame: GameState) => Promise<void>,
  joinGame: JoinGame
}
