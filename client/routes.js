import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {SummonerPage} from './components'

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={SummonerPage} />
    </Switch>
  )
}

export default Routes
