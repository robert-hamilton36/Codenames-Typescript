import React from 'react'

import { TeamPoints } from '../../types/gameState'

export const Score:React.FC<Props> = ({ teamPoints }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th data-testid='redScore'>Red: {teamPoints.red}</th>
          <th data-testid='blueScore'>Blue: {teamPoints.blue}</th>
        </tr>
      </tbody>
    </table>
  )
}

interface Props {
  teamPoints: TeamPoints
}
