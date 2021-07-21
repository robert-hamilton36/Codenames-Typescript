import React from 'react'

import { TeamPoints } from '../../types/gameState'

export const Score:React.FC<Props> = ({ teamPoints }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Red: {teamPoints.red}</th>
          <th>Blue: {teamPoints.blue}</th>
        </tr>
      </tbody>
    </table>
  )
}

interface Props {
  teamPoints: TeamPoints
}
