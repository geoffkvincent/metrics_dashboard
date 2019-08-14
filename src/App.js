import React, {Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();


const App = () => (
    <Fragment>
        <Navbar/>
        <Switch>
            <Route exact path={'/testhouse'} component={Dashboard}/>
        </Switch>
    </Fragment>
);

export default App;
