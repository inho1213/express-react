import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import Routes from './Routes';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCookie } from 'redux-cookie';

import classnames from 'classnames';

class DefaultLayout extends React.Component {
    getLoggedInUser(account = {}) {
        let user = this.props.dispatch(getCookie('account'));

        if (user) {
            user = user.replace('s:j:', '');
            user = user.substring(0, user.lastIndexOf("."));
            return Object.assign({}, account, JSON.parse(user));
        }

        return account;
    }

    render() {
        const loggedInUser = this.getLoggedInUser(this.props.account);

        return (
            <div className="app">
                <Header loggedInUser={loggedInUser} {...this.props}/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <div className="container-fluid">
                            <Routes loggedInUser={loggedInUser} {...this.props}/>
                        </div>
                    </main>
                </div>
                <div className={classnames('modal-backdrop show row justify-content-center align-items-center', {'d-none': this.props.spinner})}><i className="fa fa-3x fa-spinner" style={{animation: 'loading-bar-spinner 1s linear infinite'}}></i></div>
            </div>
        );
    }
}

DefaultLayout.propTypes = {
    account: PropTypes.object,
    spinner: PropTypes.bool
}

export default withRouter(connect(state => {
    return {
        ...state
    };
})(DefaultLayout));