import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { GetSettings } from '../GetSettings'
import { SettingsProvider } from '../../../contexts/SettingsContext'

test('should render GetSettings with correct text and values, no error message', () => {
  const { getByTestId, queryByTestId } = render(
    <SettingsProvider>
      <GetSettings />
    </SettingsProvider>
  )

  const mainHeader = getByTestId('getSettings-header')
  const button = getByTestId('button')
  const error = queryByTestId('errorMessage')

  expect(mainHeader.textContent).toBe('Settings')
  expect(button.textContent).toBe('Confirm')
  expect(error).toBeNull()
})

test('should display error message, when settings contain an error', () => {
  const { getByTestId, queryByTestId } = render(
    <SettingsProvider>
      <GetSettings />
    </SettingsProvider>
  )

  const individualInput = getByTestId('inputForIndividualMode')
  const tabletopInput = getByTestId('inputForTabletopMode')
  const voteModeInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')
  const IndividualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  let errorMessage = queryByTestId('errorMessage')

  expect(voteModeInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
  expect(IndividualLocksinInput.checked).toBe(true)

  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)
  expect(errorMessage).toBeNull()

  fireEvent.click(tabletopInput, { target: { name: 'gameplayMode', value: 'tabletop' } })

  errorMessage = queryByTestId('errorMessage')

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)
  expect(errorMessage).toBeNull()

  fireEvent.click(voteModeInput, { target: { name: 'voteSystem', value: 'vote' } })

  errorMessage = queryByTestId('errorMessage')

  expect(voteModeInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
  expect(IndividualLocksinInput.checked).toBe(true)

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)
  expect(errorMessage.textContent).toBe('Vote system cannot be vote in tabletop mode')
})

test('should remove error message from settings when submitted', () => {
  const mockConfirmSettings = jest.fn(x => x)

  const { getByTestId } = render(
    <SettingsProvider>
      <GetSettings confirmSettings={mockConfirmSettings}/>
    </SettingsProvider>
  )

  const individualInput = getByTestId('inputForIndividualMode')
  const tabletopInput = getByTestId('inputForTabletopMode')
  const voteModeInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')
  const IndividualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const confirmationButton = getByTestId('button')

  expect(voteModeInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
  expect(IndividualLocksinInput.checked).toBe(true)
  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)

  fireEvent.click(tabletopInput, { target: { name: 'gameplayMode', value: 'tabletop' } })

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)

  fireEvent.click(voteModeInput, { target: { name: 'voteSystem', value: 'vote' } })

  const errorMessage = getByTestId('errorMessage')
  expect(voteModeInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
  expect(IndividualLocksinInput.checked).toBe(true)

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)
  expect(errorMessage.textContent).toBe('Vote system cannot be vote in tabletop mode')

  fireEvent.click(confirmationButton)

  expect(errorMessage.textContent).toBe('Vote system cannot be vote in tabletop mode')
  expect(mockConfirmSettings).toHaveBeenCalled()
  expect(mockConfirmSettings.mock.calls).toEqual([[{ voteSystem: 'individual-locksin', gameplayMode: 'tabletop' }]])
})
