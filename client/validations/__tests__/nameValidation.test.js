import { validateName, NameValidationError } from '../nameValidation'

test('throws error on empty name', () => {
  expect(() => {
    validateName('')
  }).toThrow(new NameValidationError(('Please enter a name')))
})

test('throws error on invalid symbol', () => {
  expect(() => {
    validateName('An4k1n')
  }).toThrow(new NameValidationError(('Name can only contain letters and spaces')))
})

test('returns true for valid name', () => {
  const validName = validateName('Obi Wan')
  expect(validName).toBe(true)
})
