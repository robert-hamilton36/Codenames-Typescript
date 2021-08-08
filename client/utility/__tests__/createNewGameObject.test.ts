import { createGameObject } from '../createNewGameObject'
import { User, Settings } from '../../types/gameState'

const listWords = ['Africa',
  'Agent',
  'Air',
  'Alien',
  'Amazon',
  'Angel',
  'Antarctica',
  'Apple',
  'Arm',
  'Back',
  'Band',
  'Bank',
  'Bark',
  'Beach',
  'Belt',
  'Berlin',
  'Berry',
  'Board',
  'Bond',
  'Boom',
  'Bow',
  'Box',
  'Bug',
  'Canada',
  'Capital'
]

test('it', () => {
  const user = { name: 'test', uid: 'ddb1e1fc-debc-4a66-9686-be1042af90be' } as User
  const settings = { gameplayMode: 'individual', voteSystem: 'vote' } as Settings
  const gameInfo = createGameObject(user, settings, listWords)
  const gameState = gameInfo.gameState

  // expect(gameState.gameStart).toBeFalsy()
  // expect(gameState.guesses).toBe(0)
  // expect(gameState.teamPoints).toBe(0)
  // expect(['blue', 'red']).toContain(gameState.teamTurn)
  // expect(gameState.votes).toBe([])
  // expect(gameState.words)
})
