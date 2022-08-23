import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { WordList } from '../WordList'

import { shuffleArray } from '../../../utility/shuffleArray'
import { getWords } from '../../../contexts/FirebaseContext'

import { fullWordArray, firstWordArray, secondWordArray } from '../../../testing/mockdata/wordObjects'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../utility/shuffleArray')

const MockedGetWords = getWords as jest.Mock
const MockedShuffleArray = shuffleArray as jest.Mock

const MockedSetFinalWordList = jest.fn()

// todo find more elegant solution than recreating the function
// proplem is jest.mock is hoisted to top of file, so it is mocked for all tests, not the one test that needs it: 'should get a new list of words when new word button is pressed'
const realShuffleArray = (array) => {
  const NewArray = array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return NewArray
}

test('should render with correct text and values with no word list', () => {
  MockedGetWords.mockReturnValue([])
  MockedShuffleArray.mockImplementation(realShuffleArray)
  const { getByTestId } = render(<WordList setFinalWordList={MockedSetFinalWordList}/>)

  const wordList = getByTestId('wordList')
  const submitButton = getByTestId('submitButton')
  const getNewWordsButton = getByTestId('getNewWordsButton')

  expect(wordList.childElementCount).toBe(0)
  expect(submitButton.textContent).toBe('Submit')
  expect(getNewWordsButton.textContent).toBe('Get New Words')
})

test('should render with correct text and values with word list', () => {
  MockedGetWords.mockReturnValue(firstWordArray)
  MockedShuffleArray.mockImplementation(realShuffleArray)

  const { getByTestId } = render(<WordList setFinalWordList={MockedSetFinalWordList}/>)

  const wordList = getByTestId('wordList')
  const submitButton = getByTestId('submitButton')
  const getNewWordsButton = getByTestId('getNewWordsButton')

  // Probably unnecessary if Word.tsx is tested properly
  for (const x in firstWordArray) {
    expect(wordList.children[x].textContent).toBe(firstWordArray[x] + 'EditNew Word')
  }

  expect(submitButton.textContent).toBe('Submit')
  expect(getNewWordsButton.textContent).toBe('Get New Words')
})

test('should submit the correct word list when submit button is pressed', () => {
  const getFinalWordArray = jest.fn()
  MockedGetWords.mockReturnValue(firstWordArray)
  MockedShuffleArray.mockImplementation(realShuffleArray)

  const { getByTestId } = render(<WordList setFinalWordList={getFinalWordArray}/>)

  const submitButton = getByTestId('submitButton')

  fireEvent.click(submitButton)

  expect(getFinalWordArray).toHaveBeenCalledTimes(1)
  expect(getFinalWordArray.mock.calls[0][0]).toEqual(firstWordArray)
})

test('should get a new list of words when new word button is pressed', () => {
  const getFinalWordArray = jest.fn()
  MockedGetWords.mockReturnValue(fullWordArray)
  MockedShuffleArray.mockImplementationOnce((words) => words.slice(0, 25)).mockImplementationOnce((words) => words.slice(25, 50))

  const { getByTestId } = render(<WordList setFinalWordList={getFinalWordArray}/>)

  const getNewWordsButton = getByTestId('getNewWordsButton')

  const submitButton = getByTestId('submitButton')

  fireEvent.click(getNewWordsButton)
  fireEvent.click(submitButton)
  expect(getFinalWordArray).toHaveBeenCalledTimes(1)
  expect(getFinalWordArray.mock.calls[0][0]).toEqual(secondWordArray)
})
