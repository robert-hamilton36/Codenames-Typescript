import { renderHook, act } from '@testing-library/react-hooks'
import { usePageNumber } from './usePageNumber'

test('nextPage increases the count', () => {
  const { result } = renderHook(() => usePageNumber())
  const { pageNumber, nextPage } = result.current

  expect(pageNumber).toBe(0)
  act(() => {
    nextPage()
  })
  const { pageNumber: pageNumber2 } = result.current
  expect(pageNumber2).toBe(1)
  act(() => {
    nextPage()
  })
  const { pageNumber: pageNumber3 } = result.current
  expect(pageNumber3).toBe(2)
})

test('previous page decreases the count', () => {
  const { result } = renderHook(() => usePageNumber(2, 2))
  const { pageNumber, previousPage } = result.current

  expect(pageNumber).toBe(2)
  act(() => {
    previousPage()
  })
  const { pageNumber: pageNumber2 } = result.current
  expect(pageNumber2).toBe(1)
})

test('argument startingNum is the initial value', () => {
  const { result } = renderHook(() => usePageNumber(2, 2))
  const { pageNumber } = result.current

  expect(pageNumber).toBe(2)
})

test('argument maxPageNumber sets the maximum', () => {
  const { result } = renderHook(() => usePageNumber(0))
  const { pageNumber, nextPage } = result.current

  expect(pageNumber).toBe(0)
  act(() => {
    nextPage()
  })

  const { pageNumber: pageNumber2 } = result.current
  expect(pageNumber2).toBe(0)
})

test("can't go below pageNumber 0", () => {
  const { result } = renderHook(() => usePageNumber())
  const { pageNumber, previousPage } = result.current

  expect(pageNumber).toBe(0)

  act(() => {
    previousPage()
  })

  const { pageNumber: pageNumber2 } = result.current
  expect(pageNumber2).toBe(0)
})

test("can't go above maxPageNumber", () => {
  const { result } = renderHook(() => usePageNumber(undefined, 2))
  const { pageNumber, nextPage } = result.current

  expect(pageNumber).toBe(2)

  act(() => {
    nextPage()
  })

  const { pageNumber: pageNumber2 } = result.current
  expect(pageNumber2).toBe(2)
})

test('argument validater catches too high a startingNum', () => {
  const { result } = renderHook(() => usePageNumber(undefined, 999))
  const { pageNumber } = result.current

  expect(pageNumber).toBe(2)
})
