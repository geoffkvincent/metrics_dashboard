import React, { Fragment } from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { Container } from 'semantic-ui-react'

const App = () => (
  <Fragment>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </Container>
  </Fragment>
)

export default App;
