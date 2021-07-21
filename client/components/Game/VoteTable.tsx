import React from 'react'

import { VoteObject } from '../../types/gameState'
import { makeVotesTable } from '../../utility/makeVoteTable'

export const VoteTable: React.FC<Props> = ({ votes }) => {
  return (
    <table>
      <tr>
        <th>Voted</th>
        <th>Locked</th>
      </tr>
      {makeVotesTable(votes)}
    </table>
  )
}

interface Props {
  votes: VoteObject[]
}
