import { boardKeyCreator } from './boardKeyCreator'

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})

test('default arguments creates correct boardKey with mocked Math.random at 0.5', () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
  const { boardKey, firstTurnTeam } = boardKeyCreator()
  const arrayRed = boardKey.filter(key => key === 'red')
  const arrayBlue = boardKey.filter(key => key === 'blue')
  const arrayAssasin = boardKey.filter(key => key === 'assassin')
  const arrayNeutral = boardKey.filter(key => key === 'neutral')

  expect(arrayRed).toHaveLength(9)
  expect(arrayBlue).toHaveLength(8)
  expect(arrayAssasin).toHaveLength(1)
  expect(arrayAssasin[0]).toBe('assassin')
  expect(arrayNeutral).toHaveLength(7)
  expect(boardKey).toHaveLength(25)
  expect(firstTurnTeam).toBe('red')
})

test('default arguments creates correct boardKey with mocked Math.random at 0.3', () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
  const { boardKey, firstTurnTeam } = boardKeyCreator()
  const arrayRed = boardKey.filter(key => key === 'red')
  const arrayBlue = boardKey.filter(key => key === 'blue')
  const arrayAssasin = boardKey.filter(key => key === 'assassin')
  const arrayNeutral = boardKey.filter(key => key === 'neutral')

  expect(arrayBlue).toHaveLength(9)
  expect(arrayRed).toHaveLength(8)
  expect(arrayAssasin).toHaveLength(1)
  expect(arrayAssasin[0]).toBe('assassin')
  expect(arrayNeutral).toHaveLength(7)
  expect(boardKey).toHaveLength(25)
  expect(firstTurnTeam).toBe('blue')
})

test('argument assassinNumber increases the correct amount of assassins in array', () => {
  const assassinNumber = 3
  const { boardKey } = boardKeyCreator(8, assassinNumber, 25)
  const arrayAssasin = boardKey.filter(key => key === 'assassin')
  expect(arrayAssasin).toHaveLength(assassinNumber)
})

test('argument boardSize increases the amount of words correctly', () => {
  const boardSize = 36
  const { boardKey } = boardKeyCreator(8, 1, boardSize)
  expect(boardKey).toHaveLength(boardSize)
})

test('argument teams increases the size of teams correctly', () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5)
  const teamSize = 10
  const { boardKey } = boardKeyCreator(teamSize)

  const arrayRed = boardKey.filter(key => key === 'red')
  const arrayBlue = boardKey.filter(key => key === 'blue')
  expect(arrayBlue).toHaveLength(10)
  expect(arrayRed).toHaveLength(11)
})
