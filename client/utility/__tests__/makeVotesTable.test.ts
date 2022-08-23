import { makeVotesTable } from '../makeVoteTable'
import { voteObjForceLockedBlueSpymaster, voteObjLightsaberBlueOperative, voteObjSkipRedOperative, voteObjSkipLockedRedSpymaster } from '../../testing/mockdata/voteObjects'

function getTextFromNestedJSX (element) {
  return element.props.children.props.children.join('')
}
const votes = [voteObjForceLockedBlueSpymaster, voteObjLightsaberBlueOperative, voteObjSkipRedOperative, voteObjSkipLockedRedSpymaster]

test('it should return an empty array if there are no votes', () => {
  const voteTable = makeVotesTable([])
  expect(voteTable).toEqual([])
})

test('should return the correct html element with a locked-in vote for a word', () => {
  const voteTable = makeVotesTable(votes)
  expect(getTextFromNestedJSX(voteTable[0])).toBe('Obi Wan: Force-locked')
})

test('should return the correct html element for a vote for word', () => {
  const voteTable = makeVotesTable(votes)
  expect(getTextFromNestedJSX(voteTable[1])).toBe('Yoda: Lightsaber')
})

test('should return the correct html element for a skip', () => {
  const voteTable = makeVotesTable(votes)
  expect(getTextFromNestedJSX(voteTable[2])).toBe('Emperor Palpatine: skip')
})

test('should return the correct html element for a locked in skip', () => {
  const voteTable = makeVotesTable(votes)
  expect(getTextFromNestedJSX(voteTable[3])).toBe('Anakin: skip-locked')
})

test('should return the correct html elements for a combination of votes', () => {
  const voteTable = makeVotesTable(votes)
  expect(getTextFromNestedJSX(voteTable[0])).toBe('Obi Wan: Force-locked')
  expect(getTextFromNestedJSX(voteTable[1])).toBe('Yoda: Lightsaber')
  expect(getTextFromNestedJSX(voteTable[2])).toBe('Emperor Palpatine: skip')
  expect(getTextFromNestedJSX(voteTable[3])).toBe('Anakin: skip-locked')
})
