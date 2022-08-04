import { GameInfo } from '../types/gameInfo'
import { Team } from '../types/gameState'
import { User, TeamColour } from '../types/user'

export const gameWon = (gameData: GameInfo): boolean => {
  if (gameData.gameState.win) {
    return true
  }
  return false
}

export const usersTeamsTurn = (gameData: GameInfo, user: User): boolean => {
  if (gameData.gameState.teamTurn === user.team) {
    return true
  }
  return false
}

export const getNextTurnsTeam = (gameData: GameInfo): Team => {
  if (gameData.gameState.teamTurn === 'red') {
    return 'blue'
  }
  return 'red'
}

export const gameStarted = (gameData: GameInfo): boolean => {
  if (gameData.gameState.gameStart) {
    return true
  }
  return false
}

export const gameIsTabletopMode = (gameData: GameInfo): boolean => {
  if (gameData.settings.gameplayMode === 'tabletop') {
    return true
  }
  return false
}

export const gameIsIndividualMode = (gameData: GameInfo): boolean => {
  if (gameData.settings.gameplayMode === 'individual') {
    return true
  }
  return false
}

export const voteSystemIsSpymasterLocksIn = (gameData: GameInfo): boolean => {
  if (gameData.settings.voteSystem === 'spymaster-locksin') {
    return true
  }
  return false
}

export const voteSystemIsIndividualVote = (gameData: GameInfo): boolean => {
  if (gameData.settings.voteSystem === 'vote') {
    return true
  }
  return false
}

export const voteSystemIsIndividualLocksIn = (gameData: GameInfo): boolean => {
  if (gameData.settings.voteSystem === 'individual-locksin') {
    return true
  }
  return false
}

export const gamesCurrentTurnHasAHint = (gameData: GameInfo): boolean => {
  if (gameData.gameState.hint) {
    return true
  }
  return false
}

export const getCurrentTurnsSpymatersName = (gameData: GameInfo): User => {
  return gameData.players.find(player => player.team === gameData.gameState.teamTurn && player.spymaster)
}

export const getTeamForNewPlayer = (gameData: GameInfo): TeamColour => {
  let team: TeamColour
  if (gameData.settings.gameplayMode !== 'tabletop') {
    if (gameData.players.filter((person) => person.team === 'red').length <= gameData.players.filter((person) => person.team === 'blue').length) {
      team = 'red'
    } else {
      team = 'blue'
    }
  }
  return team
}
