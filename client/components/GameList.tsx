import React from 'react'

export const GameList: React.FC<Props> = ({ games, setGameToJoin, nextPage }) => {
  const handleClick = (gameId) => {
    setGameToJoin(gameId)
    nextPage()
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
  nextPage: () => void
}
