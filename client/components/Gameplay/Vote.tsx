import React, { useEffect, useState } from 'react'

import { UserNotVoted } from './UserNotVoted'
import { VotedForSkip } from './VotedForSkip'
import { VotedForWord } from './VotedForWord'

import { useVoteActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'
import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'

import { LogEntry } from '../../types/gameLog'
import { VoteObject } from '../../types/gameState'

import { makeTeamGuessLog } from '../../utility/makeLog'
import { userVotedForSkip, userVotedForWord } from '../../utility/playerVoteFunctions'

export const Vote: React.FC<Props> = ({ votes, gameLog }) => {
  const [usersVote, setUsersVote] = useState<VoteObject>(null)
  const { gameId } = useGameId()
  const { user } = useUserContext()
  const { selectedCard } = useSelectedCard()
  const { addPlayerVote, removePlayersVote, invertLockStatusForPlayersVote } = useVoteActions()

  useEffect(() => {
    const getUsersVote = votes.find(vote => vote.player.uid === user.uid)
    if (getUsersVote) {
      setUsersVote(getUsersVote)
    } else {
      setUsersVote(null)
    }
  }, [votes])

  const handleVote = () => {
    const voteObj = {
      locked: false,
      player: user,
      wordObj: selectedCard,
      skip: false
    }

    addPlayerVote(gameId, voteObj)
  }

  const handleUnvote = () => {
    removePlayersVote(gameId, user.uid)
  }

  const handleLockIn = () => {
    const log = makeTeamGuessLog(gameLog, user, usersVote.wordObj)
    invertLockStatusForPlayersVote(gameId, user, log)
  }

  const handleSkip = () => {
    const voteObj = {
      locked: false,
      player: user,
      skip: true,
      wordObj: null
    }

    addPlayerVote(gameId, voteObj)
  }

  if (userVotedForSkip(usersVote)) {
    return (
      <VotedForSkip selectedCard={selectedCard} usersVote={usersVote} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />
    )
  }

  if (userVotedForWord(usersVote)) {
    return (
      <VotedForWord selectedCard={selectedCard} usersVote={usersVote} handleVote={handleVote} handleUnvote={handleUnvote} handleLockIn={handleLockIn} />
    )
  }

  return (
    <UserNotVoted selectedCard={selectedCard} handleVote={handleVote} handleSkip={handleSkip}/>
  )
}

interface Props {
  votes: VoteObject[]
  gameLog: LogEntry[]
}
