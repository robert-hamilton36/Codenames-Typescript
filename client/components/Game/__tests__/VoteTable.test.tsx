import React from 'react'
import { render } from '@testing-library/react'
import { VoteTable } from '../VoteTable'

import { makeVotesTable } from '../../../utility/makeVoteTable'

jest.mock('../../../utility/makeVoteTable')

const MockedMakeVotesTable = makeVotesTable as jest.Mock

MockedMakeVotesTable.mockReturnValue(<tr><td>Obi-Wan: skip</td></tr>)

test('should render with correct text and values', () => {
  const { getByTestId } = render(<VoteTable votes={[]}/>)

  const votesHeader = getByTestId('votesHeader')
  const votesBody = getByTestId('votesBody')

  expect(votesHeader.textContent).toBe('Votes')
  expect(votesBody.textContent).toBe('Obi-Wan: skip')
})
