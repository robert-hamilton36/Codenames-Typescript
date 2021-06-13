import firebase from 'firebase/app'
import 'firebase/firestore'

import React, { createContext, useContext, useMemo } from 'react'
interface IFirebase {
  app: firebase.app.App,
  firestore: firebase.firestore.Firestore
}

const FirebaseContext = createContext<IFirebase | null >(null)

export function useFirebase ():IFirebase {
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

export const FirebaseProvider: React.FC<React.ReactNode> = ({ children }) => {
  const app = useMemo(() => {
    return firebase.initializeApp(firebaseConfig)
  }, [firebaseConfig])
  const firestore = app.firestore()
  const provided: IFirebase = useMemo(() => ({ app, firestore }), [app, firestore])

  return (
    <FirebaseContext.Provider value={provided}>
      {children}
    </FirebaseContext.Provider>
  )
}
