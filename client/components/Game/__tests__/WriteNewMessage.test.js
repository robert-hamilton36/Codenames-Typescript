import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { WriteNewMessage } from '../WriteNewMessage'
import { useMessageActions } from '../../../contexts/FirebaseContext'
import { useUserContext } from '../../../contexts/UserContext'
import { useGameId } from '../../../contexts/GameIdContext'
import { blueOperative } from '../../../testing/mockdata/players'
import { act } from 'react-dom/test-utils'

jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/UserContext')
jest.mock('../../../contexts/GameIdContext')

const promise = Promise.resolve()
const writeNewMessage = jest.fn(() => promise)

useMessageActions.mockReturnValue({ writeNewMessage })
useGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
useUserContext.mockReturnValue({ user: blueOperative })

test('should render with correct text and values', () => {
  const { getByTestId } = render(<WriteNewMessage />)

  const newMessageInput = getByTestId('newMessageInput')
  const submitButton = getByTestId('submitButton')

  expect(newMessageInput.textContent).toBe('')
  expect(submitButton.value).toBe('submit')
})

test('should display text in input when typed', () => {
  const { getByTestId } = render(<WriteNewMessage />)

  const newMessageInput = getByTestId('newMessageInput')
  expect(newMessageInput.textContent).toBe('')

  fireEvent.change(newMessageInput, { target: { value: 'Hello ther' } })

  expect(newMessageInput.value).toBe('Hello ther')
})

test('should fire function with correct arguments when submit is clicked', async () => {
  const teamView = 'General'

  const { getByTestId } = render(<WriteNewMessage teamView={teamView}/>)

  const newMessageInput = getByTestId('newMessageInput')
  const submitButton = getByTestId('submitButton')

  expect(newMessageInput.textContent).toBe('')
  expect(submitButton.value).toBe('submit')

  fireEvent.change(newMessageInput, { target: { value: 'Hello ther' } })

  expect(newMessageInput.value).toBe('Hello ther')

  fireEvent.click(submitButton)

  expect(writeNewMessage).toHaveBeenCalledTimes(1)
  await act(() => promise)
  expect(writeNewMessage.mock.calls[0][0]).toBe('7RVPD97JXBht7q1eFe8z')
  expect(writeNewMessage.mock.calls[0][1].message).toBe('Hello ther')
  expect(writeNewMessage.mock.calls[0][1].user).toEqual(blueOperative)
  expect(writeNewMessage.mock.calls[0][2]).toBe(teamView)

  expect(newMessageInput.textContent).toBe('')
})
