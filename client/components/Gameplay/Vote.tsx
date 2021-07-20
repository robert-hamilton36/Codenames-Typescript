import React, { useEffect, useState } from 'react'
import { useVoteActions } from '../../contexts/FirebaseContext'
import { useSelectedCard } from '../../contexts/SelectedCardContext'
import { useUserContext } from '../../contexts/UserContext'
import { VoteObject } from '../../types/gameState'

export const Vote: React.FC<Props> = ({ votes }) => {
  const [usersVote, setUsersVote] = useState<VoteObject>(null)
  const { user, gameId } = useUserContext()
  const { selectedCard } = useSelectedCard()
  const { addPlayerVote, removePlayersVote, invertLockStatusForPlayersVote } = useVoteActions()

  useEffect(() => {
    const usersVote = votes.find(vote => vote.player.uid === user.uid)
    setUsersVote(usersVote)
  }, [votes])

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
  }

  if (selectedCard === null) {
    return (
      <h1>Select a card</h1>
    )
  }

  if (usersVote?.wordObj.word === selectedCard.word) {
    return (
      <div>
        <h1>Selected Card: {selectedCard.word}</h1>
        <button onClick={handleUnvote}>Unvote</button>
        {!usersVote.locked && <button onClick={handleLockIn}>Lock-in</button>}
        {usersVote.locked && <button onClick={handleLockIn}>Unlock</button>}
      </div>
    )
  }

  return (
    <div>
      <h1>Selected Card: {selectedCard.word}</h1>
      <button onClick={handleVote}>Vote</button>
    </div>
  )
}

interface Props {
  votes: VoteObject[]
}
