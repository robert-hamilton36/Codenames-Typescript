import React from 'react'
import { LogEntry } from '../../types/gameState'
import { makeGameLogJSX } from '../../utility/makeGameLogJSX'

export const GameLog: React.FC<Props> = ({ gameLog }) => {
  return (
    <div className='gameLog'>
      <h6 className='header' data-testid='gameLogHeader'>Game log</h6>
      <ul className='logContainer' data-testid='gameLogList'>
        {
          gameLog.map(entry => makeGameLogJSX(entry))
        }
      </ul>
    </div>
  )
}

interface Props {
  gameLog: LogEntry[]
}
