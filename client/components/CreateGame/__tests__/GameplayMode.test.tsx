import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { GameplayMode } from '../GameplayMode'
import { SettingsProvider } from '../../../contexts/SettingsContext'

test('should render GameplayMode with correct text and values', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <GameplayMode />
    </SettingsProvider>
  )

  const mainHeader = getByTestId('gameplayMode-header')
  const individualModeLabel = getByTestId('labelForIndividualMode')
  const tabletopModeLabel = getByTestId('labelForTabletopMode')
  const individualModeTooltip = getByTestId('tooltipForIndividualMode')
  const tabletopModeTooltip = getByTestId('tooltipForTabletopMode')
  const individualInput = getByTestId('inputForIndividualMode') as HTMLInputElement
  const tabletopInput = getByTestId('inputForTabletopMode') as HTMLInputElement

  expect(mainHeader.textContent).toBe('Gameplay mode')
  expect(individualModeLabel.textContent).toBe('Individual mode')
  expect(tabletopModeLabel.textContent).toBe('Tabletop mode')
  expect(individualModeTooltip.textContent).toBe('Each player has their own device to play on')
  expect(tabletopModeTooltip.textContent).toBe('Game is played on 2+ devices, one for spymaster, one for operatives. Meant to be played together on a table like the physical board game')
  expect(individualInput.value).toBe('individual')
  expect(tabletopInput.value).toBe('tabletop')
})

test('should render GameplayMode with correct setting, gamePlayMode: individual', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <GameplayMode />
    </SettingsProvider>
  )

  const individualInput = getByTestId('inputForIndividualMode') as HTMLInputElement
  const tabletopInput = getByTestId('inputForTabletopMode') as HTMLInputElement

  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)
})

test('should correctly update the tabletop radio button to checked when user clicks tabletop input', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <GameplayMode />
    </SettingsProvider>
  )

  const individualInput = getByTestId('inputForIndividualMode') as HTMLInputElement
  const tabletopInput = getByTestId('inputForTabletopMode') as HTMLInputElement

  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)

  fireEvent.click(tabletopInput, { target: { name: 'gameplayMode', value: 'tabletop' } })

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)
})

test('should correctly update the individual radio button to checked when user clicks individual input', () => {
  const { getByTestId } = render(
    <SettingsProvider>
      <GameplayMode />
    </SettingsProvider>
  )

  const individualInput = getByTestId('inputForIndividualMode') as HTMLInputElement
  const tabletopInput = getByTestId('inputForTabletopMode') as HTMLInputElement

  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)

  fireEvent.click(tabletopInput, { target: { name: 'gameplayMode', value: 'tabletop' } })

  expect(individualInput.checked).toBe(false)
  expect(tabletopInput.checked).toBe(true)

  fireEvent.click(individualInput, { target: { name: 'gameplayMode', value: 'individual' } })

  expect(individualInput.checked).toBe(true)
  expect(tabletopInput.checked).toBe(false)
})
