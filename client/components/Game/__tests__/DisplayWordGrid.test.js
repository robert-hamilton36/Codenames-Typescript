import React from 'react'
import { render } from '@testing-library/react'
import { DisplayWordGrid } from '../DisplayWordGrid'

import { WordCard } from '../WordCard'

import { wordListNoReveals } from '../../../testing/mockdata/wordObjects'

jest.mock('../WordCard')

WordCard.mockImplementation(({ word }) => <div data-testid={word.word}>{word.word}</div>)

test('should render correct text and values when game is won', () => {
  const { getByTestId } = render(<DisplayWordGrid wordList={wordListNoReveals}/>)

  const board = getByTestId('board')
  const queries = []

  let wordString = ''

  for (const x in wordListNoReveals) {
    queries.push(getByTestId(wordListNoReveals[x].word))
    wordString += wordListNoReveals[x].word
  }

  for (const x in wordListNoReveals) {
    expect(queries[x].textContent).toBe(wordListNoReveals[x].word)
  }

  expect(board.textContent).toBe(wordString)
})

// todo: ?remove this test is it actually useful?
