import { useState } from 'react'
import { WordObj, User } from '../types/gameState'

export const usePlayerSelectorDeselector = (): [User, (Value: User) => void ] => {
  const [value, setValue] = useState<User>(null)
  function setCustomValue (newValue: User) {
    if (!value) {
      setValue(newValue)
    } else if (newValue?.uid === value?.uid) {
      setValue(null)
    } else {
      setValue(newValue)
    }
  }
  return [value, setCustomValue]
}

export const useWordSelectorDeselector = (): [WordType, (Value: WordType) => void ] => {
  const [value, setValue] = useState<WordType>(null)
  function setCustomValue (newValue: WordType) {
    if (newValue?.word === value?.word) {
      setValue(null)
    } else if (newValue?.revealed) {
      setValue(null)
    } else {
      setValue(newValue)
    }
  }
  return [value, setCustomValue]
}

type WordType = WordObj
