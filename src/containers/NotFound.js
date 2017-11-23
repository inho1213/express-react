import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card-group mb-0">
                                    <div className="card p-4">
                                        <div className="clearfix">
                                            <h1 className="float-left display-3 mr-4">404</h1>
                                            <h4 className="pt-3">Oops! You're lost.</h4>
                                            <p className="text-muted">The page you are looking for was not found.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;