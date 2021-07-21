import React from 'react'

import { FirebaseProvider } from '../contexts/FirebaseContext'
import { SelectedCardProvider } from '../contexts/SelectedCardContext'
import { UserProvider } from '../contexts/UserContext'
import { Routes } from '../Routes'

const App: React.FC = () => {
  return (
    <UserProvider>
      <FirebaseProvider>
        <SelectedCardProvider>
          <Routes/>
        </SelectedCardProvider>
      </FirebaseProvider>
    </UserProvider>
  )
}

export default App
