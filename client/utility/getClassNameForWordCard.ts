import { PlayerObject, WordObj } from '../types/gameState'

export const getClassNameForWordCard = (selectedCard: WordObj, user: PlayerObject, word: WordObj): string => {
  let className = 'codeCard '
  if (selectedCard?.word === word?.word) {
    className += 'selected'
  } else if (word.revealed || user.spymaster) {
    className += word.key
  }

  return className
}
