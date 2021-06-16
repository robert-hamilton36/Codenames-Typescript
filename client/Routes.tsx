import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Test } from './components/Game/Test'
import { Lobby } from './components/Lobby'
import { MenuPage } from './components/MenuPage'

export const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MenuPage}/>
        {/* <Route path="/game" component={Game}/> */}
        <Route path="/lobby" component={Lobby}/>
        <Route path="/test" component={Test}/>
      </Switch>
    </Router>
  )
}
