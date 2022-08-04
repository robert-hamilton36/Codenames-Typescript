import { Hint, WordObj } from './gameState'
import { User, TeamColour } from './user'

export type LogEntry = UserHintLogEntry | UserGuessLogEntry | TeamGuessLogEntry

export interface UserHintLogEntry {
  type: 'user'
  entryNum: number
  action: 'hint'
  user: User
  hint: Hint
}
export interface UserGuessLogEntry {
  type: 'user'
  entryNum: number
  action: 'guess' |'skip'
  user: User
  word?: WordObj
}

export interface TeamGuessLogEntry {
  type: 'team'
  entryNum: number
  action: 'guess' |'skip'
  team: TeamColour
  word?: WordObj
}
