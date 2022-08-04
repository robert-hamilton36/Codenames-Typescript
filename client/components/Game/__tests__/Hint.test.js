import React from 'react'
import { render } from '@testing-library/react'
import { Hint } from '../Hint'

import { gameDataIndividualVotePreStart, gameDataIndividualVoteStartFirstHint, gameDataIndividualVoteStartNoHint } from '../../../testing/mockdata/gameData'

test('should render correct text and values when there is a hint', () => {
  const gameState = gameDataIndividualVoteStartFirstHint.gameState
  const { queryByTestId } = render(<Hint gameState={gameState} />)

  const guessesLeftParagraph = queryByTestId('guessesLeftParagraph')
  const hintParagraph = queryByTestId('hintParagraph')
  const waitForHintHeader = queryByTestId('waitForHintHeader')
  const waitForGameStartHeader = queryByTestId('waitForGameStartHeader')

  expect(waitForHintHeader).toBeNull()
  expect(waitForGameStartHeader).toBeNull()

  expect(guessesLeftParagraph).not.toBeNull()
  expect(hintParagraph).not.toBeNull()

  expect(guessesLeftParagraph.textContent).toBe('Guesses left: ' + gameState.guessesLeft)
  expect(hintParagraph.textContent).toBe('Hint: ' + gameState.hint.hint + ' ' + gameState.hint.numberOfWords)
})

test('should render correct text and values when game has started but there is no hint', () => {
  const { queryByTestId } = render(<Hint gameState={gameDataIndividualVoteStartNoHint.gameState} />)

  const guessesLeftParagraph = queryByTestId('guessesLeftParagraph')
  const hintParagraph = queryByTestId('hintParagraph')
  const waitForHintHeader = queryByTestId('waitForHintHeader')
  const waitForGameStartHeader = queryByTestId('waitForGameStartHeader')

  expect(guessesLeftParagraph).toBeNull()
  expect(hintParagraph).toBeNull()
  expect(waitForGameStartHeader).toBeNull()

  expect(waitForHintHeader).not.toBeNull()
  expect(waitForHintHeader.textContent).toBe('Waiting for hint')
})

test("should render correct text and values when game hasn't started", () => {
  const { queryByTestId } = render(<Hint gameState={gameDataIndividualVotePreStart.gameState} />)

  const guessesLeftParagraph = queryByTestId('guessesLeftParagraph')
  const hintParagraph = queryByTestId('hintParagraph')
  const waitForHintHeader = queryByTestId('waitForHintHeader')
  const waitForGameStartHeader = queryByTestId('waitForGameStartHeader')

  expect(guessesLeftParagraph).toBeNull()
  expect(hintParagraph).toBeNull()
  expect(waitForHintHeader).toBeNull()

  expect(waitForGameStartHeader).not.toBeNull()
  expect(waitForGameStartHeader.textContent).toBe('Waiting for game start')
})
