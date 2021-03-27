import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {SummonerPage, SummonerInfoBox} from './components'

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={SummonerPage} />
      <Route path="/player" component={SummonerInfoBox} />
    </Switch>
  )
}

export default Routes
