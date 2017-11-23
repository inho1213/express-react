import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import LogIn from './LogIn';
import NotFound from './NotFound';

class Routes extends React.Component {
    renderIfLoggedIn(component, userId, match) {
        return this.renderOrRedirect(component, !userId, match, '/login')
    }

    renderIfNotLoggedIn(component, userId, match) {
        return this.renderOrRedirect(component, !!userId, match, '/');
    }

    renderOrRedirect(component, isRedirect, match, url) {
        if (isRedirect) {
            return <Redirect to={url} push/>;
        }

        return React.createElement(component, {...this.props, match});
    }

    render() {
        const { userId } = this.props.loggedInUser;

        return (
            <Switch>
                <Route exact path="/" name="Home" render={({match}) => this.renderIfLoggedIn(Home, userId, match)}/>
                <Route exact path="/login" name="LogIn" render={({match}) => this.renderIfNotLoggedIn(LogIn, userId, match)}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

Routes.propTypes = {
    loggedInUser: PropTypes.object.isRequired
};

export default Routes;