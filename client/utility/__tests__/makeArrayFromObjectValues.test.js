import { makeArrayFromObjectValues } from '../makeArrayFromObjectValues'

const object = {
  1: 'Obi Wan',
  2: 'Anakin',
  3: 'Yoda',
  4: 'Palpatine'
}

test('function returns an empty array from empty object', () => {
  const array = makeArrayFromObjectValues({})
  expect(array).toEqual([])
})

test('function returns an array with all the values as an objects', () => {
  const array = makeArrayFromObjectValues(object)
  expect(array).toEqual(['Obi Wan', 'Anakin', 'Yoda', 'Palpatine'])
})
