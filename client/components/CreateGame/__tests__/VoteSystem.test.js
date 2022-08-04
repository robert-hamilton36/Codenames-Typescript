import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { VoteSystem } from '../VoteSystem'
import { SettingsProvider } from '../../../contexts/SettingsContext'

test('should render VoteSystem with correct text and values', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <VoteSystem />
    </SettingsProvider>
  )

  const mainHeader = getByTestId('voteSystem-header')

  const individualLocksinModeLabel = getByTestId('labelForIndividualLocksinMode')
  const voteModeLabel = getByTestId('labelForVoteMode')
  const SpymasterLocksinModeLabel = getByTestId('labelForSpymasterLocksinMode')

  const individualLocksinModeTooltip = getByTestId('tooltipForIndividualLocksinMode')
  const voteModeTooltip = getByTestId('tooltipForVoteMode')
  const SpymasterLocksinModeTooltip = getByTestId('tooltipForSpymasterLocksinMode')

  const individualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const voteInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')

  expect(mainHeader.textContent).toBe('How codeword is choosen')

  expect(individualLocksinModeLabel.textContent).toBe('Individual locks-in')
  expect(voteModeLabel.textContent).toBe('Operatives vote')
  expect(SpymasterLocksinModeLabel.textContent).toBe('Spymaster locks-in')

  expect(individualLocksinModeTooltip.textContent).toBe('Individuals can vote on words, against opinion of team mates')
  expect(voteModeTooltip.textContent).toBe('Operatives vote on word, when a unanimous decision is made, choice is automatically locked in')
  expect(SpymasterLocksinModeTooltip.textContent).toBe('Operatives deliberate and choose word in chat, when a consensus is reached the spymaster locks in word')

  expect(individualLocksinInput.value).toBe('individual-locksin')
  expect(voteInput.value).toBe('vote')
  expect(SpymasterLocksinInput.value).toBe('spymaster-locksin')
})

test('should render VoteSystem with correct setting, voteSystem: individual-locksin', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <VoteSystem />
    </SettingsProvider>
  )

  const individualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const voteInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')

  expect(individualLocksinInput.checked).toBe(true)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
})

test('should correctly update the vote radio button to checked when user clicks vote input', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <VoteSystem />
    </SettingsProvider>
  )

  const individualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const voteInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')

  expect(individualLocksinInput.checked).toBe(true)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)

  fireEvent.click(SpymasterLocksinInput, { target: { name: 'voteSystem', value: 'vote' } })

  expect(individualLocksinInput.checked).toBe(false)
  expect(voteInput.checked).toBe(true)
  expect(SpymasterLocksinInput.checked).toBe(false)
})

test('should correctly update the spymaster-locksin radio button to checked when user clicks spymaster-locksin input', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <VoteSystem />
    </SettingsProvider>
  )

  const individualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const voteInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')

  expect(individualLocksinInput.checked).toBe(true)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)

  fireEvent.click(SpymasterLocksinInput, { target: { name: 'voteSystem', value: 'spymaster-locksin' } })

  expect(individualLocksinInput.checked).toBe(false)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(true)
})

test('should correctly update the individual-locksin radio button to checked when user clicks individual-locksin input', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <VoteSystem />
    </SettingsProvider>
  )

  const individualLocksinInput = getByTestId('inputForIndividualLocksinMode')
  const voteInput = getByTestId('inputForVoteMode')
  const SpymasterLocksinInput = getByTestId('inputForSpymasterLocksinMode')

  expect(individualLocksinInput.checked).toBe(true)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)

  fireEvent.click(SpymasterLocksinInput, { target: { name: 'voteSystem', value: 'spymaster-locksin' } })

  expect(individualLocksinInput.checked).toBe(false)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(true)

  fireEvent.click(voteInput, { target: { name: 'voteSystem', value: 'individual-locksin' } })

  expect(individualLocksinInput.checked).toBe(true)
  expect(voteInput.checked).toBe(false)
  expect(SpymasterLocksinInput.checked).toBe(false)
})
