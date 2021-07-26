import { SetError } from '../contexts/ErrorContext'
import { GameInfo } from '../types/gameState'
import { gameIsTabletopMode } from './gameStateInfoFunctions'
import { bothTeamsHaveASpymasters, bothTeamsHaveAtLeastTwoPlayers } from './playerInfoFunctions'

export const validateStart = (gameData: GameInfo, setError: React.Dispatch<React.SetStateAction<string>>): boolean | string => {
  const spymasterArray = gameData.players.filter((player) => player.spymaster)
  if (gameIsTabletopMode(gameData)) {
    if (spymasterArray.length === 0) {
      setError('Need at least one spymaster device')
      return false
    }
  }

  if (!bothTeamsHaveASpymasters(gameData.players)) {
    setError('Need two Spymasters')
    return false
  }

  if (!bothTeamsHaveAtLeastTwoPlayers(gameData.players)) {
    setError('Needs at least two players per team')
    return false
  }
  return true
}

export const validateName = (name: string, setError: SetError): boolean => {
  if (name === '') {
    setError('Please enter a name')
    return false
  } else if (!/^[A-Z a-z]+$/.test(name)) {
    setError('Name can only contain letters')
    return false
  } else {
    return true
  }
}
