import { userVotedForSkip, userVotedForWord } from '../playerVoteFunctions'
import { voteObjParkPlayerObi, voteObjParkLockedPlayerObi, voteObjSkipPlayerObi, voteObjSkipLockedPlayerObi } from '../../testing/mockdata/voteObjects'

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
    const hasUserVotedForSkip = userVotedForSkip(voteObjParkPlayerObi)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return false with a vote for a word thats locked in', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjParkLockedPlayerObi)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return true with a vote for skip', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjSkipPlayerObi)
    expect(hasUserVotedForSkip).toBe(true)
  })

  test('should return true with a vote for skip thats locked in', () => {
    const hasUserVotedForSkip = userVotedForSkip(voteObjSkipLockedPlayerObi)
    expect(hasUserVotedForSkip).toBe(true)
  })
})

describe('tests for userVotedForWord', () => {
  test('should return false with an emptyVote with no skip or word', () => {
    const hasUserVotedForSkip = userVotedForWord(emptyVote)
    expect(hasUserVotedForSkip).toBe(false)
  })

  test('should return true with a vote for a word', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjParkPlayerObi)
    expect(hasUserVotedForWord).toBe(true)
  })

  test('should return true with a vote for a word thats locked in', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjParkLockedPlayerObi)
    expect(hasUserVotedForWord).toBe(true)
  })

  test('should return false with a vote for skip', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjSkipPlayerObi)
    expect(hasUserVotedForWord).toBe(false)
  })

  test('should return false with a vote for skip thats locked in', () => {
    const hasUserVotedForWord = userVotedForWord(voteObjSkipLockedPlayerObi)
    expect(hasUserVotedForWord).toBe(false)
  })
})
