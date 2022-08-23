import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { MakeHint } from '../MakeHint'

import { useGameplayActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { useUserContext } from '../../../contexts/UserContext'

import { makeUserHintLog } from '../../../utility/makeLog'

import { redOperative } from '../../../testing/mockdata/players'
import { userGameLog } from '../../../testing/mockdata/gameLog'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')
jest.mock('../../../contexts/UserContext')

jest.mock('../../../utility/makeLog')

const MockedUseUserContext = useUserContext as jest.Mock
const MockedUseGameId = useGameId as jest.Mock
const MockedUseGameplayActions = useGameplayActions as jest.Mock
const MockedMakeUserHintLog = makeUserHintLog as jest.Mock

const setHint = jest.fn(() => Promise.resolve())

beforeEach(() => {
  jest.clearAllMocks()
  MockedUseUserContext.mockReturnValue({ user: redOperative })
  MockedUseGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
  MockedUseGameplayActions.mockReturnValue({ setHint: setHint })
  MockedMakeUserHintLog.mockReturnValue(userGameLog[2])
})

test('should render with correct text and values', () => {
  const { getByTestId } = render(<MakeHint gameLog={userGameLog}/>)

  const makeHintHeader = getByTestId('makeHintHeader')

  const hintLabel = getByTestId('hintLabel')
  const hintInput = getByTestId('hintInput') as HTMLInputElement

  const numberLabel = getByTestId('numberLabel')
  const noOfWordsInput = getByTestId('noOfWordsInput') as HTMLInputElement

  expect(makeHintHeader.textContent).toBe('Spymaster make a hint')

  expect(hintLabel.textContent).toBe('Hint')
  expect(hintInput.value).toBe('')

  expect(numberLabel.textContent).toBe('Number')
  expect(noOfWordsInput.value).toBe('0')
})

test('should display text in hint input when typed', () => {
  const { getByTestId } = render(<MakeHint gameLog={userGameLog}/>)

  const hintInput = getByTestId('hintInput') as HTMLInputElement

  expect(hintInput.value).toBe('')

  fireEvent.change(hintInput, { target: { value: 'Extinc' } })

  expect(hintInput.value).toBe('Extinc')
})

test('should display number in noOfWords input when entered', () => {
  const { getByTestId } = render(<MakeHint gameLog={userGameLog}/>)

  const noOfWordsInput = getByTestId('noOfWordsInput') as HTMLInputElement

  expect(noOfWordsInput.value).toBe('0')

  fireEvent.change(noOfWordsInput, { target: { value: '3' } })

  expect(noOfWordsInput.value).toBe('3')
})

test('should submit the correct infomation when the submit button is pressed', () => {
  const { getByTestId } = render(<MakeHint gameLog={userGameLog}/>)

  const hintInput = getByTestId('hintInput') as HTMLInputElement
  const noOfWordsInput = getByTestId('noOfWordsInput') as HTMLInputElement

  const submitButton = getByTestId('submitButton')

  expect(hintInput.value).toBe('')
  expect(noOfWordsInput.value).toBe('0')

  fireEvent.change(hintInput, { target: { value: 'Extinct' } })
  fireEvent.change(noOfWordsInput, { target: { value: '3' } })

  expect(hintInput.value).toBe('Extinct')
  expect(noOfWordsInput.value).toBe('3')

  expect(setHint).toHaveBeenCalledTimes(0)

  fireEvent.click(submitButton)

  expect(setHint).toHaveBeenCalledTimes(1)
  expect(setHint).toHaveBeenCalledWith('sUhCubsdZeKRsepPr9ag', { hint: 'Extinct', numberOfWords: 3 }, redOperative, userGameLog[2])
})
