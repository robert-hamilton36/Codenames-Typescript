import { Team } from '../types/gameState'
import { User } from '../types/user'

export const getOppositeTeamColour = (selectedPlayer: User): Team => {
  if (selectedPlayer.team === 'red') {
    return 'blue'
  }
  return 'red'
}

export const getOppositeRole = (selectedPlayer: User): Role => {
  if (selectedPlayer.spymaster) {
    return 'operative'
  }
  return 'spymaster'
}

export const bothTeamsHaveASpymasters = (players: User[]): boolean => {
  if (players.find(player => player.team === 'blue' && player.spymaster)) {
    if (players.find(player => player.team === 'red' && player.spymaster)) {
      return true
    }
  }

  return false
}

export const bothTeamsHaveAtLeastTwoPlayers = (players: User[]): boolean => {
  if (players.filter((player) => player.team === 'red').length >= 2) {
    if (players.filter((player) => player.team === 'blue').length >= 2) {
      return true
    }
  }

  return false
}

type Role = 'operative' | 'spymaster'
