import firebase from 'firebase/app'
import 'firebase/firestore'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { gameplayActions, GameplayActionReturn } from '../firebase/gameplayActions'
import { guessActions, GuessActionsReturn } from '../firebase/guessActions'
import { joinGameActions, JoinGameActionReturn } from '../firebase/joinGameActions'
import { messageActions, MessageReturn } from '../firebase/messageActions'
import { playerActions, playerActionReturn } from '../firebase/playerActions'
import { voteActions, VoteActionReturn } from '../firebase/voteActions'

import { GameInfo } from '../types/gameInfo'

export type firestore = firebase.firestore.Firestore
export type app = firebase.app.App
interface ProvidedContextFirebase {
  app: app,
  firestore: firestore,
}

const FirebaseContext = createContext<ProvidedContextFirebase | null >(null)

export function useFirebase ():ProvidedContextFirebase {
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
  const provided: ProvidedContextFirebase = useMemo(() => ({ app, firestore }), [app, firestore])

  return (
    <FirebaseContext.Provider value={provided}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirestoreSubscriber = (gameId: string): GameInfo => {
  const { firestore } = useFirebase()
  const [data, setData] = useState<GameInfo>()
  useEffect(() => {
    let hasSubscribed = false
    let unsubscribe
    if (gameId) {
      unsubscribe = firestore.collection('Games').doc(gameId)
        .onSnapshot((doc) => {
          const data = doc.data() as GameInfo
          setData(data)
        })
      hasSubscribed = true
    }
    return () => hasSubscribed && unsubscribe()
  }, [gameId])
  return data as GameInfo
}

export const useFirestoreCollectionSubscriber = (collection: string): string[] => {
  const { firestore } = useFirebase()
  // const [data, setData] = useState<firebase.firestore.DocumentData>()
  const [data, setData] = useState<string[]>()
  useEffect(() => {
    let hasSubscribed = false
    let unsubscribe
    if (collection) {
      unsubscribe = firestore.collection(collection)
        .onSnapshot((doc) => {
          const array = doc.docs.reduce((oldArray, doc) => {
            oldArray.push(doc.id)
            return oldArray
          }, [])
          setData(array)
        })
      hasSubscribed = true
    }
    return () => hasSubscribed && unsubscribe()
  }, [collection])
  return data as string[]
}

export const getWords = (doc = 'BaseGame'): string[] => {
  const [words, setWords] = useState<string[]>([])
  const { firestore } = useFirebase()
  useEffect(() => {
    firestore.collection('Words').doc(doc).get()
      .then((data) => setWords(data.data().words))
      .catch((error) => {
        console.log('Error getting words:', error)
      })
  }, [])
  return words
}

export const useJoinGameActions = (): JoinGameActionReturn => {
  const { firestore } = useFirebase()
  const actions = joinGameActions(firestore)
  return actions
}

export const usePlayerActions = (): playerActionReturn => {
  const { firestore } = useFirebase()
  const actions = playerActions(firestore)
  return actions
}

export const useGameplayActions = (): GameplayActionReturn => {
  const { firestore } = useFirebase()
  const actions = gameplayActions(firestore)
  return actions
}

export const useGuessActions = (): GuessActionsReturn => {
  const { firestore } = useFirebase()
  const actions = guessActions(firestore)
  return actions
}

export const useVoteActions = (): VoteActionReturn => {
  const { firestore } = useFirebase()
  const actions = voteActions(firestore)
  return actions
}

export const useMessageActions = (): MessageReturn => {
  const { firestore } = useFirebase()
  const actions = messageActions(firestore)
  return actions
}
