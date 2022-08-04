import { makeUserHintLog, makeUserGuessLog, makeTeamGuessLog } from '../makeLog'

import { redHostOperative } from '../../testing/mockdata/players'
import { userGameLog } from '../../testing/mockdata/gameLog'
import { wordListNoReveals } from '../../testing/mockdata/wordObjects'

describe('tests makeUserHintLog function', () => {
  test('should make the correct log entry when current gameLogs are empty', () => {
    const gameLogs = []
    const hint = {
      hint: 'droid',
      numberOfWords: 2
    }
    const log = makeUserHintLog(gameLogs, redHostOperative, hint)

    expect(log).toEqual({
      type: 'user',
      entryNum: 1,
      action: 'hint',
      user: {
        host: true,
        name: 'R2-D2',
        team: 'red',
        uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
      },
      hint: {
        hint: 'droid',
        numberOfWords: 2
      }
    })
  })

  test('should make the correct log when current gameLogs have 5 entries', () => {
    const gameLogs = userGameLog
    const hint = {
      hint: 'droid',
      numberOfWords: 2
    }
    const log = makeUserHintLog(gameLogs, redHostOperative, hint)

    expect(log).toEqual({
      type: 'user',
      entryNum: 6,
      action: 'hint',
      user: {
        host: true,
        name: 'R2-D2',
        team: 'red',
        uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
      },
      hint: {
        hint: 'droid',
        numberOfWords: 2
      }
    })
  })
})

describe('tests makeUserGuessLog function', () => {
  test('should make the correct log entry when current gameLogs are empty and there is no word', () => {
    const gameLog = []
    const log = makeUserGuessLog(gameLog, redHostOperative)

    expect(log).toEqual({
      type: 'user',
      entryNum: 1,
      action: 'skip',
      user: redHostOperative
    })
  })

  test('should make the correct log entry when current there are gameLogs and there is no word', () => {
    const gameLog = userGameLog
    const log = makeUserGuessLog(gameLog, redHostOperative)

    expect(log).toEqual({
      type: 'user',
      entryNum: 6,
      action: 'skip',
      user: redHostOperative
    })
  })

  test('should make the correct log entry when current gameLogs are empty and there is a word', () => {
    const gameLog = []
    const word = wordListNoReveals[0]
    const log = makeUserGuessLog(gameLog, redHostOperative, word)

    expect(log).toEqual({
      type: 'user',
      entryNum: 1,
      action: 'guess',
      user: redHostOperative,
      word: word
    })
  })

  test('should make the correct log entry when current there are gameLogs and there a word', () => {
    const gameLog = userGameLog
    const word = wordListNoReveals[0]
    const log = makeUserGuessLog(gameLog, redHostOperative, word)

    expect(log).toEqual({
      type: 'user',
      entryNum: 6,
      action: 'guess',
      user: redHostOperative,
      word: word
    })
  })
})

describe('tests makeTeamGuessLog function', () => {
  test('should make the correct log entry when current gameLogs are empty and there is no word', () => {
    const gameLog = []
    const log = makeTeamGuessLog(gameLog, redHostOperative)

    expect(log).toEqual({
      type: 'team',
      entryNum: 1,
      action: 'skip',
      team: 'red'
    })
  })

  test('should make the correct log entry when current there are gameLogs and there is no word', () => {
    const gameLog = userGameLog
    const log = makeTeamGuessLog(gameLog, redHostOperative)

    expect(log).toEqual({
      type: 'team',
      entryNum: 6,
      action: 'skip',
      team: 'red'
    })
  })

  test('should make the correct log entry when current gameLogs are empty and there is a word', () => {
    const gameLog = []
    const word = wordListNoReveals[0]
    const log = makeTeamGuessLog(gameLog, redHostOperative, word)

    expect(log).toEqual({
      type: 'team',
      entryNum: 1,
      action: 'guess',
      team: 'red',
      word: word
    })
  })

  test('should make the correct log entry when current there are gameLogs and there a word', () => {
    const gameLog = []
    const word = wordListNoReveals[0]
    const log = makeTeamGuessLog(gameLog, redHostOperative, word)

    expect(log).toEqual({
      type: 'team',
      entryNum: 1,
      action: 'guess',
      team: 'red',
      word: word
    })
  })
})
