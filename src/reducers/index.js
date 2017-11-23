import { combineReducers } from 'redux';

import { account } from './AccountReducer';
import { spinner } from './SpinnerReducer';

export default combineReducers({
    account,
    spinner
});