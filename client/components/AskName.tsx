import React, { useState } from 'react'
import { useUserContext } from '../contexts/UserContext'

export const AskName: React.FC<Props> = ({ nextPage, previousPage }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUserContext()

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const validateName = (name) => {
    if (name === '') {
      setError('Please enter a name')
      return false
    } else if (!/^[A-Z a-z]+$/.test(name)) {
      setError('Name can only contain letters')
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateName(name)) {
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
