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

export const usePageNumber: (maxPageNumber: number, startingNum: number) => Return = (maxPageNumber = 2, startingNum = 0) => {
  if (maxPageNumber < startingNum) { startingNum = maxPageNumber }
  const [pageNumber, dispatch] = useReducer(reducer, startingNum)

  const nextPage = () => {
    dispatch({ type: 'increase', max: maxPageNumber })
  }

  const previousPage = () => {
    dispatch({ type: 'decrease', max: maxPageNumber })
  }

  return { pageNumber, nextPage, previousPage }
}

interface Return {
  pageNumber: number
  nextPage: () => void
  previousPage: () => void
}
