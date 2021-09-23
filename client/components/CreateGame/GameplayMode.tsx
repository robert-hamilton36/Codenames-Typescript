import React from 'react'

import { useSettingsContext } from '../../contexts/SettingsContext'

export const GameplayMode: React.FC = () => {
  const { settings, settingsDispatcher } = useSettingsContext()

  const handleChange = (e) => {
    settingsDispatcher(e.target.name, e.target.value)
  }

  return (
    <>
      <h3 data-testid='gameplayMode-header'>Gameplay mode</h3>
      <form data-testid='gameplayModeForm'>
        <div className="tooltipcontainer">
          <label htmlFor="individual" data-testid='labelForIndividualMode'>
            Individual mode
          </label>
          <input id="individual" value="individual" name="gameplayMode" type="radio" checked={settings.gameplayMode === 'individual'} onChange={handleChange} data-testid='inputForIndividualMode'/>

          <span className="tooltipcontainertext" data-testid='tooltipForIndividualMode'>
            Each player has their own device to play on
          </span>
        </div>

        <div className="tooltipcontainer">
          <label htmlFor="tabletop" data-testid='labelForTabletopMode'>
            Tabletop mode
          </label>
          <input id="tabletop" value="tabletop" name="gameplayMode" type="radio" checked={settings.gameplayMode === 'tabletop'} onChange={handleChange} data-testid='inputForTabletopMode'/>

          <span className="tooltipcontainertext" data-testid='tooltipForTabletopMode'>
            Game is played on 2+ devices, one for spymaster, one for operatives. Meant to be played together on a table like the physical board game
          </span>
        </div>
      </form>
    </>
  )
}
