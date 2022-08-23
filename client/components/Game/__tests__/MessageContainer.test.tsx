import React from 'react'
import { render } from '@testing-library/react'
import { MessageContainer } from '../MessageContainer'

import { Message } from '../Message'
import { messageDoItRedOperative, messageHelloThereBlueSpymaster, messageSandRedSpymaster } from '../../../testing/mockdata/messageObjects'

jest.mock('../Message')

const MockedMessage = Message as jest.Mock

MockedMessage.mockImplementation(({ messageObj, teamView }) => <p data-testid={'message' + messageObj.message + teamView}>{teamView + messageObj.message}</p>)

test('should render with correct text and values with no messages', () => {
  const messages = {
    red: [],
    blue: [],
    general: []
  }
  const { getByTestId } = render(<MessageContainer messages={messages} teamView='blue'/>)

  const messagesContainer = getByTestId('messagesContainer')

  expect(messagesContainer.textContent).toBe('')
})

test('should render with correct text and values with messages for all teams and teamView red', () => {
  const messages = {
    red: [messageSandRedSpymaster],
    blue: [messageHelloThereBlueSpymaster],
    general: [messageDoItRedOperative]
  }
  const { getByTestId } = render(<MessageContainer messages={messages} teamView='red'/>)

  const messagesContainer = getByTestId('messagesContainer')

  expect(messagesContainer.textContent).toBe('redI hate sand')
})

test('should render with correct text and values with messages for all teams and teamView blue', () => {
  const messages = {
    red: [messageSandRedSpymaster],
    blue: [messageHelloThereBlueSpymaster],
    general: [messageDoItRedOperative]
  }
  const { getByTestId } = render(<MessageContainer messages={messages} teamView='blue'/>)

  const messagesContainer = getByTestId('messagesContainer')

  expect(messagesContainer.textContent).toBe('blueHello There')
})

test('should render with correct text and values with messages for all teams and teamView general', () => {
  const messages = {
    red: [messageSandRedSpymaster],
    blue: [messageHelloThereBlueSpymaster],
    general: [messageDoItRedOperative]
  }
  const { getByTestId } = render(<MessageContainer messages={messages} teamView='general'/>)

  const messagesContainer = getByTestId('messagesContainer')

  expect(messagesContainer.textContent).toBe('generalDo it')
})
