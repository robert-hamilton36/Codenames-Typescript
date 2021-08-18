import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { MakeHint } from '../MakeHint'

import { useGameplayActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')

const setHint = jest.fn(() => Promise.resolve())

beforeEach(() => {
  jest.clearAllMocks()
  useGameId.mockReturnValue({ gameId: 'sUhCubsdZeKRsepPr9ag' })
  useGameplayActions.mockReturnValue({ setHint: setHint })
})

test('should render with correct text and values', () => {
  const { getByTestId } = render(<MakeHint />)

  const makeHintHeader = getByTestId('makeHintHeader')

  const hintLabel = getByTestId('hintLabel')
  const hintInput = getByTestId('hintInput')

  const numberLabel = getByTestId('numberLabel')
  const noOfWordsInput = getByTestId('noOfWordsInput')

  expect(makeHintHeader.textContent).toBe('Spymaster make a hint')

  expect(hintLabel.textContent).toBe('Hint')
  expect(hintInput.value).toBe('')

  expect(numberLabel.textContent).toBe('Number')
  expect(noOfWordsInput.value).toBe('0')
})

test('should display text in hint input when typed', () => {
  const { getByTestId } = render(<MakeHint />)

  const hintInput = getByTestId('hintInput')

  expect(hintInput.value).toBe('')

  fireEvent.change(hintInput, { target: { value: 'Extinc' } })

  expect(hintInput.value).toBe('Extinc')
})

test('should display number in noOfWords input when entered', () => {
  const { getByTestId } = render(<MakeHint />)

  const noOfWordsInput = getByTestId('noOfWordsInput')

  expect(noOfWordsInput.value).toBe('0')

  fireEvent.change(noOfWordsInput, { target: { value: '3' } })

  expect(noOfWordsInput.value).toBe('3')
})

test('should submit the correct infomation when the submit button is pressed', () => {
  const { getByTestId } = render(<MakeHint />)

  const hintInput = getByTestId('hintInput')
  const noOfWordsInput = getByTestId('noOfWordsInput')

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
  expect(setHint.mock.calls[0][0]).toBe('sUhCubsdZeKRsepPr9ag')
  expect(setHint.mock.calls[0][1]).toEqual({ hint: 'Extinct', numberOfWords: 3 })
})
