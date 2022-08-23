import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { GameIdProvider, useGameId } from '../GameIdContext'

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <GameIdProvider> {children} </GameIdProvider>
  const { result } = renderHook(() => useGameId(), { wrapper })

  expect(result.current.gameId).toBe('')
})

test('should change gameId when setGameId is used', () => {
  const wrapper = ({ children }) => <GameIdProvider> {children} </GameIdProvider>
  const { result } = renderHook(() => useGameId(), { wrapper })

  expect(result.current.gameId).toBe('')

  act(() => result.current.setGameId('qSFmktedtT4qraW2LbCl'))

  expect(result.current.gameId).toBe('qSFmktedtT4qraW2LbCl')
})

test('should change gameId to an empty string', () => {
  const wrapper = ({ children }) => <GameIdProvider> {children} </GameIdProvider>
  const { result } = renderHook(() => useGameId(), { wrapper })

  expect(result.current.gameId).toBe('')

  act(() => result.current.setGameId('qSFmktedtT4qraW2LbCl'))

  expect(result.current.gameId).toBe('qSFmktedtT4qraW2LbCl')

  act(() => result.current.setGameId(''))
  expect(result.current.gameId).toBe('')
})
