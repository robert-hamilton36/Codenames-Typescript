import { GameInfo } from '../../types/gameState'
import { wordListNoReveals, wordListRedTeamWin } from './wordObjects'

export const gameDataIndividualVotePreStart: GameInfo = {
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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

export const gameDataIndividualSpymasterLocksinStartFirstHint: GameInfo = {
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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
  players: [
    {
      host: true,
      name: 'R2-D2',
      team: 'red',
      uid: 'dd3b8c97-102c-4e88-962b-4ba5ffb032aa'
    },
    {
      name: 'Obi Wan',
      team: 'blue',
      uid: '68e683be-27a1-4f06-868d-f0818cde8df5',
      spymaster: true
    },
    {
      name: 'Anakin',
      team: 'red',
      uid: '7ace9e1c-fda8-4088-b7a5-9cd9878ca1ab',
      spymaster: true
    },
    {
      name: 'Yoda',
      team: 'blue',
      uid: 'bd7ee7f0-67cc-44f2-a2b4-6545f593c722'
    }

  ],
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
