import { useReducer } from 'react'

function reducer (state: SettingsState, action: Action) {
  const result = { ...state }
  // if settings change to tabletop, voteSystem must be spymaster-locksin
  if (action.value === 'tabletop') {
    result.voteSystem = 'spymaster-locksin'
    result.gameplayMode = 'tabletop'
    return result
  } else if (action.setting === 'voteSystem' && result.gameplayMode === 'tabletop') {
    result.error = 'Vote system must be controlled by spymaster in tabletop mode'
    return result
  } else {
    result[action.setting as keyof Setting] = action.value
    result.error = ''
    return result
  }
}

export const settingsInitialState: SettingsState = {
  voteSystem: 'vote',
  gameplayMode: 'individual',
  error: ''
}

export function useSettingsReducer (): useSettingsReducerReturn {
  const [settings, dispatch] = useReducer(reducer, settingsInitialState)

  const settingsDispatcher = (setting: Setting, value: Value) => {
    dispatch({ setting, value })
  }
  return { settings, settingsDispatcher }
}

type VoteSystem = 'vote' | 'spymaster-locksin'
type GamePlayMode = 'individual' | 'tabletop'

export type SettingsState = {
  voteSystem: VoteSystem;
  gameplayMode: GamePlayMode;
  error?: string;
}

type Setting = 'voteSystem' | 'gameplayMode'
type Value = VoteSystem | GamePlayMode

type Action = {
  setting: Setting
  value: Value
}

export type useSettingsReducerReturn = {
  settings: SettingsState
  settingsDispatcher: (setting: Setting, value: Value) => void
}
