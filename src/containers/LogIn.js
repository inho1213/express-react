import React from 'react';
import PropTypes from 'prop-types';

import { logInRequest } from '../actions/AccountAction'

class LogIn extends React.Component {
    logIn(e) {
        e.preventDefault();
        this.props.dispatch(logInRequest(e.target.username.value.trim(), e.target.password.value.trim()));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card col-md-8">
                            <form onSubmit={(e) => this.logIn(e)}>
                                <div className="card-block">
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <div className="input-group mb-3">
                                        <span className="input-group-addon"><i className="icon-user"></i></span>
                                        <input type="text" className="form-control" placeholder="Username" name="username" required/>
                                    </div>
                                    <div className="input-group mb-4">
                                        <span className="input-group-addon"><i className="icon-lock"></i></span>
                                        <input type="password" className="form-control" placeholder="Password" name="password" required/>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button type="submit" className="btn btn-primary px-4">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LogIn.propTypes = {
    account: PropTypes.object.isRequired
}

export default LogIn;