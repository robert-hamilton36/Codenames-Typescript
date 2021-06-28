import { renderHook, act } from '@testing-library/react-hooks'
import { useNewUser } from './useNewUser'
import { validate } from 'uuid'

test('True is true', () => {
  expect(true).toBeTruthy()
})

test('setUser should create new user', () => {
  const { result } = renderHook(() => useNewUser())

  const [user] = result.current
  expect(user.name).toBe('')
  expect(user.uid).toBe('')

  act(() => {
    const [, userActions] = result.current
    userActions.setUser('Obi Wan')
  })

  const [newUser] = result.current

  expect(newUser.name).toBe('Obi Wan')
  expect(validate(newUser.uid)).toBeTruthy()
})

test('empty string should remove user', () => {
  const { result } = renderHook(() => useNewUser())

  const [, userActions] = result.current

  act(() => {
    userActions.setUser('Obi Wan')
  })

  const [user] = result.current

  expect(user.name).toBe('Obi Wan')
  expect(validate(user.uid)).toBeTruthy()

  act(() => {
    userActions.setUser('')
  })

  const [newUser] = result.current
  expect(newUser.name).toBe('')
  expect(newUser.uid).toBe('')
})

test('should make user host', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.makeHost(true)
  })

  const [newUser] = result.current
  expect(newUser.host).toBeTruthy()
})

test('should remove host from user', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.makeHost(true)
  })

  const [newUser] = result.current
  expect(newUser.host).toBeTruthy()

  act(() => {
    userActions.makeHost(false)
  })

  const [newUser2] = result.current
  expect(newUser2.host).toBeFalsy()
})

test('should make user spymaster', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.makeSpymaster(true)
  })

  const [newUser] = result.current
  expect(newUser.spymaster).toBeTruthy()
})

test('should remove spymaster from user', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.makeSpymaster(true)
  })

  const [newUser] = result.current
  expect(newUser.spymaster).toBeTruthy()

  act(() => {
    userActions.makeSpymaster(false)
  })
  const [newUser2] = result.current
  expect(newUser2.host).toBeFalsy()
})

test('should change user team to red', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.setTeam('red')
  })

  const [newUser] = result.current
  expect(newUser.team).toBe('red')
})

test('should change user team to blue', () => {
  const { result } = renderHook(() => useNewUser())
  const [, userActions] = result.current

  act(() => {
    userActions.setTeam('blue')
  })

  const [newUser] = result.current
  expect(newUser.team).toBe('blue')
})
