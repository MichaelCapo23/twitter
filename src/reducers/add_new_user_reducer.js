import types from '../actions/types';

const DEFAULT_STATE = {
    token: false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.ADD_NEW_USER: 
            return {...state, token: action.token, mention: action.mention, username: action.username, bio: action.bio, phone: action.phone};
            break;
        case types.ADD_NEW_USER_ERROR: 
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
