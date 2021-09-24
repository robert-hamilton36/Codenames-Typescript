import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { SocketProvider, useSocketActions } from '../SocketContext'
import { useSocket } from '../../hooks/useSocket'

jest.mock('../../hooks/useSocket')

const playerLeavesSocket = jest.fn()

const uid = 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
const gameId = '2NdxeNdJ4X8jm0JoIWHD'

useSocket.mockReturnValue({ playerLeavesSocket })

test('should render provider with initial state', () => {
  const wrapper = ({ children }) => <SocketProvider gameId={gameId} uid={uid}> {children} </SocketProvider>
  const { result } = renderHook(() => useSocketActions(), { wrapper })

  expect(result.current.playerLeavesSocket).toBe(playerLeavesSocket)
  expect(useSocket).toHaveBeenCalledWith(uid, gameId)
})
