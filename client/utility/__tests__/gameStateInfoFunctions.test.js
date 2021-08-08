import { gameWon, usersTeamsTurn, getNextTurnsTeam, gameStarted, gameIsTabletopMode, gameIsIndividualMode, voteSystemIsSpymasterLocksIn, voteSystemIsIndividualVote, gamesCurrentTurnHasAHint, getCurrentTurnsSpymatersName, getTeamForNewPlayer } from '../gameStateInfoFunctions'

describe('tests gameWon function', () => {
  const gameInfo = {
    gameState: {
    }
  }
  test('returns false when game still playing', () => {
    const hasGameWon = gameWon(gameInfo)
    expect(hasGameWon).toBe(false)
  })

  test('returns true when game won', () => {
    gameInfo.gameState.win = true
    const hasGameWon = gameWon(gameInfo)
    expect(hasGameWon).toBe(true)
  })
})

describe('tests usersTeamTurn function', () => {
  const user = {
    host: true,
    name: 'Anakin',
    team: 'red',
    uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be',
    spymaster: 'true'
  }

  const gameInfo = {
    gameState: {
      teamTurn: ''
    }
  }

  test('returns true when its the users turn', () => {
    gameInfo.gameState.teamTurn = 'red'
    const isUsersTeamsTurn = usersTeamsTurn(gameInfo, user)
    expect(isUsersTeamsTurn).toBe(true)
  })

  test('returns false when its not the users turn', () => {
    gameInfo.gameState.teamTurn = 'blue'
    const isUsersTeamsTurn = usersTeamsTurn(gameInfo, user)
    expect(isUsersTeamsTurn).toBe(false)
  })
})

describe('tests getNextTurnsTeam function', () => {
  const gameInfo = {
    gameState: {
      teamTurn: 'red'
    }
  }
  test('returns blue when currently red turn', () => {
    const nextTurnsTeam = getNextTurnsTeam(gameInfo)
    expect(nextTurnsTeam).toBe('blue')
  })

  test('returns red when currently blue turn', () => {
    gameInfo.gameState.teamTurn = 'blue'
    const nextTurnsTeam = getNextTurnsTeam(gameInfo)
    expect(nextTurnsTeam).toBe('red')
  })
})

describe('tests gameStarted function', () => {
  const gameInfo = {
    gameState: {
      gameStart: false
    }

  }
  test("returns false when game hasn't started", () => {
    const hasGameStarted = gameStarted(gameInfo)
    expect(hasGameStarted).toBe(false)
  })

  test('returns true when game started', () => {
    gameInfo.gameState.gameStart = true
    const hasGameStarted = gameStarted(gameInfo)
    expect(hasGameStarted).toBe(true)
  })
})

describe('tests gameIsTabletopMode function', () => {
  const gameInfo = {
    settings: {
      gameplayMode: 'tabletop'
    }
  }

  test('returns true when game is tabletop mode', () => {
    const isGameInTabletopMode = gameIsTabletopMode(gameInfo)
    expect(isGameInTabletopMode).toBe(true)
  })

  test('returns false when game is individual mode', () => {
    gameInfo.settings.gameplayMode = 'individual'
    const isGameInTabletopMode = gameIsTabletopMode(gameInfo)
    expect(isGameInTabletopMode).toBe(false)
  })
})

describe('tests gameIsIndividualMode function', () => {
  const gameInfo = {
    settings: {
      gameplayMode: 'individual'
    }
  }

  test('returns true when game is individual mode', () => {
    const isGameInIndividualMode = gameIsIndividualMode(gameInfo)
    expect(isGameInIndividualMode).toBe(true)
  })

  test('returns false when game is tabletop mode', () => {
    gameInfo.settings.gameplayMode = 'tabletop'
    const isGameInIndividualMode = gameIsIndividualMode(gameInfo)
    expect(isGameInIndividualMode).toBe(false)
  })
})

describe('tests voteSystemIsSpymasterLocksIn function', () => {
  const gameInfo = {
    settings: {
      voteSystem: 'spymaster-locksin'
    }
  }

  test('returns true when voteSystem is spymaster-locksin mode', () => {
    const isGameInSpymasterLocksInMode = voteSystemIsSpymasterLocksIn(gameInfo)
    expect(isGameInSpymasterLocksInMode).toBe(true)
  })

  test('returns false when voteSystem is vote mode', () => {
    gameInfo.settings.voteSystem = 'vote'
    const isGameInSpymasterLocksInMode = voteSystemIsSpymasterLocksIn(gameInfo)
    expect(isGameInSpymasterLocksInMode).toBe(false)
  })
})

describe('tests voteSystemIsIndividualVote function', () => {
  const gameInfo = {
    settings: {
      voteSystem: 'vote'
    }
  }

  test('returns true when voteSystem is vote mode', () => {
    const isGameInIndividualVoteMode = voteSystemIsIndividualVote(gameInfo)
    expect(isGameInIndividualVoteMode).toBe(true)
  })

  test('returns false when voteSystem is spymaster-locksin mode', () => {
    gameInfo.settings.voteSystem = 'spymaster-locksin'
    const isGameInIndividualVoteMode = voteSystemIsIndividualVote(gameInfo)
    expect(isGameInIndividualVoteMode).toBe(false)
  })
})

describe('tests gamesCurrentTurnHasAHint function', () => {
  const gameInfo = {
    gameState: {
      hint: {
        hint: 'lightsaber',
        numberOfWords: 2
      }
    }
  }

  test('returns true when there is a hint', () => {
    const gameHasHint = gamesCurrentTurnHasAHint(gameInfo)
    expect(gameHasHint).toBe(true)
  })

  test("returns false when there isn't a hint field", () => {
    delete gameInfo.gameState.hint
    const gameHasHint = gamesCurrentTurnHasAHint(gameInfo)
    expect(gameHasHint).toBe(false)
  })
})

describe('tests getCurrentTurnsSpymatersName function', () => {
  const blueSpymaster = {
    name: 'Obi Wan',
    team: 'blue',
    uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
    spymaster: 'true'
  }

  const redSpymaster = {
    name: 'Anakin',
    team: 'red',
    uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be',
    spymaster: 'true'
  }

  const gameInfo = {
    gameState: {
      teamTurn: 'blue'
    },
    players: [
      blueSpymaster,
      redSpymaster
    ]
  }

  test('returns spymaster when there is a spymaster for current turn: blue', () => {
    const spymaster = getCurrentTurnsSpymatersName(gameInfo)
    expect(spymaster).toEqual(blueSpymaster)
  })

  test('returns spymaster when there is a spymaster for current turn: red', () => {
    gameInfo.gameState.teamTurn = 'red'
    const spymaster = getCurrentTurnsSpymatersName(gameInfo)
    expect(spymaster).toEqual(redSpymaster)
  })

  test('returns undefined when there is not a a spymaster for current turn', () => {
    gameInfo.players = []
    const spymaster = getCurrentTurnsSpymatersName(gameInfo)
    expect(spymaster).toBeUndefined()
  })
})

describe('test getTeamForNewPlayer function', () => {
  const blueSpymaster = {
    name: 'Obi Wan',
    team: 'blue',
    uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
    spymaster: 'true'
  }

  const redSpymaster = {
    name: 'Anakin',
    team: 'red',
    uid: 'ddb1e1fc-debc-4a66-9666-be1042af90be',
    spymaster: 'true'
  }

  const gameInfo = {
    gameState: {
      teamTurn: 'blue'
    },
    players: [blueSpymaster],
    settings: {
      gameplayMode: 'tabletop'
    }
  }

  test('returns undefined when gameplayMode is tabletop', () => {
    const newTeam = getTeamForNewPlayer(gameInfo)
    expect(newTeam).toBeUndefined()
  })

  test('if only one player on blue function returns opposite team colour red', () => {
    gameInfo.settings.gameplayMode = 'individual'
    const newTeam = getTeamForNewPlayer(gameInfo)
    expect(newTeam).toBe('red')
  })

  test('if only one player on red function returns opposite team colour blue', () => {
    gameInfo.players = [redSpymaster]
    const newTeam = getTeamForNewPlayer(gameInfo)
    expect(newTeam).toBe('blue')
  })

  test('if two spymasters are on either team function returns colour red', () => {
    gameInfo.players.push(blueSpymaster)
    const newTeam = getTeamForNewPlayer(gameInfo)
    expect(newTeam).toBe('red')
  })
})
