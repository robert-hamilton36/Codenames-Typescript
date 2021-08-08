import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { SelectedCardProvider, useSelectedCard } from '../SelectedCardContext'
import { beforeGameStartWordList as wordList } from '../../testing/mockdata/wordObjects'

test('provider should render with empty initial state', () => {
  const wrapper = ({ children }) => <SelectedCardProvider> {children} </SelectedCardProvider>
  const { result } = renderHook(() => useSelectedCard(), { wrapper })

  expect(result.current.selectedCard).toBeNull()
})

test('setSelectedCard should set a new card object as the value', () => {
  const wrapper = ({ children }) => <SelectedCardProvider> {children} </SelectedCardProvider>
  const { result } = renderHook(() => useSelectedCard(), { wrapper })

  expect(result.current.selectedCard).toBeNull()

  act(() => result.current.setSelectedCard(wordList[5]))

  expect(result.current.selectedCard).toEqual(wordList[5])
})

test('setSelectedCard the card already selected should deselect it', () => {
  const wrapper = ({ children }) => <SelectedCardProvider> {children} </SelectedCardProvider>
  const { result } = renderHook(() => useSelectedCard(), { wrapper })

  expect(result.current.selectedCard).toBeNull()

  act(() => result.current.setSelectedCard(wordList[5]))

  expect(result.current.selectedCard).toEqual(wordList[5])

  act(() => result.current.setSelectedCard(wordList[5]))

  expect(result.current.selectedCard).toBeNull()
})

test('setSelectedCard should change the card value to null', () => {
  const wrapper = ({ children }) => <SelectedCardProvider> {children} </SelectedCardProvider>
  const { result } = renderHook(() => useSelectedCard(), { wrapper })

  expect(result.current.selectedCard).toBeNull()

  act(() => result.current.setSelectedCard(wordList[5]))

  expect(result.current.selectedCard).toEqual(wordList[5])

  act(() => result.current.setSelectedCard(wordList[5]))

  expect(result.current.selectedCard).toBeNull()
})
