import React from 'react'

import { VoteObject } from '../types/gameState'

export const makeVotesTable = (votes: VoteObject[]): JSX.Element[] => {
  const lockedIn = votes.filter(vote => vote.locked)
  const voted = votes.filter(vote => !vote.locked)

  const noOfVoteRows = lockedIn > voted ? lockedIn.length : voted.length
  const voteTable: JSX.Element[] = []

  for (let x = 0; x < noOfVoteRows; x++) {
    voteTable.push(
      <tr key={'voteRow' + x}>
        {voted[x] ? <td key={'voteTd' + x}>{voted[x].player.name}</td> : <td></td>}
        {lockedIn[x] ? <td key={'lockTd' + x}>{lockedIn[x].player.name}</td> : <td></td>}
      </tr>
    )
  }

  return voteTable
}
