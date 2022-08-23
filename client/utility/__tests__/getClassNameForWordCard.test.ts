import { blueSpymaster, redOperative } from '../../testing/mockdata/players'
import { wordListNoReveals, wordListRedTeamWin } from '../../testing/mockdata/wordObjects'
import { getClassNameForWordCard } from '../getClassNameForWordCard'
import { WordObj } from '../../types/gameState'

const revealedWordObjAssassinCard: WordObj = {
  index: 4,
  key: 'assassin',
  revealed: true,
  word: 'Tatooine'
}

describe('when the selected card is not the displayed word, user is not spymaster and the display word is not revealed className is default', () => {
  test('when card is not selected, or revealed, nor is user a spymaster; className is "wordCard"', () => {
    const className = getClassNameForWordCard(revealedWordObjAssassinCard, redOperative, wordListNoReveals[15])
    expect(className).toBe('wordCard ')
    const className2 = getClassNameForWordCard(null, redOperative, wordListNoReveals[15])
    expect(className2).toBe('wordCard ')
  })
})

describe('with selected card, selected gets added to end of className', () => {
  test('when displayWord is selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(wordListNoReveals[0], redOperative, wordListNoReveals[0])
    expect(className).toBe('wordCard selected')
  })

  test('when displayWord is revealed but is also selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(wordListRedTeamWin[7], redOperative, wordListRedTeamWin[7])
    expect(className).toBe('wordCard selected')
  })

  test('when user is spymaster but display word is selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(wordListRedTeamWin[6], blueSpymaster, wordListRedTeamWin[6])
    expect(className).toBe('wordCard selected')
  })
})

describe('no selected card, correct word.key gets added to end of className', () => {
  test('when card is assassin, and user is spymaster; className has "assassin" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, blueSpymaster, wordListNoReveals[15])
    expect(classNameForSpymaster).toBe('wordCard assassin')
  })

  test('when card is assassin, and word is revealed; className has "assassin" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, redOperative, revealedWordObjAssassinCard)
    expect(classNameForRevealedWord).toBe('wordCard assassin')
  })

  test('when card is red, and user is spymaster; className has "red" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, blueSpymaster, wordListNoReveals[0])
    expect(classNameForSpymaster).toBe('wordCard red')
  })

  test('when card is red, and word is revealed; className has "red" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, redOperative, wordListRedTeamWin[0])
    expect(classNameForRevealedWord).toBe('wordCard red')
  })

  test('when card is blue, and user is spymaster; className has "blue" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, blueSpymaster, wordListRedTeamWin[1])
    expect(classNameForSpymaster).toBe('wordCard blue')
  })

  test('when card is blue, and word is revealed; className has "blue" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, redOperative, wordListRedTeamWin[7])
    expect(classNameForRevealedWord).toBe('wordCard blue')
  })

  test('when card is neutral, and user is spymaster; className has "neutral" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, blueSpymaster, wordListRedTeamWin[6])
    expect(classNameForSpymaster).toBe('wordCard neutral')
  })

  test('when card is neutral, and word is revealed; className has "neutral" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, redOperative, wordListRedTeamWin[16])
    expect(classNameForRevealedWord).toBe('wordCard neutral')
  })
})
