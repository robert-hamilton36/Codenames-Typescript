import React from 'react'
import { FirebaseProvider } from '../contexts/FirebaseContext'
import { UserProvider } from '../contexts/UserContext'
import { Hello } from './Hello'

const App: React.FC = () => {
  return (
    <UserProvider>
      <FirebaseProvider>
        <Hello/>
      </FirebaseProvider>
    </UserProvider>
  )
}

export default App
