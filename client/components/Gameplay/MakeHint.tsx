import React, { useState } from 'react'

export const MakeHint: React.FC = () => {
  const [hint, setStateHint] = useState('')
  const [noOfWords, setNoOfWords] = useState(0)

  const submitHint = () => {
    // firebaseAction.setHint(gameId, hint, noOfWords)
    return null
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
