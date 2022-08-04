import { WordObj } from '../types/gameState'
import { User } from '../types/user'

// todo add words color coding only if game has started
export const getClassNameForWordCard = (selectedCard: WordObj, user: User, displayWord: WordObj): string => {
  let className = 'wordCard '
  if (selectedCard?.word === displayWord?.word) {
    className += 'selected'
  } else if (displayWord.revealed || user.spymaster) {
    className += displayWord.key
  }

  return className
}
