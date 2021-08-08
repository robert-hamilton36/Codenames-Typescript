import React from 'react'

import { useSettingsContext } from '../../contexts/SettingsContext'

export const VoteSystem: React.FC = () => {
  const { settings, settingsDispatcher } = useSettingsContext()

  const handleChange = (e) => {
    settingsDispatcher(e.target.name, e.target.value)
  }

  return (
    <>
      <h3 data-testid='voteSystem-header'>How codeword is choosen</h3>
      <form data-testid='voteSystemForm'>
        <div className="tooltipcontainer">
          <label htmlFor="vote" data-testid='labelForVoteMode'>
            Operatives vote
          </label >
          <input id="vote" value="vote" name="voteSystem" type="radio" checked={settings.voteSystem === 'vote'} onChange={handleChange} data-testid='inputForVoteMode'/>

          <span className="tooltipcontainertext" data-testid='tooltipForVoteMode'>
            Operatives vote on word, when a unanimous decision is made, choice is automatically locked in
          </span>
        </div>

        <div className="tooltipcontainer">
          <label htmlFor="spymaster-locksin" data-testid='labelForSpymasterLocksinMode'>
            Spymaster locks-in
          </label>
          <input id="spymaster-locksin" value="spymaster-locksin" name="voteSystem" type="radio" checked={settings.voteSystem === 'spymaster-locksin'} onChange={handleChange} data-testid='inputForSpymasterLocksinMode'/>

          <span className="tooltipcontainertext" data-testid='tooltipForSpymasterLocksinMode'>
            Operatives deliberate and choose word in chat, when a consensus is reached the spymaster locks in word
          </span>
        </div>
      </form>
    </>
  )
}
