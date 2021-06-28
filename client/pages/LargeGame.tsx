import React from 'react'
import { DisplayWordGrid } from '../components/Game/DisplayWordGrid'
import { Score } from '../components/Game/Score'
import { PlayerInfo } from '../components/PlayerInfo/PlayerInfo'
import { GameInfoContainer } from '../components/Game/GameInfoContainer'
import { GameInfo } from '../types/gameState'

export const LargeGame: React.FC<Props> = ({ data }) => {
  return (
    <>
      <PlayerInfo playerList={data.players} tableTop={false}/>
      <GameInfoContainer gameState={data.gameState}/>
      <DisplayWordGrid wordList={data.gameState.words}/>
      <Score teamPoints={data.gameState.teamPoints}/>
    </>
  )
}

interface Props {
  data: GameInfo
}
