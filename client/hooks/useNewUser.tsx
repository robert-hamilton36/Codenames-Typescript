import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface User {
  name: string,
  uid: string
}

type SetUser = (value:string) => void
type UseNewUser = () => (User | SetUser)[]
interface Action {
  type: string,
  value: string
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
  }
  return result
}

export const useNewUser: UseNewUser = () => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const setUser: SetUser = (value: string) => {
    const action = { type: 'setName', value: value }
    dispatch(action)
  }

  return [user, setUser]
}
