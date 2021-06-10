import firebase from 'firebase/app'
import 'firebase/firestore'

// eslint-disable-next-line import/no-unresolved
import { GameState, PlayerObject, TeamColour, User } from '../types/gameState'

const firestore = firebase.firestore()

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
