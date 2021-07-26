import React, { useState } from 'react'

import { useUserActions } from '../contexts/UserContext'
import { validateName } from '../utility/validation'

export const AskName: React.FC = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUserActions()

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateName(name, setError)) {
      return setUser(name)
    }
  }

  return (
    <>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
        <label>Enter Name:</label>
        <input type='text' value={name} onChange={handleUserChange}/>
        <input type='submit'/>
      </form>
    </>
  )
}
