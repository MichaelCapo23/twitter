import types from '../actions/types';

const DEFAULT_STATE = {
    token : false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.ADD_NEW_USER: 
            return {...state, token: action};
        case types.ADD_NEW_USER_ERROR: 
            return {...state, token: false};
        default:
            return state;
    }
}