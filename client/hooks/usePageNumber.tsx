import { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      if (state === action.max) {
        return state
      }
      return state + 1
    case 'decrease':
      if (state === 0) {
        return state
      }
      return state - 1
  }
}

export const usePageNumber = (noOfPages = 0): ReturnType => {
  const [pageNumber, dispatch] = useReducer(reducer, 0)

  const nextPage = () => {
    dispatch({ type: 'increase', max: noOfPages })
  }

  const previousPage = () => {
    dispatch({ type: 'decrease', max: noOfPages })
  }

  return { pageNumber, nextPage, previousPage }
}

interface ReturnType {
  pageNumber: number
  nextPage: () => void
  previousPage: () => void
}
