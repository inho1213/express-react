import { LOG_IN, LOG_OUT } from '../constants/ActionTypes'

export function account(state = {}, action) {
    switch (action.type) {
        case LOG_IN:
        case LOG_OUT:
            return action.account;
        default:
            return state;
    }
}