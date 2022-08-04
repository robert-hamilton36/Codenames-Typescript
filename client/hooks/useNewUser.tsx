import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../types/user'

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
    return action.newUser
  }
  return result
}

export const useNewUser = (): UseNewUser => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const setUser = (value: string) => {
    if (value === '') {
      const action = { type: 'reset' }
      dispatch(action)
    } else {
      const action = { type: 'setName', value: value }
      dispatch(action)
    }
  }

  const deleteUser = () => {
    dispatch({ type: 'reset' })
  }

  const setSpymaster = (boolean: boolean) => {
    dispatch({ type: 'spymaster', boolean: boolean })
  }

  const setHost = (boolean: boolean) => {
    dispatch({ type: 'host', boolean: boolean })
  }

  const setTeam = (team: 'red' | 'blue') => {
    dispatch({ type: 'team', team: team })
  }

  const updateUser = (newUser: User) => {
    dispatch({ type: 'update', newUser: newUser })
  }

  const userActions = {
    setUser,
    deleteUser,
    setSpymaster,
    setHost,
    setTeam,
    updateUser
  }
  return [user, userActions]
}
interface Action {
  type: string,
  value?: string
  boolean?: boolean
  team?: 'red' | 'blue'
  newUser?: User
}

type SetUser = (value:string) => void
type DeleteUser = () => void
type SetSpymaster = (boolean: boolean) => void
type SetHost = (boolean: boolean) => void
type SetTeam = (team: 'red' | 'blue') => void
type UpdateUser = (newUser: User) => void

export interface UserActions {
  setUser: SetUser,
  deleteUser: DeleteUser,
  setSpymaster: SetSpymaster,
  setHost: SetHost,
  setTeam: SetTeam,
  updateUser: UpdateUser
}
type UseNewUser = [User, UserActions]
