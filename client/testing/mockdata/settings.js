export const initialState = {
  voteSystem: 'vote',
  gameplayMode: 'individual',
  error: ''
}

export const spymasterLocksInStateFromInitial = {
  voteSystem: 'spymaster-locksin',
  gameplayMode: 'individual',
  error: ''
}

export const tabletopStateFromInitial = {
  voteSystem: 'spymaster-locksin',
  gameplayMode: 'tabletop',
  error: ''
}

export const forbiddenState = {
  voteSystem: 'vote',
  gameplayMode: 'tabletop',
  error: ''
}

export const attemptingToChangeVoteSystemWhenTableTop = {
  voteSystem: 'spymaster-locksin',
  gameplayMode: 'tabletop',
  error: 'Vote system must be controlled by spymaster in tabletop mode'
}
