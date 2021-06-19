import { renderHook, act } from '@testing-library/react-hooks'
import { useSettingsReducer } from './useSettingsReducer'

const initialSettingsTest = {
  voteSystem: 'vote',
  gameplayMode: 'individual',
  error: ''
}

test('hook renders with default settings', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings } = result.current

  expect(settings).toEqual(initialSettingsTest)
})

test('changes voteSystem to spymaster-locksin', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settings, settingsDispatcher } = result.current
  expect(settings).toEqual(initialSettingsTest)

  act(() => {
    settingsDispatcher('voteSystem', 'spymaster-locksin')
  })

  const { settings: settings2 } = result.current
  expect(settings2.voteSystem).toEqual('spymaster-locksin')
  expect(settings2.gameplayMode).toEqual('individual')
  expect(settings2.error).toEqual('')
})

test('changes voteSystem from spymaster-locksin to vote', () => {
  const initialSettings = {
    voteSystem: 'spymaster-locksin',
    gameplayMode: 'individual',
    error: ''
  }

  const { result } = renderHook(() => useSettingsReducer(initialSettings))
  const { settingsDispatcher } = result.current

  act(() => {
    settingsDispatcher('voteSystem', 'vote')
  })

  const { settings: settings2 } = result.current
  expect(settings2).toEqual(initialSettingsTest)
})

test('changes in gameplayMode from individual to tabletop also changes the vote system to spymaster locksin', () => {
  const { result } = renderHook(() => useSettingsReducer())
  const { settingsDispatcher } = result.current

  act(() => {
    settingsDispatcher('gameplayMode', 'tabletop')
  })

  const { settings: settings2 } = result.current

  expect(settings2.voteSystem).toEqual('spymaster-locksin')
  expect(settings2.gameplayMode).toEqual('tabletop')
  expect(settings2.error).toEqual('')
})

test('while gameplay mode is tabletop, changes in vote system from spymaster locks in to vote sets an error when', () => {
  const initialSettings = {
    voteSystem: 'spymaster-locksin',
    gameplayMode: 'tabletop',
    error: ''
  }

  const { result } = renderHook(() => useSettingsReducer(initialSettings))
  const { settingsDispatcher } = result.current

  act(() => {
    settingsDispatcher('voteSystem', 'vote')
  })

  const { settings: settings2 } = result.current
  expect(settings2.voteSystem).toEqual('spymaster-locksin')
  expect(settings2.gameplayMode).toEqual('tabletop')
  expect(settings2.error).toEqual('Vote system must be controlled by spymaster in tabletop mode')
})

test('changes gameplayMode from tabletop to individual', () => {
  const initialSettings = {
    voteSystem: 'spymaster-locksin',
    gameplayMode: 'tabletop',
    error: ''
  }

  const { result } = renderHook(() => useSettingsReducer(initialSettings))
  const { settingsDispatcher } = result.current

  act(() => {
    settingsDispatcher('gameplayMode', 'individual')
  })

  const { settings: settings2 } = result.current
  expect(settings2.voteSystem).toEqual('spymaster-locksin')
  expect(settings2.gameplayMode).toEqual('individual')
  expect(settings2.error).toEqual('')
})

test('illegal starting state passed in as argument gets clean', () => {
  const initialSettings = {
    voteSystem: 'vote',
    gameplayMode: 'tabletop',
    error: ''
  }

  const { result } = renderHook(() => useSettingsReducer(initialSettings))
  const { settings } = result.current

  expect(settings).toEqual(initialSettingsTest)
})
