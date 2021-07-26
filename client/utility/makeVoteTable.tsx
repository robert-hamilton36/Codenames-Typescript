import React from 'react'

import { VoteObject } from '../types/gameState'

export const makeVotesTable = (votes: VoteObject[]): JSX.Element[] => {
  const voteTable = votes?.map((vote, index) => {
    const name = vote.player.name
    const votedWord = vote?.wordObj?.word
    const voteSkiped = vote?.skip
    const voteLocked = vote?.locked
    return (
      <tr key={'voteRow' + index}>
        <td key={'voteTd' + index}>
          {name}: {voteSkiped ? 'skip' : votedWord}
          {voteLocked && '-locked'}
        </td>
      </tr>
    )
  })
  return voteTable
}
