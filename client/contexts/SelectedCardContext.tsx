import React, { useContext } from 'react'
import { useWordSelectorDeselector } from '../hooks/useSelectorDeselector'
import { WordObj } from '../types/gameState'

const SelectedCardContext = React.createContext<ContextReturn | null>(null)

export function useSelectedCard ():ContextReturn {
  return useContext(SelectedCardContext)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SelectedCardProvider ({ children }) {
  const [selectedCard, setSelectedCard] = useWordSelectorDeselector()

  const provided = {
    selectedCard,
    setSelectedCard
  }

  return (
    <SelectedCardContext.Provider value={provided}>
      {children}
    </SelectedCardContext.Provider>
  )
}

interface ContextReturn {
  selectedCard: WordObj
  setSelectedCard: (Value: WordObj) => void
}
