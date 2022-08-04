import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { SettingsProvider, useSettingsContext } from '../SettingsContext'
import { settingsInitialState } from '../../hooks/useSettingsReducer'

const spymasterLocksIn = {
  voteSystem: 'spymaster-locksin',
  gameplayMode: 'individual',
  error: ''
}

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <SettingsProvider> {children} </SettingsProvider>
  const { result } = renderHook(() => useSettingsContext(), { wrapper })

  expect(result.current.settings).toEqual(settingsInitialState)
})

test('should correctly change settings when settings dispatcher is used', () => {
  const wrapper = ({ children }) => <SettingsProvider> {children} </SettingsProvider>
  const { result } = renderHook(() => useSettingsContext(), { wrapper })

  expect(result.current.settings).toEqual(settingsInitialState)

  act(() => result.current.settingsDispatcher('voteSystem', 'spymaster-locksin'))

  expect(result.current.settings).toEqual(spymasterLocksIn)
})
