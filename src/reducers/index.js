import {combineReducers} from 'redux';
import add_new_user_reducer from './add_new_user_reducer';

const rootReducer = combineReducers({
    add_new_user_reducer,
});

export default rootReducer;