import React from 'react'
import { useSettingsReducerReturn } from '../../hooks/useSettingsReducer'

export const VoteSystem: React.FC<useSettingsReducerReturn> = ({ settings, settingsDispatcher }) => {
  const handleChange = (e) => {
    settingsDispatcher(e.target.name, e.target.value)
  }
  return (
    <>
      <h3>How codeword is choosen</h3>
      <form>
        <div className="tooltipcontainer">
          <label htmlFor="vote">Operatives vote</label>
          <input id="vote" value="vote" name="voteSystem" type="radio" checked={settings.voteSystem === 'vote'} onChange={handleChange}/>

          <span className="tooltipcontainertext">Operatives vote on word, when a unanimous decision is made, choice is automatically locked in</span>
        </div>

        <div className="tooltipcontainer">
          <label htmlFor="spymaster-locksin">Spymaster locks-in</label>
          <input id="spymaster-locksin" value="spymaster-locksin" name="voteSystem" type="radio" checked={settings.voteSystem === 'spymaster-locksin'} onChange={handleChange}/>

          <span className="tooltipcontainertext">Operatives deliberate and choose word in chat, when a consensus is reached the spymaster locks in word</span>
        </div>
      </form>
    </>
  )
}
