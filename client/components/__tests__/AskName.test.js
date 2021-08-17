import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AskName } from '../AskName'
import { UserProvider } from '../../contexts/UserContext'

test('should render AskName with correct text and values', () => {
  const { getByTestId, queryByTestId } = render(
    <UserProvider>
      <AskName/>
    </UserProvider>
  )

  const label = getByTestId('label')
  const input = getByTestId('nameInput')
  const error = queryByTestId('errorMessage')

  expect(label.textContent).toBe('Enter Name:')
  expect(input.value).toBe('')
  expect(error).toBeNull()
})

test('should display text in input form when typed', () => {
  const { getByTestId, queryByTestId } = render(
    <UserProvider>
      <AskName/>
    </UserProvider>
  )

  const input = getByTestId('nameInput')
  const error = queryByTestId('errorMessage')

  expect(input.textContent).toBe('')
  expect(input.value).toBe('')
  expect(error).toBeNull()

  fireEvent.change(input, { target: { value: 'Obi Wa' } })

  expect(input.value).toBe('Obi Wa')
})

test('should display error when submitted name contains invalid symbols', () => {
  const { getByTestId, queryByTestId } = render(
    <UserProvider>
      <AskName/>
    </UserProvider>
  )

  const input = getByTestId('nameInput')
  const form = getByTestId('form')
  let error = queryByTestId('errorMessage')

  expect(input.textContent).toBe('')
  expect(input.value).toBe('')
  expect(error).toBeNull()

  fireEvent.change(input, { target: { value: ':Obi/1.' } })
  fireEvent.submit(form)

  error = getByTestId('errorMessage')

  expect(error.textContent).toBe('Name can only contain letters and spaces')
  expect(input.value).toBe(':Obi/1.')
})

test('should display error when submitted name is empty', () => {
  const { getByTestId, queryByTestId } = render(
    <UserProvider>
      <AskName/>
    </UserProvider>
  )

  const input = getByTestId('nameInput')
  const form = getByTestId('form')
  let error = queryByTestId('errorMessage')

  expect(input.textContent).toBe('')
  expect(input.value).toBe('')
  expect(error).toBeNull()

  fireEvent.submit(form)

  error = getByTestId('errorMessage')

  expect(error.textContent).toBe('Please enter a name')
  expect(input.value).toBe('')
})
