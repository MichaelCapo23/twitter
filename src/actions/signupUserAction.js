import axios from 'axios';
import types from './types';

export const signupUserAction = (username, password, phone, dob) => async dispacth => {
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
            let typeVal = types.ADD_NEW_USER_ERROR
            if(response.data.status == 'OK') {
               typeVal = types.ADD_NEW_USER;
            } 
            dispacth({
                type: typeVal,
                action: response.data.content
            })
        })
    } catch {
        dispacth({
            type: types.ADD_NEW_USER_ERROR,
            action: 'Unable to add new user'
        })
    }
};
