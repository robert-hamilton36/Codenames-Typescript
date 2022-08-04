import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { GameList } from '../GameList'

const gameList = ['aac73dca2105d5fe', '99c82ae54d7a83a6', 'bb528c8331cea0e5', '96a5b968e9236c16']

test('should render GameList with correct text and values', () => {
  const setGameToJoinMock = jest.fn(x => x)
  const { getByTestId } = render(<GameList games={gameList} setGameToJoin={setGameToJoinMock}/>)

  const li0 = getByTestId('li0')
  const li1 = getByTestId('li1')
  const li2 = getByTestId('li2')
  const li3 = getByTestId('li3')

  expect(li0.textContent).toBe('aac73dca2105d5feJoin Game')
  expect(li1.textContent).toBe('99c82ae54d7a83a6Join Game')
  expect(li2.textContent).toBe('bb528c8331cea0e5Join Game')
  expect(li3.textContent).toBe('96a5b968e9236c16Join Game')
})

test('should render nothing when games is empty', () => {
  const setGameToJoinMock = jest.fn(x => x)
  const { queryByTestId } = render(<GameList games={[]} setGameToJoin={setGameToJoinMock}/>)

  const li0 = queryByTestId('li0')

  expect(li0).toBeNull()
})

test('should call setGameToJoin with correct data', () => {
  const setGameToJoinMock = jest.fn(x => x)
  const { getByTestId } = render(<GameList games={gameList} setGameToJoin={setGameToJoinMock}/>)

  const button0 = getByTestId('button0')

  expect(button0.textContent).toBe('Join Game')

  fireEvent.click(button0)

  expect(setGameToJoinMock.mock.calls).toEqual([['aac73dca2105d5fe']])
})
