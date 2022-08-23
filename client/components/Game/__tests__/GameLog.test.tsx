import React from 'react'
import { render } from '@testing-library/react'
import { GameLog } from '../GameLog'

import { makeGameLogJSX } from '../../../utility/makeGameLogJSX'

import { userGameLog } from '../../../testing/mockdata/gameLog'

jest.mock('../../../utility/makeGameLogJSX')

const MockedMakeGameLogJSX = makeGameLogJSX as jest.Mock

MockedMakeGameLogJSX.mockImplementation(log => {
  return (
    <li key={log.entryNum} data-testid={log.entryNum}>
      {log.entryNum}
    </li>
  )
})

test('should render with an empty gameLog', () => {
  const { getByTestId } = render(<GameLog gameLog={[]}/>)

  const gameLogHeader = getByTestId('gameLogHeader')
  const gameLogList = getByTestId('gameLogList')

  expect(gameLogHeader.textContent).toBe('Game log')
  expect(gameLogList.textContent).toBe('')
})

test('should render with a gameLog', () => {
  const { getByTestId } = render(<GameLog gameLog={userGameLog}/>)

  const gameLogHeader = getByTestId('gameLogHeader')
  const gameLogList = getByTestId('gameLogList')

  expect(gameLogHeader.textContent).toBe('Game log')
  expect(gameLogList.textContent).toBe('12345')
})
