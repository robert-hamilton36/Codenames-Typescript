import firebase from 'firebase/app'
import 'firebase/firestore'
// import { GameState } from '../types/gameState'
// eslint-disable-next-line import/no-unresolved
import { GameState, PlayerObject, TeamColour, User } from '../types/gameState'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

export const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()

export const database = {
  games: firestore.collection('Games'),
  words: firestore.collection('Words')
}

// export const createGame:(newGame: GameState) => firestorePromise = (newGame: GameState) => {
//   return firestore.collection('Games')
//     .add(newGame)
// }

const getNewPlayerTeam: (data:Data) => TeamColour = (data) => {
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

export const createGame:(newGame: GameState) => FirestorePromise = (newGame: GameState) => {
  return firestore.collection('Games')
    .add(newGame)
}

export const joinGame: (user: User, gameId:string) => FirestoreTransactionPromise = (user: User, gameId:string) => {
  const ref = firestore.collection('Games').doc(gameId)
  return firestore.runTransaction((transaction) => {
    return transaction.get(ref)
      .then(data => {
        const team: TeamColour = getNewPlayerTeam(data)
        const playerObj: PlayerObject = { ...user, team }
        transaction.update(ref, { players: firebase.firestore.FieldValue.arrayUnion(playerObj) })
        return data
      })
  })
}

type FirestorePromise = Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>
type FirestoreTransactionPromise = Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>
type Data = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>

// type firestorePromise = Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>
