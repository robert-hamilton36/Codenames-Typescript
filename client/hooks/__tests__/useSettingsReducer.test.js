import { renderHook, act } from '@testing-library/react-hooks'
import { useSettingsReducer, settingsInitialState as initialState } from '../useSettingsReducer'
import { spymasterLocksInStateFromInitial, tabletopStateFromInitial, attemptingToChangeVoteSystemWhenTableTop } from '../../testing/mockdata/settings'

test('useSettingsReducer renders properly with correct initial state', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings } = result.current

  expect(settings).toEqual(initialState)
})

test('settingsDispatcher correctly updates vote system to spymaster locksin', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('voteSystem', 'spymaster-locksin')
  })

  const { settings: settingsAfterDispatch } = result.current
  expect(settingsAfterDispatch).toEqual(spymasterLocksInStateFromInitial)
})

test('settingsDispatcher correctly updates gameplay mode to tabletop', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('gameplayMode', 'tabletop')
  })

  const { settings: settingsAfterDispatch } = result.current
  expect(settingsAfterDispatch).toEqual(tabletopStateFromInitial)
})

test('settingsDispatcher gives error when game is in tabletop mode and voteSystem is changed to vote', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('gameplayMode', 'tabletop')
  })

  const { settings: settingsAfterDispatch1, settingsDispatcher: settingsDispatcher1 } = result.current
  expect(settingsAfterDispatch1).toEqual(tabletopStateFromInitial)

  act(() => {
    settingsDispatcher1('voteSystem', 'vote')
  })

  const { settings: settingsAfterDispatch2 } = result.current
  expect(settingsAfterDispatch2).toEqual(attemptingToChangeVoteSystemWhenTableTop)
})
