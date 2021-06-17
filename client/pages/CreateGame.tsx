import React, { useState } from 'react'
import { useFirebase } from '../contexts/FirebaseContext'
import { useUserContext } from '../contexts/UserContext'
// import { useSettingsReducer } from '../../hooks/useSettingsReducer'
import { createGameObject } from '../utility/createNewGameObject'
import { GetSettings } from '../components/CreateGame/GetSettings'
import { WordList } from '../components/GetWords/WordList'

export const CreateGame: React.FC = () => {
  const [settings, confirmSettings] = useState<Settings>(null)
  const [finalWordList, setFinalWordList] = useState<string[] | null>(null)
  const { actions } = useFirebase()
  const { user } = useUserContext()

  const handleCreate = () => {
    const gameObj = createGameObject(user, ['red', 'blue'], settings, finalWordList)
    actions.createGame(gameObj)
  }

  if (!settings) {
    return (
      <GetSettings confirmSettings={confirmSettings}/>
    )
  } else if (!finalWordList) {
    return (
      <WordList setFinalWordList={setFinalWordList}/>
    )
  }

  return (
    <>
      <h1>{settings?.gameplayMode}</h1>
      <h1>Hello</h1>
      <h1>{settings?.voteSystem}</h1>
      {settings && <div>
        <button onClick={handleCreate}>Create Game</button>
      </div> }
    </>
  )
}

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'vote' | 'spymaster-locksin'
}
