import React, { useState } from 'react'

import { useUserActions } from '../contexts/UserContext'

import { validateName } from '../validations/nameValidation'

export const AskName: React.FC = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<Error>(null)
  const { setUser } = useUserActions()

  const handleUserChange = (e) => {
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
      {error && <h1 data-testid='errorMessage'>{error.message}</h1>}
      <form className='askName' onSubmit={handleSubmit} data-testid='form'>
        <label data-testid='label'>Enter Name:</label>
        <input type='text' value={name} onChange={handleUserChange} data-testid='nameInput' autoFocus/>
        <input type='submit' value='Submit' data-testid='submitInput'/>
      </form>
    </>
  )
}
