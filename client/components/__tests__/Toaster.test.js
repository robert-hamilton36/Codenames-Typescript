import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Toaster } from '../Toaster'
import { useToaster } from '../../contexts/ToasterContext'

jest.mock('../../contexts/ToasterContext')
const setToaster = jest.fn()

jest.useFakeTimers()

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

test('should return null when toaster is null', () => {
  useToaster.mockReturnValue({ toaster: null, setToaster })
  const { queryByTestId } = render(<Toaster />)

  const toasterDiv = queryByTestId('toasterDiv')

  expect(toasterDiv).toBeNull()
})

test('should render correct text and values when there is a toaster', () => {
  const toaster = { type: 'Error', message: 'Lost a planet, master Obi Wan has' }
  useToaster.mockReturnValue({ toaster, setToaster })
  const { queryByTestId } = render(<Toaster />)

  const toasterDiv = queryByTestId('toasterDiv')
  const toasterTypeHeader = queryByTestId('toasterTypeHeader')
  const toasterCloseButton = queryByTestId('toasterCloseButton')
  const toasterMessageBody = queryByTestId('toasterMessageBody')

  expect(toasterDiv).not.toBeNull()

  expect(toasterTypeHeader.textContent).toBe('Error')
  expect(toasterCloseButton.textContent).toBe('×')
  expect(toasterMessageBody.textContent).toBe('Lost a planet, master Obi Wan has')
})

test('should fire setToaster(null) when close button is pressed', () => {
  const toaster = { type: 'Error', message: 'Lost a planet, master Obi Wan has' }
  useToaster.mockReturnValue({ toaster, setToaster })
  const { queryByTestId } = render(<Toaster />)

  const toasterDiv = queryByTestId('toasterDiv')
  const toasterCloseButton = queryByTestId('toasterCloseButton')

  expect(toasterDiv).not.toBeNull()

  fireEvent.click(toasterCloseButton)

  expect(setToaster).toHaveBeenCalledTimes(1)
  expect(setToaster.mock.calls[0][0]).toBeNull()
})

test('should fire setToaster(null) when 5 seconds have elapsed', () => {
  const toaster = { type: 'Error', message: 'Lost a planet, master Obi Wan has' }
  useToaster.mockReturnValue({ toaster, setToaster })
  const { queryByTestId } = render(<Toaster />)

  const toasterDiv = queryByTestId('toasterDiv')

  expect(toasterDiv).not.toBeNull()

  jest.runAllTimers()

  expect(setToaster).toHaveBeenCalledTimes(1)
  expect(setToaster.mock.calls[0][0]).toBeNull()
})
