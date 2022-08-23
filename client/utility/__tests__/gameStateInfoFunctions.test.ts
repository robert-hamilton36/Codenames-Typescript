import { gameDataIndividualLocksinStartFirstHint, gameDataIndividualSpymasterLocksinStartFirstHint, gameDataIndividualVotePreStart, gameDataIndividualVoteStartFirstHint, gameDataIndividualVoteStartNoHint, gameDataIndividualVoteStartNoHintBlueTurn, gameDataPreStartOneBluePlayer, gameDataPreStartOneRedPlayer, gameDataRedTeamWon, gameDataTabletopStartNoHint } from '../../testing/mockdata/gameData'
import { blueSpymaster, redSpymaster } from '../../testing/mockdata/players'
import { gameWon, usersTeamsTurn, getNextTurnsTeam, gameStarted, gameIsTabletopMode, gameIsIndividualMode, voteSystemIsSpymasterLocksIn, voteSystemIsIndividualVote, voteSystemIsIndividualLocksIn, gamesCurrentTurnHasAHint, getCurrentTurnsSpymatersName, getTeamForNewPlayer } from '../gameStateInfoFunctions'

describe('tests gameWon function', () => {
  test('returns false when game still playing', () => {
    const hasGameWon = gameWon(gameDataIndividualVotePreStart)
    expect(hasGameWon).toBe(false)
  })

  test('returns true when game won', () => {
    const hasGameWon = gameWon(gameDataRedTeamWon)
    expect(hasGameWon).toBe(true)
  })
})

describe('tests usersTeamTurn function', () => {
  test('returns true when its the users turn', () => {
    const isUsersTeamsTurn = usersTeamsTurn(gameDataIndividualVoteStartNoHint, redSpymaster)
    expect(isUsersTeamsTurn).toBe(true)
  })

  test('returns false when its not the users turn', () => {
    const isUsersTeamsTurn = usersTeamsTurn(gameDataIndividualVoteStartNoHintBlueTurn, redSpymaster)
    expect(isUsersTeamsTurn).toBe(false)
  })
})

describe('tests getNextTurnsTeam function', () => {
  test('returns blue when currently red turn', () => {
    const nextTurnsTeam = getNextTurnsTeam(gameDataIndividualVoteStartNoHint)
    expect(nextTurnsTeam).toBe('blue')
  })

  test('returns red when currently blue turn', () => {
    const nextTurnsTeam = getNextTurnsTeam(gameDataIndividualVoteStartNoHintBlueTurn)
    expect(nextTurnsTeam).toBe('red')
  })
})

describe('tests gameStarted function', () => {
  test("returns false when game hasn't started", () => {
    const hasGameStarted = gameStarted(gameDataIndividualVotePreStart)
    expect(hasGameStarted).toBe(false)
  })

  test('returns true when game started', () => {
    const hasGameStarted = gameStarted(gameDataIndividualVoteStartNoHint)
    expect(hasGameStarted).toBe(true)
  })
})

describe('tests gameIsTabletopMode function', () => {
  test('returns true when game is tabletop mode', () => {
    const isGameInTabletopMode = gameIsTabletopMode(gameDataTabletopStartNoHint)
    expect(isGameInTabletopMode).toBe(true)
  })

  test('returns false when game is individual mode', () => {
    const isGameInTabletopMode = gameIsTabletopMode(gameDataIndividualVoteStartNoHint)
    expect(isGameInTabletopMode).toBe(false)
  })
})

describe('tests gameIsIndividualMode function', () => {
  test('returns true when game is individual mode', () => {
    const isGameInIndividualMode = gameIsIndividualMode(gameDataIndividualVoteStartNoHint)
    expect(isGameInIndividualMode).toBe(true)
  })

  test('returns false when game is tabletop mode', () => {
    const isGameInIndividualMode = gameIsIndividualMode(gameDataTabletopStartNoHint)
    expect(isGameInIndividualMode).toBe(false)
  })
})

describe('tests voteSystemIsSpymasterLocksIn function', () => {
  test('returns true when voteSystem is spymaster-locksin mode', () => {
    const isGameInSpymasterLocksInMode = voteSystemIsSpymasterLocksIn(gameDataIndividualSpymasterLocksinStartFirstHint)
    expect(isGameInSpymasterLocksInMode).toBe(true)
  })

  test('returns false when voteSystem is vote mode', () => {
    const isGameInSpymasterLocksInMode = voteSystemIsSpymasterLocksIn(gameDataIndividualLocksinStartFirstHint)
    expect(isGameInSpymasterLocksInMode).toBe(false)
  })
})

describe('tests voteSystemIsIndividualLocksIn function', () => {
  test('returns true when voteSystem is individual-locksin mode', () => {
    const isGameInIndividualLocksInMode = voteSystemIsIndividualLocksIn(gameDataIndividualLocksinStartFirstHint)
    expect(isGameInIndividualLocksInMode).toBe(true)
  })

  test('returns false when voteSystem is vote mode', () => {
    const isGameInIndividualLocksInMode = voteSystemIsIndividualLocksIn(gameDataIndividualSpymasterLocksinStartFirstHint)
    expect(isGameInIndividualLocksInMode).toBe(false)
  })
})

describe('tests voteSystemIsIndividualVote function', () => {
  test('returns true when voteSystem is vote mode', () => {
    const isGameInIndividualVoteMode = voteSystemIsIndividualVote(gameDataIndividualVoteStartFirstHint)
    expect(isGameInIndividualVoteMode).toBe(true)
  })

  test('returns false when voteSystem is spymaster-locksin mode', () => {
    const isGameInIndividualVoteMode = voteSystemIsIndividualVote(gameDataIndividualSpymasterLocksinStartFirstHint)
    expect(isGameInIndividualVoteMode).toBe(false)
  })
})

describe('tests gamesCurrentTurnHasAHint function', () => {
  test('returns true when there is a hint', () => {
    const gameHasHint = gamesCurrentTurnHasAHint(gameDataIndividualSpymasterLocksinStartFirstHint)
    expect(gameHasHint).toBe(true)
  })

  test("returns false when there isn't a hint field", () => {
    const gameHasHint = gamesCurrentTurnHasAHint(gameDataTabletopStartNoHint)
    expect(gameHasHint).toBe(false)
  })
})

describe('tests getCurrentTurnsSpymatersName function', () => {
  test('returns spymaster when there is a spymaster for current turn: blue', () => {
    const spymaster = getCurrentTurnsSpymatersName(gameDataIndividualVoteStartNoHintBlueTurn)
    expect(spymaster).toEqual(blueSpymaster)
  })

  test('returns spymaster when there is a spymaster for current turn: red', () => {
    const spymaster = getCurrentTurnsSpymatersName(gameDataIndividualVoteStartNoHint)
    expect(spymaster).toEqual(redSpymaster)
  })
})

describe('test getTeamForNewPlayer function', () => {
  test('returns undefined when gameplayMode is tabletop', () => {
    const newTeam = getTeamForNewPlayer(gameDataTabletopStartNoHint)
    expect(newTeam).toBeUndefined()
  })

  test('if only one player on blue function returns opposite team colour red', () => {
    const newTeam = getTeamForNewPlayer(gameDataPreStartOneBluePlayer)
    expect(newTeam).toBe('red')
  })

  test('if only one player on red function returns opposite team colour blue', () => {
    const newTeam = getTeamForNewPlayer(gameDataPreStartOneRedPlayer)
    expect(newTeam).toBe('blue')
  })

  test('if two spymasters are on either team function returns colour red', () => {
    const newTeam = getTeamForNewPlayer(gameDataIndividualVotePreStart)
    expect(newTeam).toBe('red')
  })
})
