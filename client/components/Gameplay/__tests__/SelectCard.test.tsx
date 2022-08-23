import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { SelectCard } from '../SelectCard'

import { useGuessActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useSelectedCard } from '../../../contexts/SelectedCardContext'
import { useUserContext } from '../../../contexts/UserContext'

import { makeUserGuessLog } from '../../../utility/makeLog'

import { wordListRedTeamWin } from '../../../testing/mockdata/wordObjects'
import { blueOperative, redOperative2 } from '../../../testing/mockdata/players'
import { userGameLog } from '../../../testing/mockdata/gameLog'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/SelectedCardContext')
jest.mock('../../../contexts/UserContext')
jest.mock('../../../utility/makeLog')

const MockedUseGuessActions = useGuessActions as jest.Mock
const MockedUseGameId = useGameId as jest.Mock
const MockedUseSelectedCard = useSelectedCard as jest.Mock
const MockedUseUserContext = useUserContext as jest.Mock
const MockedMakeUserGuessLog = makeUserGuessLog as jest.Mock

const makeGuess = jest.fn(() => Promise.resolve())
const endTurn = jest.fn(() => Promise.resolve())

const revealedWord = wordListRedTeamWin[0]
const unrevealedWord = wordListRedTeamWin[1]

beforeEach(() => {
  jest.clearAllMocks()
  MockedUseGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
  MockedUseGuessActions.mockReturnValue({ makeGuess: makeGuess, endTurn: endTurn })
})

test('should render with correct text and values with no card', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: null })
  MockedUseUserContext.mockReturnValue({ user: null })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const cardRevealedHeader = queryByTestId('cardRevealedHeader')
  const selectedWordheader = queryByTestId('selectedWordheader')
  const noSelectedcardHeader = queryByTestId('noSelectedcardHeader')

  const selectWordButton = queryByTestId('selectWordButton')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(cardRevealedHeader).toBeNull()
  expect(selectedWordheader).toBeNull()

  expect(selectWordButton).toBeNull()

  expect(noSelectedcardHeader).not.toBeNull()
  expect(noSelectedcardHeader.textContent).toBe('Select a card')

  expect(endTurnButton).not.toBeNull()
  expect(endTurnButton.textContent).toBe('End Turn')
})

test('should render with correct text and values with a card that is not revealed', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: unrevealedWord })
  MockedUseUserContext.mockReturnValue({ user: null })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const cardRevealedHeader = queryByTestId('cardRevealedHeader')
  const selectedWordheader = queryByTestId('selectedWordheader')
  const noSelectedcardHeader = queryByTestId('noSelectedcardHeader')

  const selectWordButton = queryByTestId('selectWordButton')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(cardRevealedHeader).toBeNull()
  expect(noSelectedcardHeader).toBeNull()

  expect(selectedWordheader).not.toBeNull()
  expect(selectedWordheader.textContent).toBe('Selected word: ' + unrevealedWord.word)

  expect(selectWordButton).not.toBeNull()
  expect(selectWordButton.textContent).toBe('Select Word')

  expect(endTurnButton).not.toBeNull()
  expect(endTurnButton.textContent).toBe('End Turn')
})

test('should render with correct text and values with a card that is revealed', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: revealedWord })
  MockedUseUserContext.mockReturnValue({ user: null })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const cardRevealedHeader = queryByTestId('cardRevealedHeader')
  const selectedWordheader = queryByTestId('selectedWordheader')
  const noSelectedcardHeader = queryByTestId('noSelectedcardHeader')

  const selectWordButton = queryByTestId('selectWordButton')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(selectedWordheader).toBeNull()
  expect(noSelectedcardHeader).toBeNull()

  expect(selectWordButton).toBeNull()
  expect(endTurnButton).toBeNull()

  expect(cardRevealedHeader).not.toBeNull()
  expect(cardRevealedHeader.textContent).toBe('This card is already revealed')
})

test('should fire the endTurn function with gameId when endTurnButton is clicked when no card is selected', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: null })
  MockedMakeUserGuessLog.mockReturnValue(userGameLog[2])
  MockedUseUserContext.mockReturnValue({ user: redOperative2 })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const noSelectedcardHeader = queryByTestId('noSelectedcardHeader')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(noSelectedcardHeader.textContent).toBe('Select a card')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(endTurn).toHaveBeenCalledTimes(0)

  fireEvent.click(endTurnButton)

  expect(noSelectedcardHeader.textContent).toBe('Select a card')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(endTurn).toHaveBeenCalledTimes(1)
  expect(endTurn).toHaveBeenCalledWith('sUhCubsdZeKRsepPr9ag', redOperative2, userGameLog[2])
})

test('should fire the makeGuess function with gameId & selectedCard.index when selectWordButton is clicked when card is not revealed', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: unrevealedWord })
  MockedMakeUserGuessLog.mockReturnValue(userGameLog[4])
  MockedUseUserContext.mockReturnValue({ user: blueOperative })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const selectedWordheader = queryByTestId('selectedWordheader')
  const selectWordButton = queryByTestId('selectWordButton')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(selectedWordheader.textContent).toBe('Selected word: ' + unrevealedWord.word)
  expect(selectWordButton.textContent).toBe('Select Word')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(makeGuess).toHaveBeenCalledTimes(0)

  fireEvent.click(selectWordButton)

  expect(selectedWordheader.textContent).toBe('Selected word: ' + unrevealedWord.word)
  expect(selectWordButton.textContent).toBe('Select Word')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(makeGuess).toHaveBeenCalledTimes(1)
  expect(makeGuess).toHaveBeenCalledWith('sUhCubsdZeKRsepPr9ag', unrevealedWord.index, blueOperative, userGameLog[4])
})

test('should fire the endTurn function with gameId & selectedCard.index when endTurnButton is clicked when card is not revealed', () => {
  MockedUseSelectedCard.mockReturnValue({ selectedCard: unrevealedWord })
  MockedMakeUserGuessLog.mockReturnValue(userGameLog[2])
  MockedUseUserContext.mockReturnValue({ user: redOperative2 })

  const { queryByTestId } = render(<SelectCard gameLog={[]}/>)

  const selectedWordheader = queryByTestId('selectedWordheader')
  const selectWordButton = queryByTestId('selectWordButton')
  const endTurnButton = queryByTestId('endTurnButton')

  expect(selectedWordheader.textContent).toBe('Selected word: ' + unrevealedWord.word)
  expect(selectWordButton.textContent).toBe('Select Word')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(endTurn).toHaveBeenCalledTimes(0)

  fireEvent.click(endTurnButton)

  expect(selectedWordheader.textContent).toBe('Selected word: ' + unrevealedWord.word)
  expect(selectWordButton.textContent).toBe('Select Word')
  expect(endTurnButton.textContent).toBe('End Turn')

  expect(endTurn).toHaveBeenCalledTimes(1)
  expect(endTurn).toHaveBeenCalledWith('sUhCubsdZeKRsepPr9ag', redOperative2, userGameLog[2])
})
