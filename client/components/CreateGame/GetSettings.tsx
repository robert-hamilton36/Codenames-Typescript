import React from 'react'
import { useSettingsContext } from '../../contexts/SettingsContext'

import { SettingsState } from '../../hooks/useSettingsReducer'
import { GameplayMode } from './GameplayMode'
import { VoteSystem } from './VoteSystem'

export const GetSettings: React.FC<Props> = ({ confirmSettings }) => {
  const { settings } = useSettingsContext()

  const removeErrorFromSettings = (dirtySettings: SettingsState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, ...cleanSettings } = dirtySettings
    return cleanSettings as Settings
  }

  const handleConfirm = () => {
    confirmSettings(removeErrorFromSettings(settings))
  }

  return (
    <div className="settings">
      <h2 data-testid='getSettings-header'>
        Settings
      </h2>
      {settings.error && <h3 data-testid='errorMessage'>{settings.error}</h3>}
      <VoteSystem />
      <GameplayMode/>
      <button onClick={handleConfirm} data-testid='button'>Confirm</button>
    </div>
  )
}

interface Props {
  confirmSettings: React.Dispatch<React.SetStateAction<Settings>>
}

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'individual-locksin' | 'vote' | 'spymaster-locksin'
}
