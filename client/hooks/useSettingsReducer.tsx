import { useReducer } from 'react'

function reducer (state: State, action: Action) {
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

const initialSettingsState: State = {
  voteSystem: 'vote',
  gameplayMode: 'individual',
  error: ''
}

export function useSettingsReducer (initialState = initialSettingsState): useSettingsReducerReturn {
  if (initialState.voteSystem === 'vote' && initialState.gameplayMode === 'tabletop') { initialState = initialSettingsState }
  const [settings, dispatch] = useReducer(reducer, initialState)

  const settingsDispatcher = (setting: Setting, value: Value) => {
    dispatch({ setting, value })
  }
  return { settings, settingsDispatcher }
}

export type State = {
  voteSystem: VoteSystem;
  gameplayMode: GamePlayMode;
  error?: string;
}

type VoteSystem = 'vote' | 'spymaster-locksin'
type GamePlayMode = 'individual' | 'tabletop'

type Action = {
  setting: Setting
  value: Value
}

type Setting = 'voteSystem' | 'gameplayMode'
type Value = VoteSystem | GamePlayMode

export type useSettingsReducerReturn = {
  settings: State
  // settingsDispatcher : React.Dispatch<Action>
  settingsDispatcher: (setting: Setting, value: Value) => void
}
