import React, { useState } from 'react'

import { useUserActions } from '../contexts/UserContext'
import { validateName } from '../utility/validation'

export const AskName: React.FC<Props> = ({ nextPage, previousPage }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUserActions()

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateName(name, setError)) {
      setUser(name)
      nextPage()
      return null
    }
  }

  return (
    <>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
        <label>Enter Name:</label>
        <input type='text' value={name} onChange={handleUserChange}/>
        <button onClick={previousPage}>Back</button>
        <input type='submit'/>
      </form>
    </>
  )
}

interface Props {
  nextPage?: () => void
  previousPage?: () => void
}
