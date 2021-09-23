import { User } from './user'

export interface GameState {
  gameStart: boolean
  guesses: number
  guessesLeft?: number
  hint?: Hint
  teamPoints: TeamPoints
  teamTurn: Team
  votes: VoteObject[]
  win?: Team
  words: WordList
}

export interface Hint {
  hint: string
  numberOfWords: number
}

export interface TeamPoints {
  blue: number
  red: number
}

export interface VoteObject {
  skip: boolean
  locked: boolean,
  player: User,
  wordObj?: WordObj
}

// todo make wordObjj nonoptional, so it will be null when not used

export interface WordObj{
  index: number
  key: 'neutral' | 'red' | 'blue' | 'assassin',
  revealed: boolean,
  word: string,
}

export type Team = 'red' | 'blue'

export interface WordList{
  0: WordObj
  1: WordObj
  2: WordObj
  3: WordObj
  4: WordObj
  5: WordObj
  6: WordObj
  7: WordObj
  8: WordObj
  9: WordObj
  10: WordObj
  11: WordObj
  12: WordObj
  13: WordObj
  14: WordObj
  15: WordObj
  16: WordObj
  17: WordObj
  18: WordObj
  19: WordObj
  20: WordObj
  21: WordObj
  22: WordObj
  23: WordObj
  24: WordObj
}
