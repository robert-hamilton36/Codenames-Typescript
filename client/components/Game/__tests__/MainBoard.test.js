import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { MainBoard } from '../MainBoard'

import { useGameplayActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useUserContext } from '../../../contexts/UserContext'

import { WordList } from '../../GetWords/WordList'
import { DisplayWordGrid } from '../DisplayWordGrid'

import { redHostSpymaster, redSpymaster } from '../../../testing/mockdata/players'
import { secondWordArray } from '../../../testing/mockdata/wordObjects'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/UserContext')

jest.mock('../../GetWords/WordList')
jest.mock('../DisplayWordGrid')

WordList.mockImplementation(({ setFinalWordList }) => <button data-testid='setFinalWordsButton' onClick={() => setFinalWordList(secondWordArray)}>Set Words</button>)
DisplayWordGrid.mockReturnValue(<div data-testid='displayWordListComponent'>Display Word List</div>)

const restartNewGame = jest.fn()

useGameplayActions.mockReturnValue({ restartNewGame })
useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })

test('should render DisplayWordGrid when game not won', () => {
  useUserContext.mockReturnValue({ user: redSpymaster })
  const gameData = {
    gameState: {
      win: false
    },
    words: {

    }
  }
  const { queryByTestId } = render(<MainBoard data={gameData}/>)

  const wordListDiv = queryByTestId('wordListDiv')
  const displayWordListComponent = queryByTestId('displayWordListComponent')
  const newGameButton = queryByTestId('newGameButton')

  expect(wordListDiv).toBeNull()
  expect(newGameButton).toBeNull()
  expect(displayWordListComponent).not.toBeNull()
  expect(displayWordListComponent.textContent).toBe('Display Word List')
})

test('should render DisplayWordGrid when game won but user not host', () => {
  useUserContext.mockReturnValue({ user: redSpymaster })
  const gameData = {
    gameState: {
      win: true
    },
    words: {

    }
  }
  const { queryByTestId } = render(<MainBoard data={gameData}/>)

  const wordListDiv = queryByTestId('wordListDiv')
  const displayWordListComponent = queryByTestId('displayWordListComponent')
  const newGameButton = queryByTestId('newGameButton')

  expect(wordListDiv).toBeNull()
  expect(newGameButton).toBeNull()
  expect(displayWordListComponent.textContent).toBe('Display Word List')
})

test('should render DisplayWordGrid when game not won but user host', () => {
  useUserContext.mockReturnValue({ user: redHostSpymaster })
  const gameData = {
    gameState: {
      win: false
    },
    words: {

    }
  }
  const { queryByTestId } = render(<MainBoard data={gameData}/>)

  const wordListDiv = queryByTestId('wordListDiv')
  const displayWordListComponent = queryByTestId('displayWordListComponent')
  const newGameButton = queryByTestId('newGameButton')

  expect(wordListDiv).toBeNull()
  expect(newGameButton).toBeNull()
  expect(displayWordListComponent.textContent).toBe('Display Word List')
})

test('should render with correct text and values when game won and user host', () => {
  useUserContext.mockReturnValue({ user: redHostSpymaster })
  const gameData = {
    gameState: {
      win: true
    },
    words: {

    }
  }
  const { queryByTestId } = render(<MainBoard data={gameData}/>)

  const wordListDiv = queryByTestId('wordListDiv')
  const displayWordListComponent = queryByTestId('displayWordListComponent')
  const newGameButton = queryByTestId('newGameButton')

  expect(newGameButton).toBeNull()
  expect(displayWordListComponent).toBeNull()
  expect(wordListDiv).not.toBeNull()

  expect(wordListDiv.textContent).toBe('Set Words')
})

test('should render DisplayWordGrid and create new game when game won, user is host and new words are chosen', () => {
  useUserContext.mockReturnValue({ user: redHostSpymaster })
  const gameData = {
    gameState: {
      win: true
    },
    words: {

    }
  }
  const { queryByTestId } = render(<MainBoard data={gameData}/>)

  let wordListDiv = queryByTestId('wordListDiv')
  let displayWordListComponent = queryByTestId('displayWordListComponent')
  let newGameButton = queryByTestId('newGameButton')
  let setFinalWordsButton = queryByTestId('setFinalWordsButton')

  expect(newGameButton).toBeNull()
  expect(displayWordListComponent).toBeNull()
  expect(wordListDiv).not.toBeNull()

  expect(wordListDiv.textContent).toBe('Set Words')
  expect(setFinalWordsButton.textContent).toBe('Set Words')

  fireEvent.click(setFinalWordsButton)

  wordListDiv = queryByTestId('wordListDiv')
  displayWordListComponent = queryByTestId('displayWordListComponent')
  newGameButton = queryByTestId('newGameButton')
  setFinalWordsButton = queryByTestId('setFinalWordsButton')

  expect(newGameButton).not.toBeNull()
  expect(displayWordListComponent).not.toBeNull()

  expect(newGameButton.textContent).toBe('Create new game')
  expect(displayWordListComponent.textContent).toBe('Display Word List')

  expect(wordListDiv).toBeNull()
})
