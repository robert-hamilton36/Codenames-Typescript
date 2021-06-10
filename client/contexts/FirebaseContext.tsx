import firebase from 'firebase/app'
import 'firebase/firestore'

import React, { useContext } from 'react'

const FirebaseContext = React.createContext(null)

export function useFirebase () {
  return useContext(FirebaseContext)
}

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

export const FirebaseProvider = ({ children }) => {
  const app = firebase.initializeApp(firebaseConfig)
  const firestore = firebase.firestore()

  const provided = {
    app,
    firestore
  }
  return (
    <FirebaseContext.Provider value={provided}>
      {children}
    </FirebaseContext.Provider>
  )
}
