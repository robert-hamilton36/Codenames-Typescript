import React from 'react'

import { ErrorProvider } from './contexts/ErrorContext'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { GameIdProvider } from './contexts/GameIdContext'
import { ToasterProvider } from './contexts/ToasterContext'
import { SelectedCardProvider } from './contexts/SelectedCardContext'
import { UserProvider } from './contexts/UserContext'

export const Providers: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <ErrorProvider>
      <UserProvider>
        <GameIdProvider>
          <FirebaseProvider>
            <SelectedCardProvider>
              <ToasterProvider>
                {children}
              </ToasterProvider>
            </SelectedCardProvider>
          </FirebaseProvider>
        </GameIdProvider>
      </UserProvider>
    </ErrorProvider>
  )
}
