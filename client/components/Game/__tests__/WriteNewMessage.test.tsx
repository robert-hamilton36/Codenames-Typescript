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

const MockedUseMessageActions = useMessageActions as jest.Mock
const MockedUseGameId = useGameId as jest.Mock
const MockedUseUserContext = useUserContext as jest.Mock

const promise = Promise.resolve()
const writeNewMessage = jest.fn(() => promise)

MockedUseMessageActions.mockReturnValue({ writeNewMessage })
MockedUseGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
MockedUseUserContext.mockReturnValue({ user: blueOperative })

test('should render with correct text and values', () => {
  const { getByTestId } = render(<WriteNewMessage teamView='red'/>)

  const newMessageInput = getByTestId('newMessageInput') as HTMLInputElement
  const submitButton = getByTestId('submitButton') as HTMLButtonElement

  expect(newMessageInput.textContent).toBe('')
  expect(submitButton.value).toBe('submit')
})

test('should display text in input when typed', () => {
  const { getByTestId } = render(<WriteNewMessage teamView='red'/>)

  const newMessageInput = getByTestId('newMessageInput') as HTMLInputElement
  expect(newMessageInput.textContent).toBe('')

  fireEvent.change(newMessageInput, { target: { value: 'Hello ther' } })

  expect(newMessageInput.value).toBe('Hello ther')
})

test('should fire function with correct arguments when submit is clicked', async () => {
  const teamView = 'general'

  const { getByTestId } = render(<WriteNewMessage teamView={teamView}/>)

  const newMessageInput = getByTestId('newMessageInput') as HTMLInputElement
  const submitButton = getByTestId('submitButton') as HTMLButtonElement

  expect(newMessageInput.textContent).toBe('')
  expect(submitButton.value).toBe('submit')

  fireEvent.change(newMessageInput, { target: { value: 'Hello ther' } })

  expect(newMessageInput.value).toBe('Hello ther')

  fireEvent.click(submitButton)

  expect(writeNewMessage).toHaveBeenCalledTimes(1)

  await act(() => promise)

  const messageObj = {
    message: 'Hello ther',
    user: blueOperative
  }

  expect(writeNewMessage).toHaveBeenCalledWith('7RVPD97JXBht7q1eFe8z', messageObj, teamView)
  expect(newMessageInput.textContent).toBe('')
})
