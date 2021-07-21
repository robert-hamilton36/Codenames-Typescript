import React from 'react'
import { useHistory } from 'react-router-dom'

import { useSettingsReducer, State } from '../../hooks/useSettingsReducer'
import { GamePlayMode } from './GamePlayMode'
import { VoteSystem } from './VoteSystem'

export const GetSettings: React.FC<Props> = ({ confirmSettings, nextPage }) => {
  const { settings, settingsDispatcher } = useSettingsReducer()
  const history = useHistory()

  const removeErrorFromSettings = (dirtySettings: State) => {
    delete dirtySettings.error
    const cleanSettings: Settings = dirtySettings
    return cleanSettings
  }

  const returnHome = () => {
    history.push('/')
  }

  const handleConfirm = () => {
    confirmSettings(removeErrorFromSettings(settings))
    nextPage()
  }
  return (
    <div className="settings">
      <h2> Settings </h2>
      {settings.error && <h3>{settings.error}</h3>}
      <VoteSystem settings={settings} settingsDispatcher={settingsDispatcher}/>
      <GamePlayMode settings={settings} settingsDispatcher={settingsDispatcher}/>
      <button onClick={returnHome}>Home</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}

interface Props {
  confirmSettings: React.Dispatch<React.SetStateAction<Settings>>
  nextPage: () => void
}

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
