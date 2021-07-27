import { validateGameStart, GameStateValidationError } from './gameStateValidations'

const basicGameState = {
  settings: {
    gameplayMode: '',
    voteSystem: 'vote'
  },
  players: []
}

const spyMaster1 = {
  host: true,
  name: 'Anakin',
  team: 'red',
  uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be',
  spymaster: 'true'
}

const spyMaster2 = {
  name: 'Obi Wan',
  team: 'blue',
  uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
  spymaster: 'true'
}

const operative1 = {
  name: 'Yoda',
  team: 'blue',
  uid: 'de98fbe6-d7e5-45ae-aae4-3dbc5002ad08'
}

const operative2 = {
  name: 'Palpatine',
  team: 'red',
  uid: 'a79d5e76-8653-45af-9579-b5eec8b47935'
}

const spymasterDevice = {
  host: true,
  name: 'Anakin',
  uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be',
  spymaster: 'true'
}

const operativeDevice = {
  name: 'Obi Wan',
  uid: '68e683be-27a1-4f06-868d-f0818cde8df5'
}

describe('tests for individual gameplayMode', () => {
  beforeEach(() => {
    basicGameState.settings.gameplayMode = 'individual'
    basicGameState.players.push(spyMaster1)
  })

  afterEach(() => {
    basicGameState.settings.gameplayMode = ''
    basicGameState.players = []
  })

  test('throws error in individual mode with only one spymaster', () => {
    expect(() => {
      validateGameStart(basicGameState)
    }).toThrow(new GameStateValidationError(('Need two Spymasters')))
  })

  test('throws error in individual mode with two spymaster, no other players', () => {
    basicGameState.players.push(spyMaster2)

    expect(() => {
      validateGameStart(basicGameState)
    }).toThrow(new GameStateValidationError(('Needs at least two players per team')))
  })

  test('throws error in individual mode with two spymaster, and one other player', () => {
    basicGameState.players.push(spyMaster2, operative1)

    expect(() => {
      validateGameStart(basicGameState)
    }).toThrow(new GameStateValidationError(('Needs at least two players per team')))
  })

  test('returns true for valid gameState', () => {
    basicGameState.players.push(spyMaster2, operative1, operative2)

    const isValidGame = validateGameStart(basicGameState)
    expect(isValidGame).toBe(true)
  })
})

describe('tests for tabletop gameplayMode', () => {
  beforeEach(() => {
    basicGameState.settings.gameplayMode = 'tabletop'
  })

  afterAll(() => {
    basicGameState.players = []
    basicGameState.settings.gameplayMode = ''
  })

  test('throws error in tabletop mode with no spymaster', () => {
    expect(() => {
      validateGameStart(basicGameState)
    }).toThrow(new GameStateValidationError(('Need at least one spymaster device')))
  })

  test('throws error in tabletop mode with only one spymaster', () => {
    basicGameState.players.push(spymasterDevice)
    expect(() => {
      validateGameStart(basicGameState)
    }).toThrow(new GameStateValidationError(('Need at least one operative device')))
  })

  test('returns true for valid gameState', () => {
    basicGameState.players.push(operativeDevice)

    const isValidGame = validateGameStart(basicGameState)
    expect(isValidGame).toBe(true)
  })
})
