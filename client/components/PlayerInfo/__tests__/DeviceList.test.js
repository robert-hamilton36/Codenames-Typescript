import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { DeviceList } from '../DeviceList'
import { HostOptions } from '../HostOptions'
import { useUserContext } from '../../../contexts/UserContext'
import { redSpymaster, blueSpymaster, redHostOperative, blueOperative, blueOperativeCopyWithDifferentUid } from '../../../testing/mockdata/players'

jest.mock('../../../contexts/UserContext')
jest.mock('../HostOptions')

HostOptions.mockReturnValue(<div data-testid='hostOptionsContainer'></div>)

test('should render empty list when device list is empty', () => {
  useUserContext.mockReturnValue({})

  const { getByTestId, queryByTestId } = render(<DeviceList devices={[]}/>)

  const deviceList = getByTestId('deviceList')
  const device0 = queryByTestId('device0')

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(deviceList.children).toHaveLength(0)
  expect(device0).toBeNull()

  expect(hostOptionsContainer).toBeNull()
})

test('should render device list correctly', () => {
  useUserContext.mockReturnValue({})

  const { getByTestId, queryByTestId } = render(<DeviceList devices={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const deviceList = getByTestId('deviceList')

  const device0 = queryByTestId('device0')
  const device1 = queryByTestId('device1')

  const device2 = queryByTestId('device2')
  const device3 = queryByTestId('device3')

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(deviceList.children).toHaveLength(4)

  expect(device0.textContent).toBe(redSpymaster.name + ' - Spymaster')
  expect(device1.textContent).toBe(blueSpymaster.name + ' - Spymaster')

  expect(device2.textContent).toBe(redHostOperative.name + ' - Operative')
  expect(device3.textContent).toBe(blueOperative.name + ' - Operative')

  expect(hostOptionsContainer).toBeNull()
})

test('should render device list correctly when multiple devices have the same name', () => {
  useUserContext.mockReturnValue({})

  const { getByTestId, queryByTestId } = render(<DeviceList devices={[redSpymaster, blueSpymaster, redHostOperative, blueOperative, blueOperativeCopyWithDifferentUid]}/>)

  const deviceList = getByTestId('deviceList')

  const device0 = queryByTestId('device0')
  const device1 = queryByTestId('device1')

  const device2 = queryByTestId('device2')
  const device3 = queryByTestId('device3')

  const device4 = queryByTestId('device4')

  const hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(deviceList.children).toHaveLength(5)

  expect(device0.textContent).toBe(redSpymaster.name + ' - Spymaster')
  expect(device1.textContent).toBe(blueSpymaster.name + ' - Spymaster')

  expect(device2.textContent).toBe(redHostOperative.name + ' - Operative')
  expect(device3.textContent).toBe(blueOperative.name + ' - Operative')

  expect(device4.textContent).toBe(blueOperativeCopyWithDifferentUid.name + ' - Operative')

  expect(hostOptionsContainer).toBeNull()
})
// todo: I haven't figured out how to mock a function only for two tests, or to use the original function for some tests
// so these next two test double as a check that setSelectedDevice works with out checking that the function was called, but by seeing that selectedDevice is no longer null
test('should display Host options when user is host and spymaster player is selected', () => {
  useUserContext.mockReturnValue({ user: redHostOperative })

  const { getByTestId, queryByTestId } = render(<DeviceList devices={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const deviceList = getByTestId('deviceList')
  const device0 = queryByTestId('device0')
  let hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(deviceList.children).toHaveLength(4)
  expect(device0.textContent).toBe(redSpymaster.name + ' - Spymaster')
  expect(hostOptionsContainer).toBeNull()

  fireEvent.click(device0)

  hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(hostOptionsContainer).not.toBeNull()
})

test('should display Host options when user is host and operative player is selected', () => {
  useUserContext.mockReturnValue({ user: redHostOperative })

  const { getByTestId, queryByTestId } = render(<DeviceList devices={[redSpymaster, blueSpymaster, redHostOperative, blueOperative]}/>)

  const deviceList = getByTestId('deviceList')
  const device2 = queryByTestId('device2')
  let hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(deviceList.children).toHaveLength(4)
  expect(device2.textContent).toBe(redHostOperative.name + ' - Operative')
  expect(hostOptionsContainer).toBeNull()

  fireEvent.click(device2)

  hostOptionsContainer = queryByTestId('hostOptionsContainer')

  expect(hostOptionsContainer).not.toBeNull()
})
