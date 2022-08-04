import { getClassNameForWordCard } from '../getClassNameForWordCard'

const spymaster = {
  name: 'Obi Wan',
  team: 'blue',
  uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
  spymaster: 'true'
}

const operative = {
  name: 'Anakin',
  team: 'red',
  uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be'
}

const wordObjAssassinCard = {
  index: 0,
  key: 'assassin',
  revealed: false,
  word: 'Lightsaber'
}

const wordObjRedCard = {
  index: 1,
  key: 'red',
  revealed: false,
  word: 'Force'
}

const wordObjBlueCard = {
  index: 2,
  key: 'blue',
  revealed: false,
  word: 'Millennium falcon'
}

const wordObjNeutralCard = {
  index: 3,
  key: 'neutral',
  revealed: false,
  word: 'Eta-2 Actis Class'
}

const revealedWordObjAssassinCard = {
  index: 4,
  key: 'assassin',
  revealed: true,
  word: 'Tatooine'
}

const revealedWordObjRedCard = {
  index: 5,
  key: 'red',
  revealed: true,
  word: 'Death Star'
}

const revealedWordObjBlueCard = {
  index: 6,
  key: 'blue',
  revealed: true,
  word: 'Emperor'
}

const revealedWordObjNeutralCard = {
  index: 7,
  key: 'neutral',
  revealed: true,
  word: 'StormTrooper'
}

describe('when the selected card is not the displayed word, user is not spymaster and the display word is not revealed className is default', () => {
  test('when card is not selected, or revealed, nor is user a spymaster; className is "wordCard"', () => {
    const className = getClassNameForWordCard(revealedWordObjAssassinCard, operative, wordObjAssassinCard)
    expect(className).toBe('wordCard ')
    const className2 = getClassNameForWordCard(null, operative, wordObjAssassinCard)
    expect(className2).toBe('wordCard ')
  })
})

describe('with selected card, selected gets added to end of className', () => {
  test('when displayWord is selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(wordObjRedCard, operative, wordObjRedCard)
    expect(className).toBe('wordCard selected')
  })

  test('when displayWord is revealed but is also selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(revealedWordObjBlueCard, operative, revealedWordObjBlueCard)
    expect(className).toBe('wordCard selected')
  })

  test('when user is spymaster but display word is selected card; className has "selected" added', () => {
    const className = getClassNameForWordCard(wordObjNeutralCard, spymaster, wordObjNeutralCard)
    expect(className).toBe('wordCard selected')
  })
})

describe('no selected card, correct word.key gets added to end of className', () => {
  test('when card is assassin, and user is spymaster; className has "assassin" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, spymaster, wordObjAssassinCard)
    expect(classNameForSpymaster).toBe('wordCard assassin')
  })

  test('when card is assassin, and word is revealed; className has "assassin" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, operative, revealedWordObjAssassinCard)
    expect(classNameForRevealedWord).toBe('wordCard assassin')
  })

  test('when card is red, and user is spymaster; className has "red" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, spymaster, wordObjRedCard)
    expect(classNameForSpymaster).toBe('wordCard red')
  })

  test('when card is red, and word is revealed; className has "red" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, operative, revealedWordObjRedCard)
    expect(classNameForRevealedWord).toBe('wordCard red')
  })

  test('when card is blue, and user is spymaster; className has "blue" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, spymaster, wordObjBlueCard)
    expect(classNameForSpymaster).toBe('wordCard blue')
  })

  test('when card is blue, and word is revealed; className has "blue" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, operative, revealedWordObjBlueCard)
    expect(classNameForRevealedWord).toBe('wordCard blue')
  })

  test('when card is neutral, and user is spymaster; className has "neutral" added', () => {
    const classNameForSpymaster = getClassNameForWordCard(null, spymaster, wordObjNeutralCard)
    expect(classNameForSpymaster).toBe('wordCard neutral')
  })

  test('when card is neutral, and word is revealed; className has "neutral" added', () => {
    const classNameForRevealedWord = getClassNameForWordCard(null, operative, revealedWordObjNeutralCard)
    expect(classNameForRevealedWord).toBe('wordCard neutral')
  })
})
