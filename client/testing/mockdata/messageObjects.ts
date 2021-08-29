import { MessageObj } from '../../types/gameState'
import { blueSpymaster, redSpymaster } from './players'

export const messageHelloThereBlueSpymaster: MessageObj = {
  message: 'Hello There',
  user: blueSpymaster
}

export const messageSandRedSpymaster: MessageObj = {
  message: 'I hate sand',
  user: redSpymaster
}
