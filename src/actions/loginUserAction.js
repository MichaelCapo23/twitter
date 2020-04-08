import axios from 'axios';
import types from './types';

export const loginUserAction = (values) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: '/loginUser',
            headers: {

            }
        }).then(response => {
            dispatch({
                type: types.LOGIN_USER,
                action: response.data
            })
        })
    } catch {
        dispatch({
            type: types.LOGIN_USER_ERROR,
            action: 'Unable to login user'
        })
    }
} 