import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { CreateGame } from './pages/CreateGame'
import { Game } from './pages/Game'
import { JoinTestGame } from './pages/JoinTestGame'
import { Lobby } from './pages/Lobby'
import { MenuPage } from './pages/MenuPage'
import { Toaster } from './components/Toaster'

export const Routes: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MenuPage}/>
          <Route path="/game" component={Game}/>
          <Route path="/lobby" component={Lobby}/>
          <Route path="/host" component={CreateGame}/>
          <Route path="/test" component={JoinTestGame}/>
        </Switch>
      </Router>
      <Toaster />
    </>
  )
}
