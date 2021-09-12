import { VoteObject } from '../../types/gameState'
import { blueOperative, blueSpymaster, redOperative, redSpymaster } from './players'

export const voteObjParkRedSpymaster: VoteObject = {
  skip: false,
  locked: false,
  player: redSpymaster,
  wordObj: {
    key: 'red',
    revealed: false,
    word: 'Park',
    index: 0
  }
}

export const voteObjParkLockedRedSpymaster: VoteObject = {
  skip: false,
  locked: true,
  player: redSpymaster,
  wordObj: {
    key: 'red',
    revealed: false,
    word: 'Park',
    index: 0
  }
}

export const voteObjMassBlueSpymaster: VoteObject = {
  skip: false,
  locked: false,
  player: blueSpymaster,
  wordObj: {
    key: 'blue',
    revealed: false,
    word: 'Mass',
    index: 1
  }
}

export const voteObjMassLockedBlueSpymaster: VoteObject = {
  skip: false,
  locked: true,
  player: blueSpymaster,
  wordObj: {
    key: 'blue',
    revealed: false,
    word: 'Mass',
    index: 1
  }
}

export const voteObjSkipRedSpymaster: VoteObject = {
  skip: true,
  locked: false,
  player: redSpymaster,
  wordObj: null
}

export const voteObjSkipLockedRedSpymaster: VoteObject = {
  skip: true,
  locked: true,
  player: redSpymaster,
  wordObj: null
}

export const voteObjSkipBlueSpymaster: VoteObject = {
  skip: true,
  locked: false,
  player: blueSpymaster,
  wordObj: null
}

export const voteObjSkipLockedBlueSpymaster: VoteObject = {
  skip: true,
  locked: true,
  player: blueSpymaster,
  wordObj: null
}

export const voteObjForceLockedBlueSpymaster: VoteObject = {
  skip: false,
  locked: true,
  player: blueSpymaster,
  wordObj: {
    index: 1,
    key: 'red',
    revealed: false,
    word: 'Force'
  }
}

export const voteObjLightsaberBlueOperative: VoteObject = {
  skip: false,
  locked: false,
  player: blueOperative,
  wordObj: {
    index: 0,
    key: 'assassin',
    revealed: true,
    word: 'Lightsaber'
  }
}

export const voteObjSkipRedOperative: VoteObject = {
  skip: true,
  locked: false,
  player: redOperative
}
