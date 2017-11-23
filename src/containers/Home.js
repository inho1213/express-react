import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron } from 'reactstrap';

class Home extends React.Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <Jumbotron className="col-md-8">
                            <h1 className="display-3">Hello, {this.props.loggedInUser.userName}!</h1>
                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    loggedInUser: PropTypes.object.isRequired
};

export default Home;