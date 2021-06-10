import firebase from 'firebase/app'
import Timestamp = firebase.firestore.Timestamp

export interface GameState {
  gameState: GameState,
  messages: Messages
  host: User
  players: PlayerObject[]
  settings: Settings
}

export interface User {
  name: string,
  uid: string
}

interface GameState {
  gameStart: boolean,
  guesses: number,
  guessesLeft?: number,
  hint?: Hint,
  teamPoints: TeamPoints,
  teamTurn: 'Red' | 'Blue',
  votes: Votes,
  words: WordObj[],
}

interface Hint {
  hint: string,
  numberOfWords: number
}

interface TeamPoints {
  blue: number,
  red: number
}

interface Votes {
  locked: boolean,
  player: User,
  wordObj: WordObj
}

interface WordObj{
  key: 'Neutral' | 'Red' | 'Blue' | 'Assassin',
  revealed: boolean,
  word: string,
  index?: number
}

interface Messages {
  general: Message[],
  blue: Message[],
  red: Message[]
}

interface Message {
  message: string,
  time: Timestamp,
  user: PlayerObject
}

interface PlayerObject {
  name: string,
  uid: string
  team: TeamColour
  host?: boolean,
  spymaster?: boolean,
}

type TeamColour = 'Red' | 'Blue' | ''

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  scoresForWin: TeamPoints,
  voteSystem: 'vote' | 'spymaster-locksin',
  teams: string[]
}
