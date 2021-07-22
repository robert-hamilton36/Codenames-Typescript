import React from 'react'

import { DisplayWordGrid } from '../components/Game/DisplayWordGrid'
import { MessageContainer } from '../components/Game/MessageContainer'
import { Score } from '../components/Game/Score'
import { PlayerInfo } from '../components/PlayerInfo/PlayerInfo'
import { GameInfoContainer } from '../components/Game/GameInfoContainer'

import { GameInfo } from '../types/gameState'
import { Gameplay } from '../components/Gameplay/Gameplay'
import { StartGameButton } from '../components/Game/StartGameButton'

export const LargeGame: React.FC<Props> = ({ data }) => {
  return (
    <div className='largeGameContainer'>
      <div className="players">
        <PlayerInfo playerList={data.players} tableTop={false}/>
      </div>
      <div className='startGame'>
        <StartGameButton gameInfo={data}/>
      </div>
      <div className='gameInfo'>
        <GameInfoContainer gameState={data.gameState}/>
      </div>
      <DisplayWordGrid wordList={data.gameState.words}/>
      <div className='score'>
        <Score teamPoints={data.gameState.teamPoints}/>
      </div>
      <div className='chat'>
        <MessageContainer game={data}/>
      </div>
      <div className='actions'>
        <Gameplay gameData={data}/>
      </div>
    </div>
  )
}

interface Props {
  data: GameInfo
}
