import { boardKeyCreator } from './boardKeyCreator'
// eslint-disable-next-line import/no-unresolved
import { User, GameInfo, TeamPoints, GameState, WordList, Team } from '../types/gameState'

export const createGameObject = (user: User, settings: Settings, listWords: string[], teams = ['red', 'blue']): GameInfo => {
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

  // const boardObject = new Array(listWords.length)
  const boardObject = {}
  for (const x in listWords) {
    boardObject[x] = { word: listWords[x], key: boardKey[x], revealed: false, index: x }
  }

  const newGameObject: GameInfo = {
    gameState: {
      gameStart: false,
      guesses: 0,
      teamPoints: teamPoints,
      teamTurn: firstTurnTeam,
      votes: [],
      words: boardObject as WordList
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
      teams: teams as Team[],
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

  const boardObject = {}
  for (const x in listWords) {
    boardObject[x] = { word: listWords[x], key: boardKey[x], revealed: false }
  }

  const gameState: GameState = {
    gameStart: false,
    guesses: 0,
    teamPoints: teamPoints,
    teamTurn: firstTurnTeam,
    votes: [],
    words: boardObject as WordList
  }

  return { gameState, scoresForWin }
}

type RestartGameStateReturn = {
  gameState: GameState;
  scoresForWin: TeamPoints;
}

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
