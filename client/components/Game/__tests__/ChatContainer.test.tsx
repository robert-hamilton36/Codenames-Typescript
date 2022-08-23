import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { ChatContainer } from '../ChatContainer'

import { MessageContainer } from '../MessageContainer'
import { WriteNewMessage } from '../WriteNewMessage'
import { useUserContext } from '../../../contexts/UserContext'
import { blueSpymaster } from '../../../testing/mockdata/players'
import { gameDataIndividualVotePreStart } from '../../../testing/mockdata/gameData'

jest.mock('../MessageContainer')
jest.mock('../WriteNewMessage')
jest.mock('../../../contexts/UserContext')

const MockedMessageContainer = MessageContainer as jest.Mock
const MockedWriteNewMessage = WriteNewMessage as jest.Mock
const MockedUseUserContext = useUserContext as jest.Mock

MockedMessageContainer.mockReturnValue(<div data-testid='messageContainer'>MessageContainer</div>)
MockedWriteNewMessage.mockReturnValue(<div data-testid='writeNewMessage'>WriteNewMessage</div>)
MockedUseUserContext.mockReturnValue({ user: blueSpymaster })

test('should render with corecct text and values', () => {
  const { getByTestId, queryByTestId } = render(<ChatContainer game={gameDataIndividualVotePreStart}/>)

  const header = getByTestId('header')
  const generalButton = queryByTestId('generalButton')
  const userTeamButton = queryByTestId('userTeamButton')

  const messageContainer = getByTestId('messageContainer')
  const writeNewMessage = getByTestId('writeNewMessage')

  expect(header.textContent).toBe('General chat')

  expect(generalButton).toBeNull()
  expect(userTeamButton).not.toBeNull()

  expect(userTeamButton.textContent).toBe('Blue')

  expect(messageContainer.textContent).toBe('MessageContainer')
  expect(writeNewMessage.textContent).toBe('WriteNewMessage')
})

test('should change the teamView when the userTeamButton is clicked', () => {
  const { getByTestId, queryByTestId } = render(<ChatContainer game={gameDataIndividualVotePreStart}/>)

  let header = getByTestId('header')
  let generalButton = queryByTestId('generalButton')
  let userTeamButton = queryByTestId('userTeamButton')

  expect(header.textContent).toBe('General chat')
  expect(generalButton).toBeNull()
  expect(userTeamButton).not.toBeNull()

  expect(userTeamButton.textContent).toBe('Blue')

  fireEvent.click(userTeamButton)

  header = getByTestId('header')
  generalButton = queryByTestId('generalButton')
  userTeamButton = queryByTestId('userTeamButton')

  expect(header.textContent).toBe('Blue chat')
  expect(generalButton).not.toBeNull()
  expect(userTeamButton).toBeNull()

  expect(generalButton.textContent).toBe('General')
})

test('should change the teamView when the generalButton is clicked', () => {
  const { getByTestId, queryByTestId } = render(<ChatContainer game={gameDataIndividualVotePreStart}/>)

  let header = getByTestId('header')
  let generalButton = queryByTestId('generalButton')
  let userTeamButton = queryByTestId('userTeamButton')

  expect(header.textContent).toBe('General chat')
  expect(generalButton).toBeNull()
  expect(userTeamButton).not.toBeNull()
  expect(userTeamButton.textContent).toBe('Blue')

  fireEvent.click(userTeamButton)

  header = getByTestId('header')
  generalButton = queryByTestId('generalButton')
  userTeamButton = queryByTestId('userTeamButton')

  expect(header.textContent).toBe('Blue chat')
  expect(generalButton).not.toBeNull()
  expect(userTeamButton).toBeNull()
  expect(generalButton.textContent).toBe('General')

  fireEvent.click(generalButton)

  header = getByTestId('header')
  generalButton = queryByTestId('generalButton')
  userTeamButton = queryByTestId('userTeamButton')

  expect(header.textContent).toBe('General chat')
  expect(generalButton).toBeNull()
  expect(userTeamButton).not.toBeNull()
  expect(userTeamButton.textContent).toBe('Blue')
})
