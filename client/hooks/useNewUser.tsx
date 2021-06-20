import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

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

export interface UserActions {
  setUser: SetUser,
  makeSpymaster: MakeSpymaster,
  makeHost: MakeHost,
  setTeam: SetTeam
}
type UseNewUser = () => (User | UserActions)[]
interface Action {
  type: string,
  value?: string
  boolean?: boolean
  team?: 'red' | 'blue'
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
    result.name = ''
    result.uid = ''
  } else if (action.type === 'host') {
    result.host = action.boolean
  } else if (action.type === 'spymaster') {
    console.log('hello')
    result.spymaster = action.boolean
  } else if (action.type === 'team') {
    result.team = action.team
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

  const userActions = {
    setUser,
    makeSpymaster,
    makeHost,
    setTeam
  }
  return [user, userActions]
}
