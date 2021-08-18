import React from 'react'
import { render } from '@testing-library/react'
import { Gameplay } from '../Gameplay'

import { useUserContext } from '../../../contexts/UserContext'
import { OperativeTurnActions } from '../OperativeTurnActions'
import { SpymasterTurnActions } from '../SpymasterTurnActions'

import { redSpymaster, blueSpymaster, redOperative, blueOperative } from '../../../testing/mockdata/players'
import { gameDataIndividualVotePreStart } from '../../../testing/mockdata/gameData'

jest.mock('../../../contexts/UserContext')
jest.mock('../OperativeTurnActions')
jest.mock('../SpymasterTurnActions')

beforeEach(() => {
  jest.clearAllMocks()

  OperativeTurnActions.mockReturnValue(<div data-testid='operativeTurnActions'>operativeTurnActions</div>)
  SpymasterTurnActions.mockReturnValue(<div data-testid='spymasterTurnActions'>spymasterTurnActions</div>)
})

test('should display wait for your turn message when users team is not the current teams turn, and user is spymaster', () => {
  useUserContext.mockReturnValue({ user: blueSpymaster })

  const { queryByTestId } = render(<Gameplay gameData={gameDataIndividualVotePreStart}/>)

  const operativeTurn = queryByTestId('operativeTurnActions')
  const spymasterTurn = queryByTestId('spymasterTurnActions')
  const waitForYourTurnHeader = queryByTestId('notYourTeamsTurnHeader')

  expect(operativeTurn).toBeNull()
  expect(spymasterTurn).toBeNull()
  expect(waitForYourTurnHeader).not.toBeNull()
  expect(waitForYourTurnHeader.textContent).toBe('Wait for your teams turn')
})

test('should display wait for your turn message when users team is not the current teams turn, and user is operative', () => {
  useUserContext.mockReturnValue({ user: blueOperative })

  const { queryByTestId } = render(<Gameplay gameData={gameDataIndividualVotePreStart}/>)

  const operativeTurn = queryByTestId('operativeTurnActions')
  const spymasterTurn = queryByTestId('spymasterTurnActions')
  const waitForYourTurnHeader = queryByTestId('notYourTeamsTurnHeader')

  expect(operativeTurn).toBeNull()
  expect(spymasterTurn).toBeNull()
  expect(waitForYourTurnHeader).not.toBeNull()
  expect(waitForYourTurnHeader.textContent).toBe('Wait for your teams turn')
})

test('should display spymasterTurnActions when user is spymaster is in the current teams turn', () => {
  useUserContext.mockReturnValue({ user: redSpymaster })

  const { queryByTestId } = render(<Gameplay gameData={gameDataIndividualVotePreStart}/>)

  const operativeTurn = queryByTestId('operativeTurnActions')
  const spymasterTurn = queryByTestId('spymasterTurnActions')
  const waitForYourTurnHeader = queryByTestId('notYourTeamsTurnHeader')

  expect(operativeTurn).toBeNull()
  expect(waitForYourTurnHeader).toBeNull()
  expect(spymasterTurn).not.toBeNull()
  expect(spymasterTurn.textContent).toBe('spymasterTurnActions')
})

test('should display operativeTurnActions when user is operative is in the current teams turn', () => {
  useUserContext.mockReturnValue({ user: redOperative })

  const { queryByTestId } = render(<Gameplay gameData={gameDataIndividualVotePreStart}/>)

  const operativeTurn = queryByTestId('operativeTurnActions')
  const spymasterTurn = queryByTestId('spymasterTurnActions')
  const waitForYourTurnHeader = queryByTestId('notYourTeamsTurnHeader')

  expect(waitForYourTurnHeader).toBeNull()
  expect(spymasterTurn).toBeNull()
  expect(operativeTurn).not.toBeNull()
  expect(operativeTurn.textContent).toBe('operativeTurnActions')
})
