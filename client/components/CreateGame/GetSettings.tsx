import React from 'react'
import { useSettingsReducer, State } from '../../hooks/useSettingsReducer'
import { GamePlayMode } from './GamePlayMode'
import { VoteSystem } from './VoteSystem'
// import { Settings } from '../../utility/createNewGameObject'

// interface Props {
//   confirmSettings: React.Dispatch<React.SetStateAction<Settings>>
// }

export const GetSettings: React.FC<Props> = ({ confirmSettings }) => {
  const { settings, settingsDispatcher } = useSettingsReducer()

  const removeErrorFromSettings = (dirtySettings: State) => {
    delete dirtySettings.error
    const cleanSettings: Settings = dirtySettings
    return cleanSettings
  }

  const handleConfirm = () => {
    confirmSettings(removeErrorFromSettings(settings))
  }
  return (
    <div className="settings">
      <h2> Settings </h2>
      {settings.error && <h3>{settings.error}</h3>}
      <VoteSystem settings={settings} settingsDispatcher={settingsDispatcher}/>
      <GamePlayMode settings={settings} settingsDispatcher={settingsDispatcher}/>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  )
}

interface Props {
  confirmSettings: React.Dispatch<React.SetStateAction<Settings>>
}

interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
