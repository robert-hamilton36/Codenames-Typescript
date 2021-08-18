import { VoteObject } from '../types/gameState'

export const userVotedForSkip = (vote: VoteObject): boolean => {
  if (vote?.skip) {
    return true
  }
  return false
}

export const userVotedForWord = (vote: VoteObject): boolean => {
  if (vote?.wordObj?.word) {
    return true
  }
  return false
}
