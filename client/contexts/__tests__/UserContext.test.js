import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { UserProvider, useUserContext } from '../UserContext'

import { redSpymaster } from '../../testing/mockdata/players'

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.name).toBe('')
  expect(result.current.user.uid).toBe('')
})

test('should change name when userActions.setUser is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.name).toBe('')

  act(() => result.current.userActions.setUser('Anakin'))

  expect(result.current.user.name).toBe('Anakin')
  expect(result.current.user.uid).not.toBe('')
})

test('should reset name and uid to empty string when setUser is passed an empty name', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.name).toBe('')

  act(() => result.current.userActions.setUser('Anakin'))

  expect(result.current.user.name).toBe('Anakin')
  expect(result.current.user.uid).not.toBe('')

  act(() => result.current.userActions.setUser(''))

  expect(result.current.user.name).toBe('')
  expect(result.current.user.uid).toBe('')
})

test('should reset name and uid to empty string when userActions.deleteUser is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.name).toBe('')

  act(() => result.current.userActions.setUser('Anakin'))

  expect(result.current.user.name).toBe('Anakin')
  expect(result.current.user.uid).not.toBe('')

  act(() => result.current.userActions.deleteUser())

  expect(result.current.user.name).toBe('')
  expect(result.current.user.uid).toBe('')
})

test('should make user spymaster when userActions.setSpymaster is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.spymaster).toBeUndefined()

  act(() => result.current.userActions.setSpymaster(true))

  expect(result.current.user.spymaster).toBe(true)
})

test('should remove spymaster from user when userActions.setSpymaster is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.spymaster).toBeUndefined()

  act(() => result.current.userActions.setSpymaster(true))

  expect(result.current.user.spymaster).toBe(true)

  act(() => result.current.userActions.setSpymaster(false))

  expect(result.current.user.spymaster).toBe(false)
})

test('should make user host when userActions.setHost is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.host).toBeUndefined()

  act(() => result.current.userActions.setHost(true))

  expect(result.current.user.host).toBe(true)
})

test('should remove host from user when userActions.setHost is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.host).toBeUndefined()

  act(() => result.current.userActions.setHost(true))

  expect(result.current.user.host).toBe(true)

  act(() => result.current.userActions.setHost(false))

  expect(result.current.user.host).toBe(false)
})

test('should put user on red team when userActions.setTeam is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.team).toBeUndefined()

  act(() => result.current.userActions.setTeam('red'))

  expect(result.current.user.team).toBe('red')
})

test('should put user on blue team when userActions.setTeam is used', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.team).toBeUndefined()

  act(() => result.current.userActions.setTeam('blue'))

  expect(result.current.user.team).toBe('blue')
})
test('should change user to the value passed into userActions.updateUser', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })

  expect(result.current.user.name).toBe('')

  act(() => result.current.userActions.updateUser(redSpymaster))

  expect(result.current.user).toEqual(redSpymaster)
})
