import types from '../actions/types';

const DEFAULT_STATE = {
    token: false 
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOGIN_USER:
            return {...state, token: action};
            break;
        case types.LOGIN_USER_ERROR:
            return {...state, token: false};
            break;
        case types.EXPIRED_TOKEN:
            localStorage.removeItem('token');
            return {...state, token: false};
            break;
        default:
            return state;
    }
}