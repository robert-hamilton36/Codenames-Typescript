import { renderHook, act } from '@testing-library/react-hooks'
import { usePageNumber } from './usePageNumber'

describe('tests usePageNumber with no arguments', () => {
  test('hook renders when passed no arguments , with correct starting page number', () => {
    const { result } = renderHook(() => usePageNumber())

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)
  })

  test('nextPage function keeps page number at 0 when the max number of pages is 0', () => {
    const { result } = renderHook(() => usePageNumber())

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { nextPage } = result.current
      nextPage()
    })

    const { pageNumber: pageNumberAfterNextPage } = result.current
    expect(pageNumberAfterNextPage).toBe(0)
  })

  test('previousPage function does not take page number below 0', () => {
    const { result } = renderHook(() => usePageNumber())

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { previousPage } = result.current
      previousPage()
    })

    const { pageNumber: pageNumberAfterPreviousPage } = result.current
    expect(pageNumberAfterPreviousPage).toBe(0)
  })
})

describe('tests usePageNumber with arguemnts', () => {
  test('hook renders correctly with argument', () => {
    const { result } = renderHook(() => usePageNumber(2))

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)
  })

  test('nextPage increases pageNumber by one', () => {
    const { result } = renderHook(() => usePageNumber(2))

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { nextPage } = result.current
      nextPage()
    })

    const { pageNumber: pageNumberAfterOneNextPage } = result.current
    expect(pageNumberAfterOneNextPage).toBe(1)

    act(() => {
      const { nextPage } = result.current
      nextPage()
    })

    const { pageNumber: pageNumberAfterTwoNextPage } = result.current
    expect(pageNumberAfterTwoNextPage).toBe(2)
  })

  test('nextPage cannot change pageNumber to be more than argument noOfPages', () => {
    const { result } = renderHook(() => usePageNumber(3))

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { nextPage } = result.current
      nextPage()
      nextPage()
      nextPage()
      nextPage()
      nextPage()
    })

    const { pageNumber: pageNumberAfterFiveNextPages } = result.current

    expect(pageNumberAfterFiveNextPages).toBe(3)
  })

  test('previousPage descreases the pageNumber by one', () => {
    const { result } = renderHook(() => usePageNumber(2))

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { nextPage } = result.current
      nextPage()
      nextPage()
    })

    const { pageNumber: pageNumberAfterTwoNextPages } = result.current
    expect(pageNumberAfterTwoNextPages).toBe(2)

    act(() => {
      const { previousPage } = result.current
      previousPage()
    })

    const { pageNumber: pageNumberAfterOnePreviousPages } = result.current
    expect(pageNumberAfterOnePreviousPages).toBe(1)

    act(() => {
      const { previousPage } = result.current
      previousPage()
    })

    const { pageNumber: pageNumberAfterTwoPreviousPages } = result.current
    expect(pageNumberAfterTwoPreviousPages).toBe(0)
  })

  test('previousPage cannot decrease pageNumber below zero when hook initialised with maxPageNumber', () => {
    const { result } = renderHook(() => usePageNumber(2))

    const { pageNumber } = result.current
    expect(pageNumber).toBe(0)

    act(() => {
      const { previousPage } = result.current
      previousPage()
    })

    const { pageNumber: pageNumberAfterTwoPreviousPages } = result.current
    expect(pageNumberAfterTwoPreviousPages).toBe(0)
  })
})
