import React from 'react'

import { VoteObject } from '../types/gameState'

export const makeVotesTable = (votes: VoteObject[]): JSX.Element[] => {
  const voteTable = votes?.map((vote) => {
    const name = vote.player.name
    const votedWord = vote?.wordObj?.word
    const voteSkiped = vote?.skip
    const voteLocked = vote?.locked

    return (
      <tr key={'voteRow' + name}>
        <td key={'voteTd' + name}>
          {name}: {voteSkiped ? 'skip' : votedWord}
          {voteLocked ? '-locked' : ''}
        </td>
      </tr>
    )
  })
  return voteTable
}
