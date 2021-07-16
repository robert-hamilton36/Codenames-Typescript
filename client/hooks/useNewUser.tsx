import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PlayerObject } from '../types/gameState'

interface User {
  name: string,
  uid: string,
  host?: boolean
  spymaster?: boolean
  team?: 'red' | 'blue'
}

type SetUser = (value:string) => void
type MakeSpymaster = (boolean: boolean) => void
type MakeHost = (boolean: boolean) => void
type SetTeam = (team: 'red' | 'blue') => void
type UpdateUser = (newUser: PlayerObject) => void

export interface UserActions {
  setUser: SetUser,
  makeSpymaster: MakeSpymaster,
  makeHost: MakeHost,
  setTeam: SetTeam,
  updateUser: UpdateUser
}
type UseNewUser = () => (User | UserActions)[]
interface Action {
  type: string,
  value?: string
  boolean?: boolean
  team?: 'red' | 'blue'
  newUser?: PlayerObject
}

const initialState: User = {
  name: '',
  uid: ''
}

const reducer = (state: User, action: Action) => {
  const result = { ...state }
  if (action.type === 'setName') {
    result.name = action.value
    result.uid = uuidv4()
  } else if (action.type === 'reset') {
    return initialState
  } else if (action.type === 'host') {
    result.host = action.boolean
  } else if (action.type === 'spymaster') {
    result.spymaster = action.boolean
  } else if (action.type === 'team') {
    result.team = action.team
  } else if (action.type === 'update') {
    console.log('reducer')
    console.log(action.newUser)
    return action.newUser
  }
  return result
}

export const useNewUser: UseNewUser = () => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const setUser: SetUser = (value: string) => {
    if (value === '') {
      const action = { type: 'reset' }
      dispatch(action)
    } else {
      const action = { type: 'setName', value: value }
      dispatch(action)
    }
  }
  const makeSpymaster = (boolean: boolean) => {
    dispatch({ type: 'spymaster', boolean: boolean })
  }

  const makeHost = (boolean: boolean) => {
    dispatch({ type: 'host', boolean: boolean })
  }

  const setTeam = (team: 'red' | 'blue') => {
    dispatch({ type: 'team', team: team })
  }

  const updateUser = (newUser: PlayerObject) => {
    console.log('hello updateUser')
    dispatch({ type: 'update', newUser: newUser })
  }

  const userActions = {
    setUser,
    makeSpymaster,
    makeHost,
    setTeam,
    updateUser
  }
  return [user, userActions]
}
