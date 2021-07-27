import React, { useEffect, useState } from 'react'
import { useVoteActions } from '../../contexts/FirebaseContext'
import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'
import { VoteObject } from '../../types/gameState'

export const Vote: React.FC<Props> = ({ votes }) => {
  const [usersVote, setUsersVote] = useState<VoteObject>(null)
  const [votedForSkipped, setVotedForSkipped] = useState<boolean>(false)
  const [votedForWord, setVotedForWord] = useState<boolean>(false)
  const { user, gameId } = useUserContext()
  const { selectedCard, setSelectedCard } = useSelectedCard()
  const { addPlayerVote, removePlayersVote, invertLockStatusForPlayersVote } = useVoteActions()

  useEffect(() => {
    const usersVote = votes.find(vote => vote.player.uid === user.uid)
    setUsersVote(usersVote)
  }, [votes])

  useEffect(() => {
    if (usersVote?.wordObj?.word) {
      setVotedForSkipped(false)
      setVotedForWord(true)
    }
    if (usersVote?.skip) {
      setVotedForSkipped(true)
      setVotedForWord(false)
    }
  }, [usersVote])

  const handleVote = () => {
    const voteObj = {
      locked: false,
      player: user,
      wordObj: selectedCard
    }

    addPlayerVote(gameId, voteObj)
  }

  const handleUnvote = () => {
    removePlayersVote(gameId, user.uid)
  }

  const handleLockIn = () => {
    invertLockStatusForPlayersVote(gameId, user.uid)
    setSelectedCard(null)
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

  if (votedForSkipped && selectedCard === null) {
    return (
      <div>
        <h1>Voted for skip turn</h1>
        <button onClick={handleUnvote}>Unvote</button>
        <button onClick={handleLockIn}>Lock-in</button>
      </div>
    )
  }

  if (votedForSkipped && selectedCard) {
    return (
      <div>
        <h1>Selected Card: {selectedCard.word}</h1>
        <h1>Voted for skip turn</h1>
        <button onClick={handleVote}>Change Vote</button>
      </div>
    )
  }

  if (selectedCard === null) {
    return (
      <>
        <h1>Select a card and vote</h1>
        <button onClick={handleSkip}>Skip</button>
      </>
    )
  }

  if (usersVote?.wordObj?.word === selectedCard?.word) {
    return (
      <div>
        <h1>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleUnvote}>Unvote</button>
        {usersVote.locked
          ? <button onClick={handleLockIn}>Unlock</button>
          : <button onClick={handleLockIn}>Lock-in</button>
        }
      </div>
    )
  }

  if (votedForWord && usersVote?.wordObj?.word !== selectedCard?.word) {
    return (
      <div>
        <h1>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleVote}>Change Vote</button>
        <button onClick={handleSkip}>Skip</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Selected Card: {selectedCard.word}</h1>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleSkip}>Skip</button>
    </div>
  )
}

interface Props {
  votes: VoteObject[]
}
