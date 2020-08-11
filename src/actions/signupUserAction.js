import axios from 'axios';
import types from './types';

export const signupUserAction = (username, password, phone, dob) => async dispatch => {
    try {
        axios({
            method: 'PUT',
            url: '/add_new_user',
            headers: {
                username: username,
                phone: phone,
                dob: dob,
                password: password
            }
        }).then(response => {
            let typeVal = types.ADD_NEW_USER_ERROR;
            if(response.data.status == 'OK') {
               typeVal = types.ADD_NEW_USER;
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
            type: types.ADD_NEW_USER_ERROR,
            action: 'Unable to add new user'
        })
    }
};
