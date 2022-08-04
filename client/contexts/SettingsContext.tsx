import React, { useContext } from 'react'
import { useSettingsReducer, useSettingsReducerReturn } from '../hooks/useSettingsReducer'

const SettingsContext = React.createContext(null)

export function useSettingsContext (): useSettingsReducerReturn {
  return useContext(SettingsContext)
}

export const SettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const { settings, settingsDispatcher } = useSettingsReducer()
  const provided = {
    settings,
    settingsDispatcher
  }
  return (
    <SettingsContext.Provider value={provided}>
      {children}
    </SettingsContext.Provider>
  )
}
