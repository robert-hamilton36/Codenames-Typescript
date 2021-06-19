import { renderHook, act } from '@testing-library/react-hooks'
import { useNewUser } from './useNewUser'
import { validate } from 'uuid'

test('should add new user', () => {
  const { result } = renderHook(() => useNewUser())

  const [user, setUser] = result.current
  expect(user.name).toBe('')
  expect(user.uid).toBe('')

  act(() => {
    setUser('Obi Wan')
  })

  const [newUser] = result.current

  expect(newUser.name).toBe('Obi Wan')
  expect(validate(newUser.uid)).toBeTruthy()
})

test('should remove user', () => {
  const { result } = renderHook(() => useNewUser())

  const [, setUser] = result.current

  act(() => {
    setUser('Obi Wan')
  })

  const [user] = result.current

  expect(user.name).toBe('Obi Wan')
  expect(validate(user.uid)).toBeTruthy()

  act(() => {
    setUser('')
  })

  const [newUser] = result.current
  expect(newUser.name).toBe('')
  expect(newUser.uid).toBe('')
})
