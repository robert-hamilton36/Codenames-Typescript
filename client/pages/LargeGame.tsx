import React from 'react'
import { DisplayWordGrid } from '../components/Game/DisplayWordGrid'
import { GameState } from '../types/gameState'

export const LargeGame: React.FC<Props> = ({ data }) => {
  return (
    <DisplayWordGrid wordList={data.words}/>
  )
}

interface Props {
  data: GameState
}
