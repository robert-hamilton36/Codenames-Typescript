import firebase from 'firebase/app'
import 'firebase/firestore'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { joinGameActions } from '../firebase/joinGameActions'
interface IFirebase {
  app: app,
  firestore: firestore
}

export type firestore = firebase.firestore.Firestore
export type app = firebase.app.App

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
  const actions = joinGameActions(firestore)
  const provided: IFirebase = useMemo(() => ({ app, firestore, actions }), [app, firestore, actions])

  return (
    <FirebaseContext.Provider value={provided}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirestoreSubscriber: (gameId: string) => firebase.firestore.DocumentData = (gameId: string) => {
  const { firestore } = useFirebase()
  const [data, setData] = useState<firebase.firestore.DocumentData>()
  useEffect(() => {
    let hasSubscribed = false
    let unsubscribe
    if (gameId) {
      unsubscribe = firestore.collection('Games').doc(gameId)
        .onSnapshot((doc) => {
          setData(doc.data())
        })
      hasSubscribed = true
    }
    return () => hasSubscribed && unsubscribe()
  }, [gameId])
  return data
}
