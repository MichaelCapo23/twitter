import axios from 'axios';
import types from './types';

export const loginUserAction = (username, password) => async dispatch => {
    try {
        axios({
            method: 'GET',
            url: '/loginUser',
            headers: {
                username: username,
                password: password
            }
        }).then(response => {
            let typeVal = types.LOGIN_USER_ERROR;
            if(response.data.status == 'OK') {
               typeVal = types.LOGIN_USER;
            }  else if(response.data.status == 'EXPIRED') {
                //will never get here as login/signup don't use auth
                typeVal = types.EXPIRED_TOKEN;
            }
            dispatch({
                type: typeVal,
                action: response.data.content
            })
        })
    } catch {
        dispatch({
            type: types.LOGIN_USER_ERROR,
            action: 'Unable to login user'
        })
    }
} 

