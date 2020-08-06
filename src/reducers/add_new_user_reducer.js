import types from '../actions/types';

const DEFAULT_STATE = {
    user_id: -1
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.ADD_NEW_USER: 
            return {...state, user_id: action.user_id};
        case types.ADD_NEW_USER_ERROR: 
            return {...state, user_id: '-1'};
        default:
            return state;
    }
}