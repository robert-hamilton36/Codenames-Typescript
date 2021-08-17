import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Word } from '../Word'

test('should render Word with correct text and values', () => {
  const { getByTestId, queryByTestId } = render(<Word word='Lightsaber'/>)

  const editList = queryByTestId('liEdit')
  const editForm = queryByTestId('form')
  const editNameInput = queryByTestId('newWordInput')
  const editSubmit = queryByTestId('newWordSubmit')

  const displayWord = getByTestId('word')
  const displayEditButton = getByTestId('editButton')
  const displayNewWordButton = getByTestId('newWordButton')

  expect(editList).toBeNull()
  expect(editForm).toBeNull()
  expect(editNameInput).toBeNull()
  expect(editSubmit).toBeNull()

  expect(displayWord.textContent).toBe('Lightsaber')
  expect(displayEditButton.textContent).toBe('Edit')
  expect(displayNewWordButton.textContent).toBe('New Word')
})

test('should edit form when edit button is clicked', () => {
  const { queryByTestId } = render(<Word word='Lightsaber' />)

  let editList = queryByTestId('liEdit')
  let editForm = queryByTestId('form')
  let editNameInput = queryByTestId('newWordInput')
  let editSubmit = queryByTestId('newWordSubmit')

  let displayList = queryByTestId('liDisplay')
  let displayWord = queryByTestId('word')
  let displayEditButton = queryByTestId('editButton')
  let displayNewWordButton = queryByTestId('newWordButton')

  expect(editList).toBeNull()
  expect(editForm).toBeNull()
  expect(editNameInput).toBeNull()
  expect(editSubmit).toBeNull()

  expect(displayWord.textContent).toBe('Lightsaber')
  expect(displayEditButton.textContent).toBe('Edit')
  expect(displayNewWordButton.textContent).toBe('New Word')

  fireEvent.click(displayEditButton)

  editList = queryByTestId('liEdit')
  editForm = queryByTestId('form')
  editNameInput = queryByTestId('newWordInput')
  editSubmit = queryByTestId('newWordSubmit')

  displayList = queryByTestId('liDisplay')
  displayWord = queryByTestId('word')
  displayEditButton = queryByTestId('editButton')
  displayNewWordButton = queryByTestId('newWordButton')

  expect(editList).not.toBeNull()
  expect(editForm).not.toBeNull()
  expect(editNameInput.value).toBe('')
  expect(editSubmit.value).toBe('Submit')

  expect(displayList).toBeNull()
  expect(displayWord).toBeNull()
  expect(displayEditButton).toBeNull()
  expect(displayNewWordButton).toBeNull()
})

test('should display text in input form when editing', () => {
  const { getByTestId, queryByTestId } = render(<Word word='Lightsaber'/>)

  let editList = queryByTestId('liEdit')
  let editForm = queryByTestId('form')
  let editNameInput = queryByTestId('newWordInput')
  let editSubmit = queryByTestId('newWordSubmit')

  const displayEditButton = getByTestId('editButton')

  expect(editList).toBeNull()
  expect(editForm).toBeNull()
  expect(editNameInput).toBeNull()
  expect(editSubmit).toBeNull()

  expect(displayEditButton.textContent).toBe('Edit')

  fireEvent.click(displayEditButton)

  editList = queryByTestId('liEdit')
  editForm = queryByTestId('form')
  editNameInput = queryByTestId('newWordInput')
  editSubmit = queryByTestId('newWordSubmit')

  expect(editList).not.toBeNull()
  expect(editForm).not.toBeNull()
  expect(editNameInput.value).toBe('')
  expect(editSubmit.value).toBe('Submit')

  fireEvent.change(editNameInput, { target: { value: 'TIE Fighte' } })

  editNameInput = queryByTestId('newWordInput')

  expect(editNameInput.value).toBe('TIE Fighte')
})

test('should submit new word when editing', () => {
  const setItem = jest.fn((x, y) => [x, y])
  const { getByTestId, queryByTestId, rerender } = render(<Word word='Lightsaber' setItem={setItem} />)

  let editList = queryByTestId('liEdit')
  let editForm = queryByTestId('form')
  let editNameInput = queryByTestId('newWordInput')
  let editSubmit = queryByTestId('newWordSubmit')

  let displayList = queryByTestId('liDisplay')
  let disiplayWord = getByTestId('word')
  const displayEditButton = getByTestId('editButton')

  expect(editList).toBeNull()
  expect(displayList).not.toBeNull()
  expect(disiplayWord.textContent).toBe('Lightsaber')
  expect(displayEditButton.textContent).toBe('Edit')

  fireEvent.click(displayEditButton)

  displayList = queryByTestId('liDisplay')

  editList = queryByTestId('liEdit')
  editForm = queryByTestId('form')
  editNameInput = queryByTestId('newWordInput')
  editSubmit = queryByTestId('newWordSubmit')

  expect(editList).not.toBeNull()
  expect(editNameInput.value).toBe('')
  expect(editSubmit.value).toBe('Submit')
  expect(displayList).toBeNull()

  fireEvent.change(editNameInput, { target: { value: 'TIE Fighter' } })

  editNameInput = queryByTestId('newWordInput')

  expect(editNameInput.value).toBe('TIE Fighter')

  fireEvent.submit(editForm)

  displayList = queryByTestId('liDisplay')
  editList = queryByTestId('liEdit')

  expect(editList).toBeNull()
  expect(displayList).not.toBeNull()
  expect(setItem).toHaveBeenCalled()
  expect(setItem.mock.calls[0]).toEqual(['TIE Fighter', 'Lightsaber'])

  rerender(<Word word={setItem.mock.results[0].value[0]} setItem={setItem} />)

  editList = queryByTestId('liEdit')

  disiplayWord = getByTestId('word')

  expect(editList).toBeNull()
  expect(displayList).not.toBeNull()
  expect(disiplayWord.textContent).toBe('TIE Fighter')
})

test('should get a new word when new word button is clicked', () => {
  const setItem = jest.fn((x, y) => [x, y])
  const getNewWord = jest.fn(() => 'X-Wing')
  const { getByTestId, queryByTestId, rerender } = render(<Word word='Lightsaber' setItem={setItem} getNewWord={getNewWord}/>)

  let editList = queryByTestId('liEdit')

  let displayNewWordButton = getByTestId('newWordButton')
  let displayList = getByTestId('liDisplay')
  let disiplayWord = getByTestId('word')

  expect(editList).toBeNull()
  expect(displayList).not.toBeNull()
  expect(disiplayWord.textContent).toBe('Lightsaber')

  expect(getNewWord.mock.calls).toHaveLength(0)
  expect(setItem.mock.calls).toHaveLength(0)

  fireEvent.click(displayNewWordButton)

  expect(getNewWord).toHaveBeenCalled()
  expect(getNewWord.mock.results[0].value).toBe('X-Wing')
  expect(setItem.mock.results[0].value).toEqual(['X-Wing', 'Lightsaber'])

  rerender(<Word word={setItem.mock.results[0].value[0]} setItem={setItem} getNewWord={getNewWord}/>)

  editList = queryByTestId('liEdit')

  displayNewWordButton = getByTestId('newWordButton')
  displayList = getByTestId('liDisplay')
  disiplayWord = getByTestId('word')

  expect(editList).toBeNull()
  expect(displayList).not.toBeNull()
  expect(disiplayWord.textContent).toBe('X-Wing')
})
