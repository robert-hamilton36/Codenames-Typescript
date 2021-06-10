import firebase from 'firebase/app'
import 'firebase/firestore'

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
