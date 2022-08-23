import { createGameObject, Settings } from '../createNewGameObject'

import { boardKeyCreator } from '../boardKeyCreator'
import { boardKeyExample } from '../../testing/mockdata/boardKey'
import { firstWordArray, wordListNoReveals } from '../../testing/mockdata/wordObjects'
import { redHostOperative } from '../../testing/mockdata/players'

jest.mock('../boardKeyCreator')

const MockedBoardKeyCreator = boardKeyCreator as jest.Mock

MockedBoardKeyCreator.mockReturnValue({ boardKey: boardKeyExample, firstTurnTeam: 'red' })

test('should create the game object with correct values', () => {
  const settings: Settings = { gameplayMode: 'individual', voteSystem: 'vote' }
  const gameInfo = createGameObject(redHostOperative, settings, firstWordArray)
  const gameState = gameInfo.gameState

  expect(gameInfo.gameLog).toEqual([])

  expect(gameState.gameStart).toBeFalsy()
  expect(gameState.guesses).toBe(0)
  expect(gameState.teamPoints).toEqual({ red: 0, blue: 0 })
  expect(gameState.teamTurn).toBe('red')
  expect(gameState.votes).toEqual([])
  expect(gameState.words).toEqual(wordListNoReveals)

  expect(gameInfo.host).toEqual(redHostOperative)

  expect(gameInfo.messages).toEqual({ general: [], red: [], blue: [] })

  expect(gameInfo.players).toEqual([redHostOperative])

  expect(gameInfo.settings).toEqual({
    teams: ['red', 'blue'],
    scoresForWin: { red: 9, blue: 8 },
    ...settings
  })
})
