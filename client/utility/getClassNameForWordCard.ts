import { User, WordObj } from '../types/gameState'

export const getClassNameForWordCard = (selectedCard: WordObj, user: User, displayWord: WordObj): string => {
  let className = 'wordCard '
  if (selectedCard?.word === displayWord?.word) {
    className += 'selected'
  } else if (displayWord.revealed || user.spymaster) {
    className += displayWord.key
  }

  return className
}
