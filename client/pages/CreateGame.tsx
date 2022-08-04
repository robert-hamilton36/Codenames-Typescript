import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AskName } from '../components/AskName'
import { GetSettings } from '../components/CreateGame/GetSettings'
import { WordList } from '../components/GetWords/WordList'

import { useJoinGameActions } from '../contexts/FirebaseContext'
import { SettingsProvider } from '../contexts/SettingsContext'
import { useUserContext } from '../contexts/UserContext'

import { usePageNumber } from '../hooks/usePageNumber'

import { createGameObject } from '../utility/createNewGameObject'

const CreateGamePage: React.FC = () => {
  const { pageNumber, nextPage, previousPage } = usePageNumber(3)
  const { user } = useUserContext()
  const [settings, confirmSettings] = useState<Settings>(null)
  const [finalWordList, setFinalWordList] = useState<string[] | null>(null)
  const { createGame } = useJoinGameActions()
  const history = useHistory()

  const handleCreate = () => {
    const gameObj = createGameObject(user, settings, finalWordList)
    createGame(gameObj)
    history.push('/game')
  }

  const handleHome = () => {
    history.push('/')
  }

  useEffect(() => {
    if (user.name !== '') {
      nextPage()
    }
  }, [user, finalWordList, settings])

  if (pageNumber === 0) {
    return (
      <div className='menu'>
        <AskName />
        <button onClick={handleHome}>Home</button>
      </div>
    )
  } else if (pageNumber === 1) {
    return (
      <div className='wordlist'>
        <WordList setFinalWordList={setFinalWordList} />
        <button onClick={previousPage}>Back</button>
      </div>
    )
  } else if (pageNumber === 2) {
    return (
      <div className='menu'>
        <GetSettings confirmSettings={confirmSettings} />
        <button onClick={previousPage}>Back</button>
      </div>
    )
  }
  return (
    <div className='menu'>
      <h1>Hello: {user.name}</h1>
      <h1>{settings?.gameplayMode}</h1>
      <h1>{settings?.voteSystem}</h1>
      <div>
        <button onClick={previousPage}>Back</button>
        <button onClick={handleCreate}>Create Game</button>
      </div>
    </div>
  )
}

export const CreateGame: React.FC = () => {
  return (
    <SettingsProvider>
      <CreateGamePage/>
    </SettingsProvider>
  )
}

export interface Settings {
  gameplayMode: 'individual' | 'tabletop',
  voteSystem: 'individual-locksin' | 'vote' | 'spymaster-locksin'
}
