import React, { useEffect } from 'react'
import { useFirestoreSubscriber } from '../contexts/FirebaseContext'
// import { useUserContext } from '../contexts/UserContext'

import { GameInfo } from '../types/gameState'
import { LargeGame } from './LargeGame'
import { useScreenSize } from '../hooks/useScreenSize'
import { useUserActions, useUserContext } from '../contexts/UserContext'

export const Game: React.FC = () => {
  const { gameId } = useUserContext()
  const { user } = useUserContext()
  const { updateUser } = useUserActions()
  const data: GameInfo | null = useFirestoreSubscriber(gameId)
  const screenSize = useScreenSize()

  useEffect(() => {
    let updatedUser
    console.log('hello')
    if (data) {
      updatedUser = data?.players.find(player => {
        console.log(player)
        if (player.uid === user.uid) {
          return player
        }
      })
      updateUser(updatedUser)
    }
  }, [data])

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
