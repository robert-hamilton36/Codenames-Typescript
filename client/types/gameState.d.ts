import firebase from 'firebase/app'
import Timestamp = firebase.firestore.Timestamp

export interface GameInfo {
  gameState: GameState,
  host: User
  messages: Messages
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
  teamTurn: 'red' | 'blue',
  votes: Votes[],
  win?: Team,
  words: WordObj[],
}

interface Hint {
  hint: string,
  numberOfWords: number
}

export interface TeamPoints {
  blue: number,
  red: number
}

interface Votes {
  locked: boolean,
  player: User,
  wordObj: WordObj
}

interface WordObj{
  index?: number
  key: 'neutral' | 'red' | 'blue' | 'assassin',
  revealed: boolean,
  word: string,
}

interface Messages {
  general: MessageObj[],
  blue?: MessageObj[],
  red?: MessageObj[]
}

export interface MessageObj {
  message: string,
  time?: Timestamp,
  user: PlayerObject
}

interface PlayerObject {
  host?: boolean,
  name: string,
  spymaster?: boolean,
  team: TeamColour
  uid: string
}

type TeamColour = 'red' | 'blue' | undefined

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  scoresForWin: TeamPoints,
  teams: Team[],
  voteSystem: 'vote' | 'spymaster-locksin'
}

type Team = 'red' | 'blue'
