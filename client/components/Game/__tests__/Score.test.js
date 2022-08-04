import React from 'react'
import { render } from '@testing-library/react'
import { Score } from '../Score'

test('should render with correct values with an empty points object', () => {
  const teamPoints = {}
  const { getByTestId } = render(<Score teamPoints={teamPoints}/>)

  const redScore = getByTestId('redScore')
  const blueScore = getByTestId('blueScore')

  expect(redScore.textContent).toBe('Red: ')
  expect(blueScore.textContent).toBe('Blue: ')
})

test('should render with correct values when teams are 0 points', () => {
  const teamPoints = { red: 0, blue: 0 }
  const { getByTestId } = render(<Score teamPoints={teamPoints}/>)

  const redScore = getByTestId('redScore')
  const blueScore = getByTestId('blueScore')

  expect(redScore.textContent).toBe('Red: ' + teamPoints.red)
  expect(blueScore.textContent).toBe('Blue: ' + teamPoints.blue)
})

test('should render with correct values when teams have points', () => {
  const teamPoints = { red: 5, blue: 3 }
  const { getByTestId } = render(<Score teamPoints={teamPoints}/>)

  const redScore = getByTestId('redScore')
  const blueScore = getByTestId('blueScore')

  expect(redScore.textContent).toBe('Red: ' + teamPoints.red)
  expect(blueScore.textContent).toBe('Blue: ' + teamPoints.blue)
})
