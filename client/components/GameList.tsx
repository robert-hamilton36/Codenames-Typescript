import React from 'react'

export const GameList: React.FC<Props> = ({ games, setGameToJoin }) => {
  const handleClick = (gameId) => {
    setGameToJoin(gameId)
  }
  return (
    <ul>
      {games.map((game, index) => (
        <li key={game + index} data-testid={'li' + index}>
          <p data-testid={'p' + index}>{game}</p>
          <button onClick={() => handleClick(game)} data-testid={'button' + index}>Join Game</button>
        </li>)
      )}
    </ul>
  )
}

interface Props {
  games: string[]
  setGameToJoin: React.Dispatch<React.SetStateAction<string>>
}
