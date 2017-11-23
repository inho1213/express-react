import { SHOW_SPINNER, HIDE_SPINNER } from '../constants/ActionTypes';

export function spinner(state = true, action) {
    switch (action.type) {
        case SHOW_SPINNER:
            return false;
        case HIDE_SPINNER:
            return true;
        default:
            return state;
    }
}