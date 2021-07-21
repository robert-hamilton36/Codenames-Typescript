import React, { useState } from 'react'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useUserContext } from '../../contexts/UserContext'
import { Hint } from '../../types/gameState'

export const MakeHint: React.FC = () => {
  const [hint, setStateHint] = useState('')
  const [noOfWords, setNoOfWords] = useState(0)

  const { gameId } = useUserContext()
  const { setHint } = useGameplayActions()

  const submitHint = () => {
    const hintObj: Hint = {
      hint,
      numberOfWords: noOfWords
    }
    setHint(gameId, hintObj)
  }

  return (
    <>
      <h1>Spymaster make a hint</h1>
      <label>Hint</label>
      <input type="text" value={hint}onChange={(e) => setStateHint(e.target.value)}/>
      <label>Number</label>
      <input type="number" value={noOfWords} min={0} max={9} onChange={(e) => setNoOfWords(parseInt(e.target.value))}/>

      <input type="submit" onClick={submitHint}/>
    </>
  )
}

// todo programatically determine max amount of words possible to choose, one team is 9 the other is 8
