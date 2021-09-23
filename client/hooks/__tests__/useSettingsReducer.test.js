import { renderHook, act } from '@testing-library/react-hooks'
import { useSettingsReducer, settingsInitialState as initialState } from '../useSettingsReducer'

test('useSettingsReducer renders properly with correct initial state', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings } = result.current

  expect(settings).toEqual(initialState)
})

test('settingsDispatcher correctly updates vote system to vote', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('voteSystem', 'vote')
  })

  const { settings: settingsAfterDispatch } = result.current
  expect(settingsAfterDispatch).toEqual({
    voteSystem: 'vote',
    gameplayMode: 'individual',
    error: ''
  })
})

test('settingsDispatcher correctly updates vote system to spymaster locksin', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('voteSystem', 'spymaster-locksin')
  })

  const { settings: settingsAfterDispatch } = result.current
  expect(settingsAfterDispatch).toEqual({
    voteSystem: 'spymaster-locksin',
    gameplayMode: 'individual',
    error: ''
  })
})

test('settingsDispatcher correctly updates gameplay mode to tabletop', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('gameplayMode', 'tabletop')
  })

  const { settings: settingsAfterDispatch } = result.current
  expect(settingsAfterDispatch).toEqual({
    voteSystem: 'individual-locksin',
    gameplayMode: 'tabletop',
    error: ''
  })
})

test('when voteSystem is in operative vote and gameplayMode is changed to tabletop, votesystem should change to indivdual-locksin', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('voteSystem', 'vote')
  })

  const { settings: settingsAfterDispatch1, settingsDispatcher: settingsDispatcher1 } = result.current
  expect(settingsAfterDispatch1).toEqual({
    voteSystem: 'vote',
    gameplayMode: 'individual',
    error: ''
  })

  act(() => {
    settingsDispatcher1('gameplayMode', 'tabletop')
  })

  const { settings: settingsAfterDispatch2 } = result.current

  expect(settingsAfterDispatch1).not.toEqual({
    voteSystem: 'vote',
    gameplayMode: 'tabletop',
    error: ''
  })

  expect(settingsAfterDispatch2).toEqual({
    voteSystem: 'individual-locksin',
    gameplayMode: 'tabletop',
    error: ''
  })
})

test('settingsDispatcher gives error when game is in tabletop mode and voteSystem is changed to vote', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current

  expect(settings).toEqual(initialState)

  act(() => {
    settingsDispatcher('gameplayMode', 'tabletop')
  })

  const { settings: settingsAfterDispatch1, settingsDispatcher: settingsDispatcher1 } = result.current
  expect(settingsAfterDispatch1).toEqual({
    voteSystem: 'individual-locksin',
    gameplayMode: 'tabletop',
    error: ''
  })

  act(() => {
    settingsDispatcher1('voteSystem', 'vote')
  })

  const { settings: settingsAfterDispatch2 } = result.current
  expect(settingsAfterDispatch2).toEqual({
    voteSystem: 'individual-locksin',
    gameplayMode: 'tabletop',
    error: 'Vote system cannot be vote in tabletop mode'
  })
})
