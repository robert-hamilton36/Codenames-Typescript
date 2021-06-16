import { shuffleArray } from './shuffleArray'

// this function creates a 25 item array which denotes whether a card is neutral, red, blue or assassin
export const boardKeyCreator: Return = (teams = 8, assassin = 1, boardSize = 25) => {
  const neutrals = boardSize - assassin - (teams * 2) - 1
  let red = teams
  let blue = teams
  // chooses which team goes first then increases that teams words by 1
  const firstTurnTeam: TeamReturn = Math.round(Math.random()) ? 'Red' : 'Blue'
  if (firstTurnTeam === 'Red') {
    red++
  } else if (firstTurnTeam === 'Blue') {
    blue++
  }

  let boardKey: CardIdentifier[] = Array(blue).fill('Blue').concat(Array(red).fill('Red')).concat(Array(assassin).fill('Assassin')).concat(Array(neutrals).fill('Neutral'))
  boardKey = shuffleArray(boardKey)
  return { boardKey, firstTurnTeam }
}

type TeamReturn = 'Red' | 'Blue'
type CardIdentifier = 'Red' | 'Blue' | 'Assassin' | 'Neutral'
type Return = (teams?: number, assassin?: number, boardSize?: number) => { firstTurnTeam: TeamReturn, boardKey: CardIdentifier[] }
