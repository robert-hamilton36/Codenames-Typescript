import React from 'react'

import { ErrorProvider } from './contexts/ErrorContext'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { SelectedCardProvider } from './contexts/SelectedCardContext'
import { UserProvider } from './contexts/UserContext'
import { GameIdProvider } from './contexts/GameIdContext'
import { Routes } from './Routes'

const App: React.FC = () => {
  return (
    <ErrorProvider>
      <UserProvider>
        <GameIdProvider>
          <FirebaseProvider>
            <SelectedCardProvider>
              <Routes/>
            </SelectedCardProvider>
          </FirebaseProvider>
        </GameIdProvider>
      </UserProvider>
    </ErrorProvider>
  )
}

export default App
