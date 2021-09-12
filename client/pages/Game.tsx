import React, { useEffect } from 'react'
import { useFirestoreSubscriber } from '../contexts/FirebaseContext'
// import { useUserContext } from '../contexts/UserContext'

import { GameInfo } from '../types/gameState'
import { LargeGame } from './LargeGame'
// import { useScreenSize } from '../hooks/useScreenSize'
import { useUserActions, useUserContext } from '../contexts/UserContext'
import { useGameId } from '../contexts/GameIdContext'

export const Game: React.FC = () => {
  const { gameId } = useGameId()
  const { user } = useUserContext()
  const { updateUser } = useUserActions()
  const data: GameInfo | null = useFirestoreSubscriber(gameId)
  // const screenSize = useScreenSize()

  useEffect(() => {
    let updatedUser
    if (data) {
      updatedUser = data?.players.find(player => {
        if (player.uid === user.uid) {
          return player
        }
      })
      updateUser(updatedUser)
    }
  }, [data])

  if (!data) {
    return (
      <h1>Loading ...</h1>
    )
  }

  // if (screenSize === 'fullscreen') {
  //   return (
  //     // fullscreen Game
  //     <LargeGame data={data}/>
  //   )
  // } else if (screenSize === 'phone') {
  //   return (
  //     // other screen sizes
  //     // null
  //     <LargeGame data={data}/>
  //   )
  // }

  // temp until screensize is fully working
  if (data) {
    return (
      <LargeGame data={data}/>
    )
  }
}
