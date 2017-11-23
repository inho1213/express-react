import React from 'react';

import { showSpinner, hideSpinner } from '../actions/SpinnerAction';

import qs from 'query-string';
import { serializeForm } from '../helper'

class CrudComponent extends React.Component {
    componentDidMount() {
        this.reload();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.reload();
        }
    }

    reload(params = {}, isPushHistory = false) {
        const { dispatch, history, match } = this.props;
        const { pathname, search } = this.props.location;

        params = Object.assign(qs.parse(search), params);

        if (isPushHistory) {
            history.push(`${pathname}?${qs.stringify(params)}`);
        } else {
            const readRequest = this.getReadRequest(Object.assign(params, match.params));

            if (readRequest) {
                dispatch(showSpinner());
                Promise.resolve(dispatch(readRequest)).then(result => dispatch(hideSpinner()));
            }

            const clearFormAction = this.getClearFormAction();

            if (clearFormAction) {
                dispatch(clearFormAction);
            }

            Object.keys(params)
                .filter(param => param !== 'page' && param !== 'size')
                .forEach(param => {
                    const formChangedAction = this.getFormChangedAction(param, params[param] || '');

                    if (formChangedAction) {
                        dispatch(formChangedAction);
                    }
                });
        }
    }

    /**
     * @param e event whose target is form element.
     */
    search(e) {
        e.preventDefault();
        this.reload(Object.assign({ page: 1 }, serializeForm(e.target)), true);
    }

    /**
     * @param e event whose target is form element.
     * @param redirectTo redirection url.
     * @param param parameter
     */
    add(e, redirectTo, param) {
        e.preventDefault();

        const createRequest = this.getCreateRequest(serializeForm(e.target));

        if (createRequest) {
            const { dispatch } = this.props;

            dispatch(createRequest)
                .then(this.redirect(redirectTo, param));
        }
    }

    redirect(to, param = {}) {
        const { history } = this.props;
        const { search } = this.props.location;

        return result => {
            const { message } = result;

            if (message) {
                alert(message);
            } else {
                history.push(`${to}?${qs.stringify(Object.assign(qs.parse(search), param))}`);
            }
        }
    }

    /**
     * 
     * @param id item id.
     * @param e event whose target is form element.
     * @param redirectTo redirection url.
     * @param param parameter
     */
    edit(id, e, redirectTo, param) {
        e.preventDefault();

        const updateRequest = this.getUpdateRequest(id, serializeForm(e.target));

        if (updateRequest) {
            const { dispatch } = this.props;

            dispatch(updateRequest)
                .then(this.redirect(redirectTo, param));
        }
    }

    /**
     * @param id item id.
     * @param redirectTo redirection url.
     * @param param parameter
     */
    remove(id, redirectTo, param) {
        if (confirm('Are you sure?')) {
            const deleteRequest = this.getDeleteRequest(id);

            if (deleteRequest) {
                const { dispatch } = this.props;

                dispatch(deleteRequest)
                    .then(this.redirect(redirectTo, param));
            }
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        const formChangedAction = this.getFormChangedAction(name, value);
        
        if (formChangedAction) {
            this.props.dispatch(formChangedAction);
        }
    }

    getCreateRequest(params) {
        // override me
    }

    getReadRequest(params) {
        // override me
    }

    getUpdateRequest(id, params) {
        // override me
    }

    getDeleteRequest(id) {
        // override me
    }
    
    getFormChangedAction(name, value) {
        // override me
    }

    getClearFormAction() {
        // override me
    }
}

export default CrudComponent;