import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';

import DefaultLayout from './containers/DefaultLayout';
import reducers from './reducers';

let store;

if (process.env.NODE_ENV !== 'production') {
    store = createStore(reducers, applyMiddleware(createCookieMiddleware(Cookies), thunk, logger));
} else {
    store = createStore(reducers, applyMiddleware(createCookieMiddleware(Cookies), thunk));
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <DefaultLayout/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);