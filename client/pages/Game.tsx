import React, { useEffect } from 'react'

import { LargeGame } from './LargeGame'

import { useFirestoreSubscriber } from '../contexts/FirebaseContext'
import { useGameId } from '../contexts/GameIdContext'
import { useUserActions, useUserContext } from '../contexts/UserContext'
import { SocketProvider } from '../contexts/SocketContext'

// import { useScreenSize } from '../hooks/useScreenSize'

// import { GameInfo } from '../types/gameInfo'

export const Game: React.FC = () => {
  const { gameId } = useGameId()
  const { user } = useUserContext()
  const { updateUser } = useUserActions()
  const data = useFirestoreSubscriber(gameId)
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
      <SocketProvider uid={user.uid} gameId={gameId}>
        <LargeGame data={data}/>
      </SocketProvider>
    )
  }
}
