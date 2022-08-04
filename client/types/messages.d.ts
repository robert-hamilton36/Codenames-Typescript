import firebase from 'firebase/app'
import { User } from './user'

export interface Messages {
  general: MessageObj[],
  blue?: MessageObj[],
  red?: MessageObj[]
}

export interface MessageObj {
  message: string,
  time?: firebase.firestore.Timestamp,
  user: User
}

export type MessageTeams = 'red' | 'blue' | 'general'
