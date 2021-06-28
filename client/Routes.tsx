import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Test } from './components/Game/Test'
import { Lobby } from './pages/Lobby'
import { MenuPage } from './pages/MenuPage'
import { CreateGame } from './pages/CreateGame'
import { Game } from './pages/Game'

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MenuPage}/>
        <Route path="/game" component={Game}/>
        <Route path="/lobby" component={Lobby}/>
        <Route path="/host" component={CreateGame}/>
        <Route path="/test" component={Game}/>
      </Switch>
    </Router>
  )
}
