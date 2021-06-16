import React, { useState } from 'react'
import { useFirebase } from '../contexts/FirebaseContext'
import { useUserContext } from '../contexts/UserContext'
// import { useSettingsReducer } from '../../hooks/useSettingsReducer'
import { createGameObject } from '../utility/createNewGameObject'
import { GetSettings } from '../components/CreateGame/GetSettings'

const wordList = [
  'africa',
  'agent',
  'air',
  'alien',
  'amazon',
  'angel',
  'antarctica',
  'apple',
  'arm',
  'back',
  'band',
  'bank',
  'bark',
  'beach',
  'belt',
  'berlin',
  'berry',
  'board',
  'bond',
  'boom',
  'bow',
  'box',
  'bug',
  'canada',
  'capital'
]

export const CreateGame: React.FC = () => {
  const [settings, confirmSettings] = useState<Settings>(null)
  const { actions } = useFirebase()
  const { user } = useUserContext()
  const handleCreate = () => {
    const gameObj = createGameObject(user, ['red', 'blue'], settings, wordList)
    actions.createGame(gameObj)
  }

  return (
    <>
      {!settings && <GetSettings confirmSettings={confirmSettings}/>}
      <h1>{settings?.gameplayMode}</h1>
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
