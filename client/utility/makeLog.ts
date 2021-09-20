import { Hint, User, WordObj, UserHintLogEntry, UserGuessLogEntry, TeamGuessLogEntry, LogEntry } from '../types/gameState'

export const makeUserHintLog = (gameLogs: LogEntry[], user: User, hint: Hint): UserHintLogEntry => {
  const entryNum = gameLogs.length + 1
  return {
    type: 'user',
    entryNum,
    action: 'hint',
    user,
    hint
  } as UserHintLogEntry
}

export const makeUserGuessLog = (gameLog: LogEntry[], user: User, word?: WordObj): UserGuessLogEntry => {
  const entryNum = gameLog.length + 1
  let action
  if (word) {
    action = 'guess'
  } else {
    action = 'skip'
  }

  return {
    type: 'user',
    entryNum,
    action,
    user,
    word
  }
}

export const makeTeamGuessLog = (gameLog: LogEntry[], user: User, word?: WordObj): TeamGuessLogEntry => {
  const entryNum = gameLog.length + 1
  let action
  if (word) {
    action = 'guess'
  } else {
    action = 'skip'
  }
  return {
    type: 'team',
    entryNum,
    action,
    team: user.team,
    word
  } as TeamGuessLogEntry
}
