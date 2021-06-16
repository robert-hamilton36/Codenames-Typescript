import React from 'react'
import { FirebaseProvider } from '../contexts/FirebaseContext'
import { UserProvider } from '../contexts/UserContext'
import { Routes } from '../Routes'

const App: React.FC = () => {
  return (
    <UserProvider>
      <FirebaseProvider>
        <Routes/>
      </FirebaseProvider>
    </UserProvider>
  )
}

export default App
