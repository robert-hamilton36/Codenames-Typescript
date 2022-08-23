import React from 'react'
import { render } from '@testing-library/react'
import { SpymasterTurnActions } from '../SpymasterTurnActions'
import { MakeHint } from '../MakeHint'
import { SelectCard } from '../SelectCard'
import { gameDataIndividualVoteStartNoHint, gameDataIndividualLocksinStartFirstHint, gameDataIndividualVoteStartFirstHint, gameDataIndividualSpymasterLocksinStartFirstHint } from '../../../testing/mockdata/gameData'

jest.mock('../MakeHint')
jest.mock('../SelectCard')

const MockedMakeHint = MakeHint as jest.Mock
const MockedSelectCard = SelectCard as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
  MockedMakeHint.mockReturnValue(<div data-testid='makeHintComponent'>MakeHint</div>)
  MockedSelectCard.mockReturnValue(<div data-testid='selectCardComponent'>SelectCard</div>)
})

test('should render MakeHint component when there is no hint', () => {
  const { queryByTestId } = render(<SpymasterTurnActions gameData={gameDataIndividualVoteStartNoHint}/>)

  const makeHintComponent = queryByTestId('makeHintComponent')
  const selectCardComponent = queryByTestId('selectCardComponent')
  const waitForVotesHeader = queryByTestId('waitForVotesHeader')

  expect(selectCardComponent).toBeNull()
  expect(waitForVotesHeader).toBeNull()
  expect(MakeHint).toHaveBeenCalledTimes(1)
  expect(makeHintComponent.textContent).toBe('MakeHint')
})

test('should render SelectCard component when there is a hint and game mode is spymaster-locksin', () => {
  const { queryByTestId } = render(<SpymasterTurnActions gameData={gameDataIndividualSpymasterLocksinStartFirstHint}/>)

  const makeHintComponent = queryByTestId('makeHintComponent')
  const selectCardComponent = queryByTestId('selectCardComponent')
  const waitForVotesHeader = queryByTestId('waitForVotesHeader')

  expect(makeHintComponent).toBeNull()
  expect(waitForVotesHeader).toBeNull()
  expect(SelectCard).toHaveBeenCalledTimes(1)
  expect(selectCardComponent.textContent).toBe('SelectCard')
})

test('should render the waitForVotesHeader when there is a hint and game mode is individuals vote', () => {
  const { queryByTestId } = render(<SpymasterTurnActions gameData={gameDataIndividualVoteStartFirstHint}/>)

  const makeHintComponent = queryByTestId('makeHintComponent')
  const selectCardComponent = queryByTestId('selectCardComponent')
  const waitForVotesHeader = queryByTestId('waitForVotesHeader')

  expect(makeHintComponent).toBeNull()
  expect(selectCardComponent).toBeNull()
  expect(waitForVotesHeader.textContent).toBe('Wait for team to lock-in votes')
})

test('should render the waitForVotesHeader when there is a hint and game mode is individual-locksin', () => {
  const { queryByTestId } = render(<SpymasterTurnActions gameData={gameDataIndividualLocksinStartFirstHint}/>)

  const makeHintComponent = queryByTestId('makeHintComponent')
  const selectCardComponent = queryByTestId('selectCardComponent')
  const waitForVotesHeader = queryByTestId('waitForVotesHeader')

  expect(makeHintComponent).toBeNull()
  expect(selectCardComponent).toBeNull()
  expect(waitForVotesHeader.textContent).toBe('Wait for team to lock-in votes')
})
