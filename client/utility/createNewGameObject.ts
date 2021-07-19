import { boardKeyCreator } from './boardKeyCreator'
// eslint-disable-next-line import/no-unresolved
import { User, GameInfo, TeamPoints, GameState } from '../types/gameState'

export const createGameObject = (user: User, teams: Teams, settings: Settings, listWords: string[]): GameInfo => {
  const { boardKey, firstTurnTeam } = boardKeyCreator()

  const scoresForWin = { red: 0, blue: 0 }
  const teamPoints: TeamPoints = { red: 0, blue: 0 }
  const messages = { general: [] }
  teams.map((team) => {
    if (team === firstTurnTeam) {
      scoresForWin[team] = 9
    } else {
      scoresForWin[team] = 8
    }
    teamPoints[team] = 0
    messages[team] = []
  })

  const boardObject = new Array(listWords.length)
  for (const x in listWords) {
    boardObject[x] = { index: parseInt(x), word: listWords[x], key: boardKey[x], revealed: false }
  }

  const newGameObject: GameInfo = {
    gameState: {
      gameStart: false,
      guesses: 0,
      teamPoints: teamPoints,
      teamTurn: firstTurnTeam,
      votes: [],
      words: boardObject
    },
    host: user,
    messages: messages,
    players: [{
      host: true,
      name: user.name,
      team: 'red',
      uid: user.uid
    }],
    settings: {
      teams: teams,
      scoresForWin: scoresForWin,
      ...settings
    }
  }

  return newGameObject
}

export const restartGameState = (listWords: string[], teams = ['red', 'blue']): RestartGameStateReturn => {
  const { boardKey, firstTurnTeam } = boardKeyCreator()
  const teamPoints: TeamPoints = { red: 0, blue: 0 }
  const scoresForWin: TeamPoints = { red: 0, blue: 0 }

  teams.map((team) => {
    if (team === firstTurnTeam) {
      scoresForWin[team] = 9
    } else {
      scoresForWin[team] = 8
    }
    teamPoints[team] = 0
  })

  const boardObject = new Array(listWords.length)
  for (const x in listWords) {
    boardObject[x] = { index: parseInt(x), word: listWords[x], key: boardKey[x], revealed: false }
  }

  const gameState: GameState = {
    gameStart: false,
    guesses: 0,
    teamPoints: teamPoints,
    teamTurn: firstTurnTeam,
    votes: [],
    words: boardObject
  }

  return { gameState, scoresForWin }
}

type RestartGameStateReturn = {
  gameState: GameState;
  scoresForWin: TeamPoints;
}

type Teams = ['red', 'blue']

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
