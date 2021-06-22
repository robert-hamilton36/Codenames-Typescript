import React from 'react'
import { DisplayWordGrid } from '../components/Game/DisplayWordGrid'
import { MessageContainer } from '../components/Game/MessageContainer'
import { GameInfo } from '../types/gameState'

export const LargeGame: React.FC<Props> = ({ data }) => {
  return (
    <>
      <DisplayWordGrid wordList={data.gameState.words}/>
      <MessageContainer game={data}/>
    </>
  )
}

interface Props {
  data: GameInfo
}
