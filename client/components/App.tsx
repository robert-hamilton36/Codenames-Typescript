import React from 'react'
import { UserProvider } from '../contexts/UserContext'
import { Hello } from './Hello'

const App: React.FC = () => {
  return (
    <UserProvider>
      <Hello/>
    </UserProvider>
  )
}

export default App
