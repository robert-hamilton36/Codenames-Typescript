import { GameInfo } from '../../types/gameInfo'
import { blueOperative, blueSpymaster, redHostOperative, redSpymaster } from './players'
import { wordListNoReveals, wordListRedTeamWin } from './wordObjects'

export const gameDataIndividualVotePreStart: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: false,
    guesses: 0,
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'vote'
  }
}

export const gameDataIndividualVoteStartNoHint: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: true,
    guesses: 0,
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'vote'
  }
}

export const gameDataIndividualVoteStartFirstHint: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: true,
    guesses: 0,
    guessesLeft: 5,
    hint: {
      hint: 'Extinct',
      numberOfWords: 4
    },
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'vote'
  }
}

export const gameDataIndividualLocksinStartFirstHint: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: true,
    guesses: 0,
    guessesLeft: 5,
    hint: {
      hint: 'Extinct',
      numberOfWords: 4
    },
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'individual-locksin'
  }
}

export const gameDataIndividualSpymasterLocksinStartFirstHint: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: false,
    guesses: 0,
    hint: {
      hint: 'Extinct',
      numberOfWords: 4
    },
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'spymaster-locksin'
  }
}

export const gameDataTabletopStartNoHint: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: true,
    guesses: 0,
    teamPoints: {
      red: 0,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    words: wordListNoReveals
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'tabletop',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'vote'
  }
}

export const gameDataRedTeamWon: GameInfo = {
  gameLog: [],
  gameState: {
    gameStart: false,
    guesses: 0,
    teamPoints: {
      red: 9,
      blue: 0
    },
    teamTurn: 'red',
    votes: [],
    win: 'red',
    words: wordListRedTeamWin
  },
  host: {
    name: 'R2-D2',
    uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
  },
  messages: {
    blue: [],
    general: [],
    red: []
  },
  players: [redHostOperative, blueSpymaster, redSpymaster, blueOperative],
  settings: {
    gameplayMode: 'individual',
    scoresForWin: {
      blue: 8,
      red: 9
    },
    teams: [
      'red',
      'blue'
    ],
    voteSystem: 'vote'
  }
}
