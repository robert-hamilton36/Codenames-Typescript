import { render } from '@testing-library/react'
import { functionTesting, makeGameLogJSX } from '../makeGameLogJSX'
import { redUserHintLog1, redUserGuessLog1, redUserSkipLog1, blueUserHintLog1, blueUserGuessLog1, redTeamGuessLog1, blueTeamGuessLog1, blueTeamSkipLog1 } from '../../testing/mockdata/gameLog'

const { makeUserHintEntryJSX, makeUserGuessEntryJSX, makeTeamGuessEntryJSX } = functionTesting

describe('tests makeUserHintEntryJSX function', () => {
  test('should create the correct html element when passed a UserHintLogEntry', () => {
    const logJSXElement = makeUserHintEntryJSX(redUserHintLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('Anakin gives hint starfighter 5')
  })
})

describe('tests makeUserGuessEntryJSX function', () => {
  test('should create the correct html element when passed a UserGuessLogEntry with a guess action', () => {
    const logJSXElement = makeUserGuessEntryJSX(redUserGuessLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('Emperor Palpatine taps x-wing')
  })

  test('should create the correct html element when passed a UserGuessLogEntry with a skip action', () => {
    const logJSXElement = makeUserGuessEntryJSX(redUserSkipLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('Darth Maul taps skip')
  })
})

describe('tests makeTeamGuessEntryJSX function', () => {
  test('should create the correct html element when passed a TeamGuessLogEntry with a guess action', () => {
    const logJSXElement = makeTeamGuessEntryJSX(blueTeamGuessLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('blue team taps skywalker')
  })

  test('should create the correct html element when passed a TeamGuessLogEntry with a skip action', () => {
    const logJSXElement = makeTeamGuessEntryJSX(blueTeamSkipLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('blue team taps skip')
  })
})

describe('tests makeGameLogJSX function', () => {
  test('should make the correct JSX Element when a UserHintLogEntry is passed', () => {
    const logJSXElement = makeGameLogJSX(blueUserHintLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('Obi Wan gives hint masters 0')
  })

  test('should make the correct JSX Element when a UserGuessEntry is passed', () => {
    const logJSXElement = makeGameLogJSX(blueUserGuessLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('Yoda taps skywalker')
  })

  test('should make the correct JSX Element when a TeamGuessLogEntry is passed', () => {
    const logJSXElement = makeGameLogJSX(redTeamGuessLog1)
    const { getByTestId } = render(logJSXElement)

    const list = getByTestId('li')
    expect(list.textContent).toBe('red team taps x-wing')
  })
})
