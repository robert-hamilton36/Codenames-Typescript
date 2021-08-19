import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { StartGameButton } from '../StartGameButton'

import { useGameplayActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useErrorContext } from '../../../contexts/ErrorContext'

import { gameDataIndividualVotePreStart } from '../../../testing/mockdata/gameData'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/ErrorContext')

const startGame = jest.fn(() => Promise.resolve())
const setError = jest.fn()

beforeEach(() => {
  useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
  useGameplayActions.mockReturnValue({ startGame })
  useErrorContext.mockReturnValue({ setError })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render correct text and values', () => {
  const { getByTestId } = render(<StartGameButton gameInfo={gameDataIndividualVotePreStart}/>)

  const startGameButton = getByTestId('startGameButton')

  expect(startGameButton.textContent).toBe('Start Game')
})

test('should call correct function, startGame, when startButton is clicked with valid data', () => {
  const { getByTestId } = render(<StartGameButton gameInfo={gameDataIndividualVotePreStart}/>)

  const startGameButton = getByTestId('startGameButton')

  expect(startGameButton.textContent).toBe('Start Game')
  expect(startGame).toHaveBeenCalledTimes(0)
  expect(setError).toHaveBeenCalledTimes(0)

  fireEvent.click(startGameButton)

  expect(startGame).toHaveBeenCalledTimes(1)
  expect(setError).toHaveBeenCalledTimes(0)
})

test('should call correct function, setError, when startButton is clicked with invalid data', () => {
  const gameInfo = {
    players: [],
    settings: {

    }
  }
  const { getByTestId } = render(<StartGameButton gameInfo={gameInfo}/>)

  const startGameButton = getByTestId('startGameButton')

  expect(startGameButton.textContent).toBe('Start Game')
  expect(setError).toHaveBeenCalledTimes(0)
  expect(startGame).toHaveBeenCalledTimes(0)

  fireEvent.click(startGameButton)

  expect(startGame).toHaveBeenCalledTimes(0)
  expect(setError).toHaveBeenCalledTimes(1)
})
