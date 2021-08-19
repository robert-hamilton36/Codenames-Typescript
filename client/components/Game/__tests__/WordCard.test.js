import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { WordCard } from '../WordCard'

import { useSelectedCard } from '../../../contexts/SelectedCardContext'
import { useUserContext } from '../../../contexts/UserContext'

import { redSpymaster } from '../../../testing/mockdata/players'
import { wordListNoReveals } from '../../../testing/mockdata/wordObjects'

const parkWordObj = wordListNoReveals[0]

jest.mock('../../../contexts/SelectedCardContext')
jest.mock('../../../contexts/UserContext')

const selectedCard = wordListNoReveals[1]
const setSelectedCard = jest.fn()

beforeEach(() => {
  useSelectedCard.mockReturnValue({ selectedCard, setSelectedCard })
  useUserContext.mockReturnValue({ user: redSpymaster })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text and values', () => {
  const { getByTestId } = render(<WordCard word={parkWordObj}/>)

  const wordHeader = getByTestId('wordHeader')

  expect(wordHeader.textContent).toBe(parkWordObj.word)
})

test('should call correct function when the container div is clicked', () => {
  const { getByTestId } = render(<WordCard word={parkWordObj}/>)

  const wordContainer = getByTestId('wordContainer')

  expect(setSelectedCard).toHaveBeenCalledTimes(0)

  fireEvent.click(wordContainer)

  expect(setSelectedCard).toHaveBeenCalledTimes(1)
})
