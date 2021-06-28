import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useFirebase } from '../contexts/FirebaseContext'
import { useUserContext } from '../contexts/UserContext'
import { createGameObject } from '../utility/createNewGameObject'
import { GetSettings } from '../components/CreateGame/GetSettings'
import { WordList } from '../components/GetWords/WordList'
import { usePageNumber } from '../hooks/usePageNumber'
import { AskName } from '../components/AskName'

export const CreateGame: React.FC = () => {
  const { pageNumber, nextPage, previousPage } = usePageNumber(3)
  const { user } = useUserContext()
  const [settings, confirmSettings] = useState<Settings>(null)
  const [finalWordList, setFinalWordList] = useState<string[] | null>(null)
  const { actions } = useFirebase()
  const history = useHistory()

  const handleCreate = () => {
    const gameObj = createGameObject(user, ['red', 'blue'], settings, finalWordList)
    actions.createGame(gameObj)
    history.push('/game')
  }

  if (pageNumber === 0) {
    return (
      <AskName nextPage={nextPage} previousPage={previousPage} />
    )
  } else if (pageNumber === 1) {
    return (
      <WordList setFinalWordList={setFinalWordList} nextPage={nextPage} previousPage={previousPage}/>
    )
  } else if (pageNumber === 2) {
    return (
      <GetSettings confirmSettings={confirmSettings} nextPage={nextPage} />
    )
  }
  return (
    <>
      <h1>Hello: {user.name}</h1>
      <h1>{settings?.gameplayMode}</h1>
      <h1>{settings?.voteSystem}</h1>
      {/* {finalWordList && finalWordList.map(word => <h5 key={word}>{word}</h5>)} */}
      {settings && <div>
        <button onClick={previousPage}>Back</button>
        <button onClick={handleCreate}>Create Game</button>
      </div> }
    </>
  )
}

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
