import React from 'react'

import { ChatContainer } from '../components/Game/ChatContainer'
import { Score } from '../components/Game/Score'
import { PlayerInfo } from '../components/PlayerInfo/PlayerInfo'
import { GameInfoContainer } from '../components/Game/GameInfoContainer'
import { VoteTable } from '../components/Game/VoteTable'

import { GameInfo } from '../types/gameState'
import { Gameplay } from '../components/Gameplay/Gameplay'
import { StartGameButton } from '../components/Game/StartGameButton'
import { LeaveGameButton } from '../components/Game/LeaveGameButton'
import { MainBoard } from '../components/Game/MainBoard'
import { useUserContext } from '../contexts/UserContext'

export const LargeGame: React.FC<Props> = ({ data }) => {
  const { user } = useUserContext()
  return (
    <div className='largeGameContainer'>
      <div className="players">
        <PlayerInfo playerList={data.players} tableTop={false}/>
        <VoteTable votes={data.gameState.votes}/>
      </div>
      <div className='startGame'>
        { user.host && !data.gameState.gameStart && <StartGameButton gameInfo={data}/>}
        <LeaveGameButton />
      </div>
      <div className='gameInfo'>
        <GameInfoContainer gameState={data.gameState}/>
      </div>

      <MainBoard data={data} />

      <div className='score'>
        <Score teamPoints={data.gameState.teamPoints}/>
      </div>
      {data.settings.gameplayMode !== 'tabletop' && (
        <div className='chat'>
          <ChatContainer game={data}/>
        </div>
      )
      }
      <div className='actions'>
        <Gameplay gameData={data}/>
      </div>
    </div>
  )
}

interface Props {
  data: GameInfo
}
