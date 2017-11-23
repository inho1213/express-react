import {LOG_IN, LOG_OUT} from "../constants/ActionTypes";
import fetch from "isomorphic-fetch";

export function logInRequest(username, password) {
    return dispatch => {
        return fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // because of cookie
            body: JSON.stringify({username, password})
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    return dispatch(logIn(json.data))
                });
            }
        });
    };
}

export function logOutRequest() {
    return dispatch => {
        return fetch('/api/account/logout', {
            credentials: 'include' // because of cookie
        }).then(response => dispatch(logOut()));
    };
}

export function logIn(account) {
    return {
        type: LOG_IN,
        account: account
    };
}

export function logOut() {
    return {
        type: LOG_OUT,
        account: {}
    };
}