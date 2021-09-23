import React from 'react'

import { LogEntry, TeamGuessLogEntry, UserGuessLogEntry, UserHintLogEntry } from '../types/gameLog'

const makeUserHintEntryJSX = (log: UserHintLogEntry): JSX.Element => {
  return (
    <li key={log.entryNum} className={'logEntry faint' + log.user.team} data-testid='li'>
      {log.user.name}
      {' gives hint '}
      <span className='hintLogEntry'>
        {log.hint.hint + ' ' + log.hint.numberOfWords}
      </span>
    </li>
  )
}

const makeUserGuessEntryJSX = (log: UserGuessLogEntry): JSX.Element => {
  let className
  let word
  if (log.action === 'guess') {
    className = 'word' + log.word.key
    word = log.word.word
  } else if (log.action === 'skip') {
    className = 'skip'
    word = 'skip'
  }

  return (
    <li key={log.entryNum} className={'logEntry faint' + log.user.team} data-testid='li'>
      {log.user.name}
      {' taps '}
      <span className={className}>
        {word}
      </span>
    </li>
  )
}

const makeTeamGuessEntryJSX = (log: TeamGuessLogEntry): JSX.Element => {
  let className
  let word
  if (log.action === 'guess') {
    className = 'word' + log.word.key
    word = log.word.word
  } else if (log.action === 'skip') {
    className = 'skip'
    word = 'skip'
  }
  return (
    <li key={log.entryNum} className={'logEntry faint' + log.team} data-testid='li'>
      {log.team}
      {' team taps '}
      <span className={className}>
        {word}
      </span>
    </li>
  )
}

export const makeGameLogJSX = (log: LogEntry): JSX.Element => {
  let returnedHtml

  if (log.type === 'user') {
    if (log.action === 'hint') {
      returnedHtml = makeUserHintEntryJSX(log)
    } else if (log.action === 'guess') {
      returnedHtml = makeUserGuessEntryJSX(log)
    }
  }

  if (log.type === 'team') {
    returnedHtml = makeTeamGuessEntryJSX(log)
  }

  return returnedHtml
}

export const functionTesting = {
  makeUserHintEntryJSX,
  makeUserGuessEntryJSX,
  makeTeamGuessEntryJSX
}
