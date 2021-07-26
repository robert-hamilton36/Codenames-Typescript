import { VoteObject } from '../types/gameState'

export const findUsersVoteInvertItsLockStatus = (voteArray: VoteObject[], userId: string): VoteObject[] => {
  return voteArray.map((voteObj) => {
    if (voteObj.player.uid === userId) {
      return {
        wordObj: voteObj.wordObj,
        player: voteObj.player,
        locked: !voteObj.locked
      }
    }
    return voteObj
  })
}

export const filterOutUsersOldVote = (votes: VoteObject[], usersId: string): VoteObject[] => {
  return votes.filter(vote => vote.player.uid !== usersId)
}

export const checkForUnanimousVote = (votes: VoteObject[], amountOfOperatives: number): boolean => {
  const everyOneHasVoted = votes.length === amountOfOperatives
  const allVotesLockedIn = votes.every(vote => vote.locked === true)
  const allVotesAreForSkip = votes.every(vote => vote.skip)
  const allVotesAreForTheSameWord = votes.every(vote => vote?.wordObj?.word === votes[0]?.wordObj?.word)

  if (everyOneHasVoted && allVotesLockedIn && (allVotesAreForSkip || allVotesAreForTheSameWord)) {
    return true
  }
  return false
}
