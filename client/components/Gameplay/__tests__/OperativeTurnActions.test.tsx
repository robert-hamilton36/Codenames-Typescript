import React from 'react'
import { render } from '@testing-library/react'
import { OperativeTurnActions } from '../OperativeTurnActions'
import { Vote } from '../Vote'
import { SelectCard } from '../SelectCard'
import { gameDataTabletopStartNoHint, gameDataIndividualVoteStartNoHint, gameDataIndividualVoteStartFirstHint, gameDataIndividualSpymasterLocksinStartFirstHint, gameDataIndividualLocksinStartFirstHint } from '../../../testing/mockdata/gameData'

jest.mock('../Vote')
jest.mock('../SelectCard')

const MockedVote = Vote as jest.Mock
const MockedSelectCard = SelectCard as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
  MockedVote.mockReturnValue(<div data-testid='voteComponent'>Vote</div>)
  MockedSelectCard.mockReturnValue(<div data-testid='selectCardComponent'>Select</div>)
})

test('should display tabletopModeOperativeHeader when game is tabletop mode', () => {
  const { queryByTestId } = render(<OperativeTurnActions gameData={gameDataTabletopStartNoHint}/>)

  const tabletopModeOperativeHeader = queryByTestId('tabletopModeOperativeHeader')
  const waitingForHintHeader = queryByTestId('waitingForHintHeader')
  const VoteComponent = queryByTestId('voteComponent')
  const SelectCardComponent = queryByTestId('selectCardComponent')
  const individualModeOperativeHeader = queryByTestId('individualModeOperativeHeader')

  expect(waitingForHintHeader).toBeNull()
  expect(Vote).toHaveBeenCalledTimes(0)
  expect(VoteComponent).toBeNull()
  expect(SelectCard).toHaveBeenCalledTimes(0)
  expect(SelectCardComponent).toBeNull()
  expect(individualModeOperativeHeader).toBeNull()

  expect(tabletopModeOperativeHeader.textContent).toBe('Deliberate with your team')
})

test('should display waitingForHintHeader when game has no hint', () => {
  const { queryByTestId } = render(<OperativeTurnActions gameData={gameDataIndividualVoteStartNoHint}/>)

  const tabletopModeOperativeHeader = queryByTestId('tabletopModeOperativeHeader')
  const waitingForHintHeader = queryByTestId('waitingForHintHeader')
  const VoteComponent = queryByTestId('voteComponent')
  const SelectCardComponent = queryByTestId('selectCardComponent')
  const individualModeOperativeHeader = queryByTestId('individualModeOperativeHeader')

  expect(tabletopModeOperativeHeader).toBeNull()
  expect(Vote).toHaveBeenCalledTimes(0)
  expect(VoteComponent).toBeNull()
  expect(SelectCard).toHaveBeenCalledTimes(0)
  expect(SelectCardComponent).toBeNull()
  expect(individualModeOperativeHeader).toBeNull()

  expect(waitingForHintHeader.textContent).toBe('Waiting for hint from Anakin')
})

test('should display vote component when game has a hint and is vote mode', () => {
  const { queryByTestId } = render(<OperativeTurnActions gameData={gameDataIndividualVoteStartFirstHint}/>)

  const tabletopModeOperativeHeader = queryByTestId('tabletopModeOperativeHeader')
  const waitingForHintHeader = queryByTestId('waitingForHintHeader')
  const VoteComponent = queryByTestId('voteComponent')
  const SelectCardComponent = queryByTestId('selectCardComponent')
  const individualModeOperativeHeader = queryByTestId('individualModeOperativeHeader')

  expect(tabletopModeOperativeHeader).toBeNull()
  expect(waitingForHintHeader).toBeNull()
  expect(SelectCard).toHaveBeenCalledTimes(0)
  expect(SelectCardComponent).toBeNull()
  expect(individualModeOperativeHeader).toBeNull()

  expect(Vote).toHaveBeenCalledTimes(1)
  expect(VoteComponent.textContent).toBe('Vote')
})

test('should display select card component when game has a hint and is individual-locksin mode', () => {
  const { queryByTestId } = render(<OperativeTurnActions gameData={gameDataIndividualLocksinStartFirstHint}/>)

  const tabletopModeOperativeHeader = queryByTestId('tabletopModeOperativeHeader')
  const waitingForHintHeader = queryByTestId('waitingForHintHeader')
  const VoteComponent = queryByTestId('voteComponent')
  const SelectCardComponent = queryByTestId('selectCardComponent')
  const individualModeOperativeHeader = queryByTestId('individualModeOperativeHeader')

  expect(tabletopModeOperativeHeader).toBeNull()
  expect(waitingForHintHeader).toBeNull()
  expect(Vote).toHaveBeenCalledTimes(0)
  expect(VoteComponent).toBeNull()
  expect(individualModeOperativeHeader).toBeNull()

  expect(SelectCard).toHaveBeenCalledTimes(1)
  expect(SelectCardComponent.textContent).toBe('Select')
})

test('should display individualModeOperativeHeader when game has a hint and is spymaster-locksin mode', () => {
  const { queryByTestId } = render(<OperativeTurnActions gameData={gameDataIndividualSpymasterLocksinStartFirstHint}/>)

  const tabletopModeOperativeHeader = queryByTestId('tabletopModeOperativeHeader')
  const waitingForHintHeader = queryByTestId('waitingForHintHeader')
  const VoteComponent = queryByTestId('voteComponent')
  const SelectCardComponent = queryByTestId('selectCardComponent')
  const individualModeOperativeHeader = queryByTestId('individualModeOperativeHeader')

  expect(tabletopModeOperativeHeader).toBeNull()
  expect(waitingForHintHeader).toBeNull()
  expect(Vote).toHaveBeenCalledTimes(0)
  expect(VoteComponent).toBeNull()
  expect(SelectCard).toHaveBeenCalledTimes(0)
  expect(SelectCardComponent).toBeNull()

  expect(individualModeOperativeHeader.textContent).toBe('Use chat to discuss and vote on word')
})
