import axios from 'axios';
import types from './types';

export const signupUserAction = (values) => async dispatch => {
    try {
        axios({
            method: "POST",
            url: "/signupUser",
            headers: {

            }
        }).then(response => {
            dispatch({
                type: types.SIGNUP_USER,
                action: response.data
            })
        })
    } catch {
        dispatch({
            type: types.SIGNUP_USER_ERROR,
            action: 'Unable to signup user'
        })
    }
}