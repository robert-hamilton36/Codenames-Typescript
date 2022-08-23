import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { ToasterProvider, useToaster } from '../ToasterContext'

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <ToasterProvider> {children} </ToasterProvider>
  const { result } = renderHook(() => useToaster(), { wrapper })

  expect(result.current.toaster).toBeNull()
})

test('setToaster should set a new toaster object as the value', () => {
  const wrapper = ({ children }) => <ToasterProvider> {children} </ToasterProvider>
  const { result } = renderHook(() => useToaster(), { wrapper })

  expect(result.current.toaster).toBeNull()

  act(() => result.current.setToaster({ type: 'Error', message: "Aren't we meant to be going up" }))

  expect(result.current.toaster.type).toBe('Error')
  expect(result.current.toaster.message).toBe("Aren't we meant to be going up")
})

test('setToaster should change a toaster object to null', () => {
  const wrapper = ({ children }) => <ToasterProvider> {children} </ToasterProvider>
  const { result } = renderHook(() => useToaster(), { wrapper })

  expect(result.current.toaster).toBeNull()

  act(() => result.current.setToaster({ type: 'Error', message: "Aren't we meant to be going up" }))

  expect(result.current.toaster.type).toBe('Error')
  expect(result.current.toaster.message).toBe("Aren't we meant to be going up")

  act(() => result.current.setToaster(null))

  expect(result.current.toaster).toBeNull()
})
