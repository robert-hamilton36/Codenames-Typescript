import { PlayerObject, Team } from '../types/gameState'

export const getOppositeTeamColour = (selectedPlayer: PlayerObject): Team => {
  if (selectedPlayer.team === 'red') {
    return 'blue'
  }
  return 'red'
}

export const getOppositeRole = (selectedPlayer: PlayerObject): Role => {
  if (selectedPlayer.spymaster) {
    return 'operative'
  }
  return 'spymaster'
}

export const bothTeamsHaveASpymasters = (players: PlayerObject[]): boolean => {
  if (players.find(player => player.team === 'blue' && player.spymaster)) {
    if (players.find(player => player.team === 'red' && player.spymaster)) {
      return true
    }
  }

  return false
}

export const bothTeamsHaveAtLeastTwoPlayers = (players: PlayerObject[]): boolean => {
  if (players.filter((player) => player.team === 'red').length >= 2) {
    if (players.filter((player) => player.team === 'blue').length >= 2) {
      return true
    }
  }

  return false
}

type Role = 'operative' | 'spymaster'
