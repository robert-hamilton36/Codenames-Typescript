import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { ErrorProvider, useErrorContext } from '../ErrorContext'

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <ErrorProvider> {children} </ErrorProvider>
  const { result } = renderHook(() => useErrorContext(), { wrapper })

  expect(result.current.error).toBeNull()
})

test('setError should set a new error object as the value', () => {
  const wrapper = ({ children }) => <ErrorProvider> {children} </ErrorProvider>
  const { result } = renderHook(() => useErrorContext(), { wrapper })

  expect(result.current.error).toBeNull()

  act(() => result.current.setError(new Error('Garbage Compactor 3263827 is not meant to be on')))

  expect(result.current.error).toEqual(new Error('Garbage Compactor 3263827 is not meant to be on'))
  expect(result.current.error.message).toBe('Garbage Compactor 3263827 is not meant to be on')
})

test('setError should change a error value to null', () => {
  const wrapper = ({ children }) => <ErrorProvider> {children} </ErrorProvider>
  const { result } = renderHook(() => useErrorContext(), { wrapper })

  expect(result.current.error).toBeNull()

  act(() => result.current.setError(new Error('Garbage Compactor 3263827 is not meant to be on')))

  expect(result.current.error).toEqual(new Error('Garbage Compactor 3263827 is not meant to be on'))

  act(() => result.current.setError(null))
  expect(result.current.error).toBeNull()
})
