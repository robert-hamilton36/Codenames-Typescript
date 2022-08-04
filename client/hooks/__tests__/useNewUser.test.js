import { renderHook, act } from '@testing-library/react-hooks'
import { useNewUser } from '../useNewUser'
import { validate } from 'uuid'
import { blueHostSpymaster, redOperative } from '../../testing/mockdata/players'

describe('tests setUser action', () => {
  test('setUser should create a new user with argument name and a random uid', () => {
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

  test('setUser passed an empty string should reset the user with the initial empty values', () => {
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
})

describe('tests deleteUser action', () => {
  test('delete user should delete the current user, resetting with the initial empty values', () => {
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

    act(() => {
      const [, userActions] = result.current
      userActions.deleteUser()
    })

    const [afterDeleteUser] = result.current
    expect(afterDeleteUser.name).toBe('')
    expect(afterDeleteUser.uid).toBe('')
  })
})

describe('tests setHost action', () => {
  test('setHost passed true should make user host', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setHost(true)
    })

    const [newUser] = result.current
    expect(newUser.host).toBeTruthy()
  })

  test('setHost passed false should remove host from user', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setHost(true)
    })

    const [newUser] = result.current
    expect(newUser.host).toBeTruthy()

    act(() => {
      userActions.setHost(false)
    })

    const [newUser2] = result.current
    expect(newUser2.host).toBeFalsy()
  })
})

describe('tests setSpymaster action', () => {
  test('setSpymaster passed true should make user spymaster', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setSpymaster(true)
    })

    const [newUser] = result.current
    expect(newUser.spymaster).toBeTruthy()
  })

  test('setSpymaster passed false should remove spymaster from user', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setSpymaster(true)
    })

    const [newUser] = result.current
    expect(newUser.spymaster).toBeTruthy()

    act(() => {
      userActions.setSpymaster(false)
    })
    const [newUser2] = result.current
    expect(newUser2.host).toBeFalsy()
  })
})

describe('tests setTeam action', () => {
  test('setTeam should change users team to red', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setTeam('red')
    })

    const [newUser] = result.current
    expect(newUser.team).toBe('red')
  })

  test('setTeam should change users team to blue', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setTeam('blue')
    })

    const [newUser] = result.current
    expect(newUser.team).toBe('blue')
  })
})

describe('tests updateUser action', () => {
  test('updateUser should completly replace the old user with the updated one', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setUser('Anakin')
      userActions.setTeam('red')
      userActions.setSpymaster(true)
    })

    const [newUser] = result.current
    expect(newUser.team).toBe('red')
    expect(newUser.spymaster).toBe(true)
    expect(newUser.name).toBe('Anakin')

    act(() => {
      userActions.updateUser(blueHostSpymaster)
    })

    const [updatedUser] = result.current
    expect(updatedUser).toEqual(blueHostSpymaster)
  })

  test('updateUser should completly remove old users properties, even if new updated user doesnt contain that property', () => {
    const { result } = renderHook(() => useNewUser())
    const [, userActions] = result.current

    act(() => {
      userActions.setUser('Anakin')
      userActions.setTeam('red')
      userActions.setHost(true)
      userActions.setSpymaster(true)
    })

    const [newUser] = result.current
    expect(newUser.team).toBe('red')
    expect(newUser.host).toBe(true)
    expect(newUser.spymaster).toBe(true)
    expect(newUser.name).toBe('Anakin')

    act(() => {
      // redOperative does not contain the host or spymaster property
      userActions.updateUser(redOperative)
    })

    const [updatedUser] = result.current
    expect(updatedUser).toEqual(redOperative)
    expect(updatedUser.host).toBeUndefined()
    expect(updatedUser.spymaster).toBeUndefined()
  })
})
