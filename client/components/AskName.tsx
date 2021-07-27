import React, { useState } from 'react'

import { useUserActions } from '../contexts/UserContext'
import { validateName } from '../Validations/nameValidation'

export const AskName: React.FC = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<Error>(null)
  const { setUser } = useUserActions()

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (validateName(name)) {
        return setUser(name)
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      {error && <h1>{error.message}</h1>}
      <form onSubmit={handleSubmit}>
        <label>Enter Name:</label>
        <input type='text' value={name} onChange={handleUserChange}/>
        <input type='submit'/>
      </form>
    </>
  )
}
