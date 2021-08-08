import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { UserProvider, useUserContext } from '../UserContext'

test('Should set gameId and user, and read those values', () => {
  const wrapper = ({ children }) => <UserProvider> {children} </UserProvider>
  const { result } = renderHook(() => useUserContext(), { wrapper })
  act(() => {
    result.current.setGameId('uaR5XYbPZv5L54Zyibjq')
    result.current.userActions.setUser('Anakin')
  })
  expect(result.current.gameId).toBe('uaR5XYbPZv5L54Zyibjq')
  expect(result.current.user.name).toBe('Anakin')
})
