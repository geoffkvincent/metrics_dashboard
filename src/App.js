import React, { Fragment } from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

const App = () => (
  <Fragment>
    <Navbar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
  </Fragment>
)

export default App;
