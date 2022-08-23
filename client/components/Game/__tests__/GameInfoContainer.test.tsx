import React from 'react'
import { render } from '@testing-library/react'
import { GameInfoContainer } from '../GameInfoContainer'
import { Hint } from '../Hint'
import { gameDataIndividualVotePreStart, gameDataRedTeamWon, gameDataIndividualVoteStartNoHint } from '../../../testing/mockdata/gameData'

jest.mock('../Hint')
const MockedHint = Hint as jest.Mock

MockedHint.mockReturnValue(<div data-testid='hintComponent'>Hint</div>)

test('should render correct text and values when game is won', () => {
  const { queryByTestId } = render(<GameInfoContainer gameState={gameDataRedTeamWon.gameState}/>)

  const waitingHeader = queryByTestId('waitingHeader')
  const teamHasWonHeader = queryByTestId('teamHasWonHeader')
  const teamsTurnHeader = queryByTestId('teamsTurnHeader')
  const hintComponent = queryByTestId('hintComponent')

  expect(waitingHeader).toBeNull()
  expect(teamsTurnHeader).toBeNull()
  expect(hintComponent).toBeNull()

  expect(teamHasWonHeader).not.toBeNull()
  expect(teamHasWonHeader.textContent).toBe('Red team has won!')
})

test('should render correct text and values when game has not started', () => {
  const { queryByTestId } = render(<GameInfoContainer gameState={gameDataIndividualVotePreStart.gameState}/>)

  const waitingHeader = queryByTestId('waitingHeader')
  const teamHasWonHeader = queryByTestId('teamHasWonHeader')
  const teamsTurnHeader = queryByTestId('teamsTurnHeader')
  const hintComponent = queryByTestId('hintComponent')

  expect(teamHasWonHeader).toBeNull()
  expect(teamsTurnHeader).toBeNull()
  expect(hintComponent).toBeNull()

  expect(waitingHeader).not.toBeNull()
  expect(waitingHeader.textContent).toBe('Waiting for game to start')
})

test('should render correct text and values when game is on going', () => {
  const { queryByTestId } = render(<GameInfoContainer gameState={gameDataIndividualVoteStartNoHint.gameState}/>)

  const waitingHeader = queryByTestId('waitingHeader')
  const teamHasWonHeader = queryByTestId('teamHasWonHeader')
  const teamsTurnHeader = queryByTestId('teamsTurnHeader')
  const hintComponent = queryByTestId('hintComponent')

  expect(waitingHeader).toBeNull()
  expect(teamHasWonHeader).toBeNull()

  expect(teamsTurnHeader).not.toBeNull()
  expect(hintComponent).not.toBeNull()

  expect(teamsTurnHeader.textContent).toBe(gameDataIndividualVoteStartNoHint.gameState.teamTurn + "'s turn")
  expect(hintComponent.textContent).toBe('Hint')
  expect(Hint).toHaveBeenCalledTimes(1)
})
