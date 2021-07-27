import { GameInfo, TeamPoints, VoteObject } from '../types/gameState'

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

export const calculatePointsFromDataAndCurrentRevealedWord = (gameData: GameInfo, index: number): TeamPoints => {
  let Blue = 0
  let Red = 0
  for (const x in gameData.gameState.words) {
    const word = gameData.gameState.words[x]
    if (word.revealed) {
      if (word.key === 'blue') {
        Blue++
      } else if (word.key === 'red') {
        Red++
      }
    }
  }
  // works out which team get points for the current word that is being revealed
  const currentWord = gameData.gameState.words[index]
  if (currentWord.key === 'blue') {
    Blue++
  } else if (currentWord.key === 'red') {
    Red++
  }

  return {
    blue: Blue,
    red: Red
  }
}

export const checkForWin = (gameData: GameInfo): boolean => {
  for (const x of gameData.settings.teams) {
    // this is called before the points change, so it checks weather the current points + 1 === scoreToWin
    if (gameData.gameState.teamPoints[x] + 1 === gameData.settings.scoresForWin[x]) {
      return true
    }
  }
  return false
}
