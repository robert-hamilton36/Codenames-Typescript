import React from 'react'
import { render } from '@testing-library/react'
import { PlayerList } from '../PlayerList'
import { HostOptions } from '../HostOptions'
import { useUserContext } from '../../../contexts/UserContext'
import { usePlayerSelectorDeselector } from '../../../hooks/useSelectorDeselector'
import { redSpymaster, blueSpymaster, redHostOperative, blueOperative } from '../../../testing/mockdata/players'

jest.mock('../../../contexts/UserContext')
jest.mock('../../../hooks/useSelectorDeselector')
jest.mock('../HostOptions')

HostOptions.mockReturnValue(<div data-testid='hostOptionsContainer'></div>)

test('should render with proper text and values when player list is empty', () => {
  useUserContext.mockReturnValue({})
  usePlayerSelectorDeselector.mockReturnValue([null, jest.mock()])

  const { getByTestId, queryByTestId } = render(<PlayerList playerList={[]}/>)

  const redHeader = getByTestId('redHeader')
  const blueHeader = getByTestId('blueHeader')

  const spymasterHeader = getByTestId('spymasterHeader')
  const operativeHeader = getByTestId('operativeHeader')

  const spymastersContainer = getByTestId('spymastersContainer')
  const operativesContainer = getByTestId('operativesContainer')

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(redHeader.textContent).toBe('Red')
  expect(blueHeader.textContent).toBe('Blue')

  expect(spymasterHeader.textContent).toBe('Spymasters')
  expect(operativeHeader.textContent).toBe('Operatives')

  expect(spymastersContainer.children).toHaveLength(0)
  expect(operativesContainer.children).toHaveLength(0)

  expect(hostOptionsContainer).toBeNull()
})

test('should render with proper text and values with four players', () => {
  useUserContext.mockReturnValue({})
  const { getByTestId, queryByTestId } = render(<PlayerList playerList={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const redHeader = getByTestId('redHeader')
  const blueHeader = getByTestId('blueHeader')

  const spymasterHeader = getByTestId('spymasterHeader')
  const operativeHeader = getByTestId('operativeHeader')

  const spymastersContainer = getByTestId('spymastersContainer')
  const operativesContainer = getByTestId('operativesContainer')

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(redHeader.textContent).toBe('Red')
  expect(blueHeader.textContent).toBe('Blue')

  expect(spymasterHeader.textContent).toBe('Spymasters')
  expect(operativeHeader.textContent).toBe('Operatives')

  expect(spymastersContainer.children).toHaveLength(1)
  expect(spymastersContainer.children[0].children[0].textContent).toBe(redSpymaster.name)
  expect(spymastersContainer.children[0].children[1].textContent).toBe(blueSpymaster.name)

  expect(operativesContainer.children).toHaveLength(1)
  expect(operativesContainer.children[0].children[0].textContent).toBe(redHostOperative.name)
  expect(operativesContainer.children[0].children[1].textContent).toBe(blueOperative.name)

  expect(hostOptionsContainer).toBeNull()
})

test('should not render host options when there is a selectedPlayer, but player is not host', () => {
  useUserContext.mockReturnValue({ user: blueOperative })
  usePlayerSelectorDeselector.mockReturnValue([redSpymaster, jest.mock()])

  const { queryByTestId } = render(<PlayerList playerList={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(hostOptionsContainer).toBeNull()
})

test('should render host options when there is a selectedPlayer and player is host', () => {
  useUserContext.mockReturnValue({ user: redHostOperative })
  usePlayerSelectorDeselector.mockReturnValue([redSpymaster, jest.mock()])

  const { queryByTestId } = render(<PlayerList playerList={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(hostOptionsContainer).not.toBeNull()
})
