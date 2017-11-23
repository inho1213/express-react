import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom'

import { logOutRequest } from '../actions/AccountAction'

import './Header.css';

class Header extends React.Component {
    toggleMobileSidebar(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    toggleSidebar(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    logOut(e) {
        e.preventDefault();
        this.props.dispatch(logOutRequest());
    }
    
    render() {
        return (
            <header className="app-header navbar">
                <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.toggleMobileSidebar} type="button">&#9776;</button>
                <NavLink to="/" className="navbar-brand no-bg">TEST</NavLink>
                <ul className="nav navbar-nav d-md-down-none">
                    <li className="nav-item">
                        <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.toggleSidebar} href="#">&#9776;</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    {this.props.loggedInUser.userId &&
                        <li className="nav-item">
                            <a className="nav-link btn" href="#" onClick={(e) => this.logOut(e)}>
                                <i className="icon-logout icons font-2xl"></i>
                            </a>
                        </li>
                    }
                </ul>
            </header>
        )
    }
}

Header.propTypes = {
    loggedInUser: PropTypes.object.isRequired
}

export default Header;