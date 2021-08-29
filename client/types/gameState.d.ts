import firebase from 'firebase/app'
import Timestamp = firebase.firestore.Timestamp

interface GameInfo {
  gameState: GameState,
  host: User
  messages: Messages
  players: User[]
  settings: Settings
}

interface GameState {
  gameStart: boolean,
  guesses: number,
  guessesLeft?: number,
  hint?: Hint,
  teamPoints: TeamPoints,
  teamTurn: 'red' | 'blue',
  votes: VoteObject[],
  win?: Team,
  words: WordList,
}

interface Hint {
  hint: string,
  numberOfWords: number
}

interface TeamPoints {
  blue: number,
  red: number
}

interface VoteObject {
  skip: boolean
  locked: boolean,
  player: User,
  wordObj?: WordObj
}

// todo make wordObjj nonoptional, so it will be null when not used

interface WordObj{
  index: number
  key: 'neutral' | 'red' | 'blue' | 'assassin',
  revealed: boolean,
  word: string,
}

interface Messages {
  general: MessageObj[],
  blue?: MessageObj[],
  red?: MessageObj[]
}

interface MessageObj {
  message: string,
  time?: Timestamp,
  user: User
}

interface User {
  name: string,
  uid: string,
  host?: boolean,
  spymaster?: boolean,
  team?: TeamColour
}

type TeamColour = 'red' | 'blue'

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  scoresForWin: TeamPoints,
  teams: Team[],
  voteSystem: 'vote' | 'spymaster-locksin'
}

type Team = 'red' | 'blue'

type MessageTeams = 'red' | 'blue' | 'general'

interface WordList{
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
