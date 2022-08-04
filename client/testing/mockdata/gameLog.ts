import { blueOperative, blueOperative2, blueSpymaster, redOperative, redOperative2, redSpymaster } from './players'
import { LogEntry, TeamGuessLogEntry, UserGuessLogEntry, UserHintLogEntry } from '../../types/gameLog'

export const redUserHintLog1: UserHintLogEntry = {
  type: 'user',
  entryNum: 1,
  user: redSpymaster,
  action: 'hint',
  hint: {
    hint: 'starfighter',
    numberOfWords: 5
  }
}

export const redUserGuessLog1: UserGuessLogEntry = {
  type: 'user',
  entryNum: 2,
  user: redOperative,
  action: 'guess',
  word: {
    key: 'red',
    revealed: false,
    word: 'x-wing',
    index: 14
  }
}

export const redUserSkipLog1: UserGuessLogEntry = {
  type: 'user',
  entryNum: 3,
  user: redOperative2,
  action: 'skip'
}

export const blueUserHintLog1: UserHintLogEntry = {
  type: 'user',
  entryNum: 4,
  user: blueSpymaster,
  action: 'hint',
  hint: {
    hint: 'masters',
    numberOfWords: 0
  }
}

export const blueUserGuessLog1: UserGuessLogEntry = {
  type: 'user',
  entryNum: 5,
  user: blueOperative,
  action: 'guess',
  word: {
    key: 'blue',
    revealed: false,
    word: 'skywalker',
    index: 12
  }
}

export const blueUserSkipLog1: UserGuessLogEntry = {
  type: 'user',
  entryNum: 6,
  user: blueOperative2,
  action: 'skip'
}

export const redTeamGuessLog1: TeamGuessLogEntry = {
  type: 'team',
  entryNum: 2,
  action: 'guess',
  team: 'red',
  word: {
    key: 'red',
    revealed: false,
    word: 'x-wing',
    index: 14
  }
}

export const redTeamSkipLog1: TeamGuessLogEntry = {
  type: 'team',
  team: 'red',
  entryNum: 3,
  action: 'skip'
}

export const blueTeamGuessLog1: TeamGuessLogEntry = {
  type: 'team',
  entryNum: 5,
  team: 'blue',
  action: 'guess',
  word: {
    key: 'blue',
    revealed: false,
    word: 'skywalker',
    index: 12
  }
}

export const blueTeamSkipLog1: TeamGuessLogEntry = {
  type: 'team',
  team: 'blue',
  entryNum: 6,
  action: 'skip'
}

export const userGameLog: LogEntry[] = [
  redUserHintLog1,
  redUserGuessLog1,
  redUserSkipLog1,
  blueUserHintLog1,
  blueUserGuessLog1
]

export const teamGameLog: LogEntry[] = [
  redUserHintLog1,
  redTeamGuessLog1,
  redTeamSkipLog1,
  blueUserHintLog1,
  blueTeamGuessLog1
]
