import { capitalize } from '../capitalize'

test('should return empty string', () => {
  const string = ''
  const capitalizedString = capitalize(string)

  expect(capitalizedString).toBe('')
})

test('should capitalize string heLLo', () => {
  const string = 'heLLo'
  const capitalizedString = capitalize(string)

  expect(capitalizedString).toBe('Hello')
})

test('should return capitalised single letter string', () => {
  const string = 'w'
  const capitalizedString = capitalize(string)

  expect(capitalizedString).toBe('W')
})

test('should return capitalised single letter string thats already capitalized', () => {
  const string = 'W'
  const capitalizedString = capitalize(string)

  expect(capitalizedString).toBe('W')
})
