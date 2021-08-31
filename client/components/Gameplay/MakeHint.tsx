import React, { useState } from 'react'

import { useGameplayActions } from '../../contexts/FirebaseContext'
import { useGameId } from '../../contexts/GameIdContext'

import { Hint } from '../../types/gameState'

export const MakeHint: React.FC = () => {
  const [hint, setStateHint] = useState('')
  const [noOfWords, setNoOfWords] = useState(0)

  const { gameId } = useGameId()
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
      <h1 data-testid='makeHintHeader'>Spymaster make a hint</h1>
      <label data-testid='hintLabel'>Hint</label>
      <input type="text" value={hint} onChange={(e) => setStateHint(e.target.value)} data-testid='hintInput' autoFocus/>
      <label data-testid='numberLabel'>Number</label>
      <input type="number" value={noOfWords} min={0} max={9} onChange={(e) => setNoOfWords(parseInt(e.target.value))} data-testid='noOfWordsInput'/>

      <input type="submit" onClick={submitHint} data-testid='submitButton'/>
    </>
  )
}

// todo programatically determine max amount of words possible to choose, one team is 9 the other is 8
