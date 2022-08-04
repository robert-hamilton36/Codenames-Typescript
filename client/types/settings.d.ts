import { Team, TeamPoints } from './gameState'

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  scoresForWin: TeamPoints,
  teams: Team[],
  voteSystem: 'individual-locksin'| 'vote' | 'spymaster-locksin'
}
