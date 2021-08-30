import { MessageObj } from '../../types/gameState'
import { blueSpymaster, redOperative, redSpymaster } from './players'

export const messageHelloThereBlueSpymaster: MessageObj = {
  message: 'Hello There',
  user: blueSpymaster
}

export const messageSandRedSpymaster: MessageObj = {
  message: 'I hate sand',
  user: redSpymaster
}

export const messageDoItRedOperative :MessageObj = {
  message: 'Do it',
  user: redOperative
}
