import { GameInfo } from '../types/gameInfo'

import { gameIsTabletopMode } from '../utility/gameStateInfoFunctions'
import { bothTeamsHaveASpymasters, bothTeamsHaveAtLeastTwoPlayers } from '../utility/playerInfoFunctions'

export class GameStateValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'GameStateValidationError'
  }
}

export const validateGameStart = (gameData: GameInfo): boolean | string => {
  const spymasterArray = gameData.players.filter((player) => player.spymaster)
  const operativeArray = gameData.players.filter((player) => !player.spymaster)
  if (gameIsTabletopMode(gameData)) {
    if (spymasterArray.length === 0) {
      throw new GameStateValidationError('Need at least one spymaster device')
    }
    if (operativeArray.length === 0) {
      throw new GameStateValidationError('Need at least one operative device')
    }
    return true
  }

  if (!bothTeamsHaveASpymasters(gameData.players)) {
    throw new GameStateValidationError('Need two Spymasters')
  }

  if (!bothTeamsHaveAtLeastTwoPlayers(gameData.players)) {
    throw new GameStateValidationError('Needs at least two players per team')
  }
  return true
}
