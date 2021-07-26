import React from 'react'

import { VoteObject } from '../../types/gameState'
import { makeVotesTable } from '../../utility/makeVoteTable'

export const VoteTable: React.FC<Props> = ({ votes }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {makeVotesTable(votes)}
      </tbody>
    </table>
  )
}

interface Props {
  votes: VoteObject[]
}
