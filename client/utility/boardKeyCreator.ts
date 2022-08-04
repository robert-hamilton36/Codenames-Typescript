import { shuffleArray } from './shuffleArray'

// this function creates a 25 item array which denotes whether a card is neutral, red, blue or assassin
export const boardKeyCreator = (teams = 8, assassin = 1, boardSize = 25): ReturnType => {
  const neutrals = boardSize - assassin - (teams * 2) - 1
  let red = teams
  let blue = teams
  // chooses which team goes first then increases that teams words by 1
  const firstTurnTeam: TeamReturn = Math.round(Math.random()) ? 'red' : 'blue'
  if (firstTurnTeam === 'red') {
    red++
  } else if (firstTurnTeam === 'blue') {
    blue++
  }

  let boardKey: CardIdentifier[] = Array(blue).fill('blue').concat(Array(red).fill('red')).concat(Array(assassin).fill('assassin')).concat(Array(neutrals).fill('neutral'))
  boardKey = shuffleArray(boardKey)
  return { boardKey, firstTurnTeam }
}

type TeamReturn = 'red' | 'blue'
type CardIdentifier = 'red' | 'blue' | 'assassin' | 'neutral'
type ReturnType = { firstTurnTeam: TeamReturn, boardKey: CardIdentifier[] }
