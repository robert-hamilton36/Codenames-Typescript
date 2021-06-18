import React from 'react'
import { useSettingsReducerReturn } from '../../hooks/useSettingsReducer'

export const GamePlayMode: React.FC<useSettingsReducerReturn> = ({ settings, settingsDispatcher }) => {
  const handleChange = (e) => {
    settingsDispatcher(e.target.name, e.target.value)
  }

  return (
    <>
      <h3>Gameplay mode</h3>
      <form>
        <div className="tooltipcontainer">
          <label htmlFor="individual">Individual mode</label>
          <input id="individual" value="individual" name="gameplayMode" type="radio" checked={settings.gameplayMode === 'individual'} onChange={handleChange}/>

          <span className="tooltipcontainertext">Each player has their own device to play on</span>
        </div>

        <div className="tooltipcontainer">
          <label htmlFor="tabletop">Tabletop mode</label>
          <input id="tabletop" value="tabletop" name="gameplayMode" type="radio" checked={settings.gameplayMode === 'tabletop'} onChange={handleChange}/>

          <span className="tooltipcontainertext">Game is played on 2+ devices, one for spymaster, one for operatives. Meant to be played together on a table like the physical board game</span>
        </div>
      </form>
    </>
  )
}
