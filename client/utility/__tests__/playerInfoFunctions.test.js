import { getOppositeTeamColour, getOppositeRole, bothTeamsHaveASpymasters, bothTeamsHaveAtLeastTwoPlayers } from '../playerInfoFunctions'
import { redSpymaster, blueSpymaster, blueOperative, redOperative } from '../../testing/mockdata/players'

const empty = {
  name: 'empty',
  uid: 'ad0845ae-8d06-2a4a-53d5-08188fbeb1e1'
}

describe('tests for getOppositeTeamColour function', () => {
  test('returns red when user has no teamColour', () => {
    const oppositeTeamColour = getOppositeTeamColour(empty)
    expect(oppositeTeamColour).toBe('red')
  })

  test('returns red when user has teamColour blue', () => {
    const oppositeTeamColour = getOppositeTeamColour(blueOperative)
    expect(oppositeTeamColour).toBe('red')
  })

  test('returns blue when user has teamColour red', () => {
    const oppositeTeamColour = getOppositeTeamColour(redSpymaster)
    expect(oppositeTeamColour).toBe('blue')
  })
})

describe('tests for getOppositeRole function', () => {
  test('returns spymaster when user has no role', () => {
    const oppositeRole = getOppositeRole(empty)
    expect(oppositeRole).toBe('spymaster')
  })

  test('returns spymaster when user has role operative', () => {
    const oppositeRole = getOppositeRole(blueOperative)
    expect(oppositeRole).toBe('spymaster')
  })

  test('returns operative when user has role spymaster', () => {
    const oppositeRole = getOppositeRole(redSpymaster)
    expect(oppositeRole).toBe('operative')
  })
})

describe('tests for bothTeamsHaveASpymasters function', () => {
  test('returns false when neither team has a spymaster', () => {
    const doBothTeamsHaveASpymasters = bothTeamsHaveASpymasters([empty, blueOperative, redOperative])
    expect(doBothTeamsHaveASpymasters).toBe(false)
  })

  test('returns false when only one team has a spymaster', () => {
    const doBothTeamsHaveASpymasters = bothTeamsHaveASpymasters([empty, blueOperative, redOperative, redSpymaster])
    expect(doBothTeamsHaveASpymasters).toBe(false)
  })

  test('returns true when both teams has a spymaster', () => {
    const doBothTeamsHaveASpymasters = bothTeamsHaveASpymasters([empty, blueOperative, redOperative, redSpymaster, blueSpymaster])
    expect(doBothTeamsHaveASpymasters).toBe(true)
  })
})

describe('tests for bothTeamsHaveAtLeastTwoPlayers function', () => {
  test('returns false when neither team has a player', () => {
    const doBothTeamsHaveAtLeastTwoPlayers = bothTeamsHaveAtLeastTwoPlayers([empty])
    expect(doBothTeamsHaveAtLeastTwoPlayers).toBe(false)
  })

  test('returns false when only one team has players', () => {
    const doBothTeamsHaveAtLeastTwoPlayers = bothTeamsHaveAtLeastTwoPlayers([empty, redOperative, redSpymaster])
    const doBothTeamsHaveAtLeastTwoPlayers2 = bothTeamsHaveAtLeastTwoPlayers([redOperative, redSpymaster])
    expect(doBothTeamsHaveAtLeastTwoPlayers).toBe(false)
    expect(doBothTeamsHaveAtLeastTwoPlayers2).toBe(false)
  })

  test('returns false when one team has two players and second team has one', () => {
    const doBothTeamsHaveAtLeastTwoPlayers = bothTeamsHaveAtLeastTwoPlayers([empty, redOperative, redSpymaster, blueOperative])
    const doBothTeamsHaveAtLeastTwoPlayers2 = bothTeamsHaveAtLeastTwoPlayers([redOperative, redSpymaster, blueOperative])
    expect(doBothTeamsHaveAtLeastTwoPlayers).toBe(false)
    expect(doBothTeamsHaveAtLeastTwoPlayers2).toBe(false)
  })

  test('returns true when both teams have at least two players', () => {
    const doBothTeamsHaveAtLeastTwoPlayers = bothTeamsHaveAtLeastTwoPlayers([empty, blueOperative, redOperative, redSpymaster, blueSpymaster])
    expect(doBothTeamsHaveAtLeastTwoPlayers).toBe(true)
  })
})
