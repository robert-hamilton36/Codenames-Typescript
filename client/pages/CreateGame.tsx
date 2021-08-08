import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useJoinGameActions } from '../contexts/FirebaseContext'
import { useUserContext } from '../contexts/UserContext'
import { createGameObject } from '../utility/createNewGameObject'
import { GetSettings } from '../components/CreateGame/GetSettings'
import { WordList } from '../components/GetWords/WordList'
import { usePageNumber } from '../hooks/usePageNumber'
import { AskName } from '../components/AskName'
import { SettingsProvider } from '../contexts/SettingsContext'

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
      <>
        <AskName />
        <button onClick={handleHome}>Home</button>
      </>
    )
  } else if (pageNumber === 1) {
    return (
      <>
        <WordList setFinalWordList={setFinalWordList} />
        <button onClick={previousPage}>Back</button>
      </>
    )
  } else if (pageNumber === 2) {
    return (
      <>
        <GetSettings confirmSettings={confirmSettings} />
        <button onClick={previousPage}>Back</button>
      </>
    )
  }
  return (
    <>
      <h1>Hello: {user.name}</h1>
      <h1>{settings?.gameplayMode}</h1>
      <h1>{settings?.voteSystem}</h1>
      <div>
        <button onClick={previousPage}>Back</button>
        <button onClick={handleCreate}>Create Game</button>
      </div>
    </>
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
  voteSystem: 'vote' | 'spymaster-locksin'
}
