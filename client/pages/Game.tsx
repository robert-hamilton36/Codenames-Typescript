import React from 'react'
import { useFirestoreSubscriber } from '../contexts/FirebaseContext'
// import { useUserContext } from '../contexts/UserContext'
import { GameState } from '../types/gameState'
import { LargeGame } from './LargeGame'
import { useScreenSize } from '../hooks/useScreenSize'

export const Game: React.FC = () => {
  // const { gameId } = useUserContext()
  const data: GameState | null = useFirestoreSubscriber('c9VASzG4EATCzGJyKiGj')
  const screenSize = useScreenSize()

  if (data) {
    if (screenSize === 'fullscreen') {
      return (
        // fullscreen Game
        <LargeGame data={data}/>
      )
    } else if (screenSize === 'phone') {
      return (
        // other screen sizes
        null
      )
    }
  } else {
    return (
      <h1>Loading ...</h1>
    )
  }
}
