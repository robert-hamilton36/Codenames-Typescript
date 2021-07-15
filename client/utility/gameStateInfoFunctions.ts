import { GameInfo, PlayerObject } from '../types/gameState'

export const gameWon = (gameData: GameInfo): boolean => {
  if (gameData.gameState.win) {
    return true
  }
  return false
}

export const usersTeamsTurn = (gameData: GameInfo, user: PlayerObject): boolean => {
  if (gameData.gameState.teamTurn === user.team) {
    return true
  }
  return false
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

export const gamesCurrentTurnHasAHint = (gameData: GameInfo): boolean => {
  if (gameData.gameState.hint) {
    return true
  }
  return false
}

export const getCurrentTurnsSpymatersName = (gameData: GameInfo): PlayerObject => {
  console.log(gameData.players.find(player => player.team === gameData.gameState.teamTurn && player.spymaster))
  return gameData.players.find(player => player.team === gameData.gameState.teamTurn && player.spymaster)
}
