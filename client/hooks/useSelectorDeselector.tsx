import { useState } from 'react'
import { WordObj, PlayerObject } from '../types/gameState'

export const usePlayerSelectorDeselector = (): [UserType, (Value: UserType) => void ] => {
  const [value, setValue] = useState<UserType>(null)
  function setCustomValue (newValue: UserType) {
    if (!value) {
      setValue(newValue)
    } else if (newValue.uid === value.uid) {
      setValue(null)
    } else {
      setValue(newValue)
    }
  }
  return [value, setCustomValue]
}

type UserType = PlayerObject | null

export const useWordSelectorDeselector = (): [WordType, (Value: WordType) => void ] => {
  const [value, setValue] = useState<WordType>(null)
  function setCustomValue (newValue: WordType) {
    if (newValue.word === value.word) {
      setValue(null)
    } else {
      setValue(newValue)
    }
  }
  return [value, setCustomValue]
}

type WordType = WordObj | null
