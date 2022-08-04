import { LogEntry } from './gameLog'
import { GameState } from './gameState'
import { Messages } from './messages'
import { Settings } from './settings'
import { User } from './user'

export interface GameInfo {
  gameLog: LogEntry[]
  gameState: GameState
  host: User
  messages: Messages
  players: User[]
  settings: Settings
}
