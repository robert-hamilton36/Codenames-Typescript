import React from 'react'

export const GameList: React.FC<Props> = ({ games, setGameToJoin }) => {
  const handleClick = (gameId) => {
    setGameToJoin(gameId)
  }
  return (
    <ul>
      {games.map((game, id) => <li key={game + id}>{game}<button onClick={() => handleClick(game)}>Join Game</button></li>)}
    </ul>
  )
}

interface Props {
  games: string[]
  setGameToJoin: React.Dispatch<React.SetStateAction<string>>
}
