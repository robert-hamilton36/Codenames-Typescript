import { userVotedForSkip, userVotedForWord } from '../playerVoteFunctions'
import { voteObjParkRedSpymaster, voteObjParkLockedRedSpymaster, voteObjSkipRedSpymaster, voteObjSkipLockedRedSpymaster } from '../../testing/mockdata/voteObjects'

const emptyVote = {
  user: {
    name: 'Obi Wan',
    team: 'blue',
    uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
    spymaster: 'true'
  }
}

describe('tests for userVotedForSkip', () => {
  test('should return false with an emptyVote with no skip or word', () => {
    const hasUserVotedForSkip = userVotedForSkip(emptyVote)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return false with a vote for a word', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjParkRedSpymaster)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return false with a vote for a word thats locked in', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjParkLockedRedSpymaster)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return true with a vote for skip', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjSkipRedSpymaster)
    expect(hasUserVotedForSkip).toBe(true)
  })

  test('should return true with a vote for skip thats locked in', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjSkipLockedRedSpymaster)
    expect(hasUserVotedForSkip).toBe(true)
  })
})

describe('tests for userVotedForWord', () => {
  test('should return false with an emptyVote with no skip or word', () => {
    const hasUserVotedForSkip = userVotedForWord(emptyVote)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return true with a vote for a word', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjParkRedSpymaster)
    expect(hasUserVotedForWord).toBe(true)
  })

  test('should return true with a vote for a word thats locked in', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjParkLockedRedSpymaster)
    expect(hasUserVotedForWord).toBe(true)
  })

  test('should return false with a vote for skip', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjSkipRedSpymaster)
    expect(hasUserVotedForWord).toBe(false)
  })

  test('should return false with a vote for skip thats locked in', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjSkipLockedRedSpymaster)
    expect(hasUserVotedForWord).toBe(false)
  })
})
