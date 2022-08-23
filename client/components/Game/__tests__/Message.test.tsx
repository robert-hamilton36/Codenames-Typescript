import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Message } from '../Message'

import { useUserContext } from '../../../contexts/UserContext'
import { useMessageActions } from '../../../contexts/FirebaseContext'
import { useGameId } from '../../../contexts/GameIdContext'

import { blueHostOperative, redSpymaster } from '../../../testing/mockdata/players'
import { messageHelloThereBlueSpymaster, messageSandRedSpymaster } from '../../../testing/mockdata/messageObjects'

jest.mock('../../../contexts/UserContext')
jest.mock('../../../contexts/FirebaseContext')
jest.mock('../../../contexts/GameIdContext')

const MockedUseUserContext = useUserContext as jest.Mock
const MockedUseMessageActions = useMessageActions as jest.Mock
const MockedUseGameId = useGameId as jest.Mock

const deleteMessage = jest.fn(() => Promise.resolve())

beforeEach(() => {
  MockedUseUserContext.mockReturnValue({ user: redSpymaster })
  MockedUseMessageActions.mockReturnValue({ deleteMessage })
  MockedUseGameId.mockReturnValue({ gameId: '7RVPD97JXBht7q1eFe8z' })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('should render with correct text and values when message is not from user', () => {
  const { getByTestId, queryByTestId } = render(<Message messageObj={messageHelloThereBlueSpymaster} teamView='general'/>)

  const message = getByTestId('message')
  const deleteButton = queryByTestId('deleteButton')

  expect(message.textContent).toBe(messageHelloThereBlueSpymaster.user.name + ': ' + messageHelloThereBlueSpymaster.message)
  expect(deleteButton).toBeNull()
})

test('should render with delete button when user is host', () => {
  MockedUseUserContext.mockReturnValue({ user: blueHostOperative })
  const { getByTestId } = render(<Message messageObj={messageSandRedSpymaster} teamView='blue'/>)

  const message = getByTestId('message')
  const deleteButton = getByTestId('deleteButton')

  expect(message.textContent).toBe(messageSandRedSpymaster.user.name + ': ' + messageSandRedSpymaster.message)
  expect(deleteButton.textContent).toBe('Delete')
})

test('should render with delete button when message is from user', () => {
  const { getByTestId } = render(<Message messageObj={messageSandRedSpymaster} teamView='red'/>)

  const message = getByTestId('message')
  const deleteButton = getByTestId('deleteButton')

  expect(message.textContent).toBe(messageSandRedSpymaster.user.name + ': ' + messageSandRedSpymaster.message)
  expect(deleteButton.textContent).toBe('Delete')
})

test('should fire correct function when button is clicked', () => {
  const { getByTestId } = render(<Message messageObj={messageSandRedSpymaster} teamView='blue'/>)

  const deleteButton = getByTestId('deleteButton')

  expect(deleteButton.textContent).toBe('Delete')

  expect(deleteMessage).toHaveBeenCalledTimes(0)

  fireEvent.click(deleteButton)

  expect(deleteMessage).toHaveBeenCalledTimes(1)
  expect(deleteMessage).toHaveBeenCalledWith('7RVPD97JXBht7q1eFe8z', messageSandRedSpymaster, 'blue')
  // expect(deleteMessage.mock.calls[0][0]).toBe('7RVPD97JXBht7q1eFe8z')
  // expect(deleteMessage.mock.calls[0][1]).toEqual(messageSandRedSpymaster)
  // expect(deleteMessage.mock.calls[0][2]).toBe('Blue')
})
