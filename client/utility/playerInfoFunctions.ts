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

type Role = 'operative' | 'spymaster'
