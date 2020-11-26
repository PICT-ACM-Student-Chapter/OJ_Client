import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contests from './pages/Contests.page';

export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/contests" component={Contests} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
            </Switch>
        )
    }
}

export default Routes
