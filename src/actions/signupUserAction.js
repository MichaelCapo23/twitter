import axios from 'axios';
import types from './types';

export const signupUserAction = (values) => async dispacth => {
    debugger
    try {
        axios({
            method: 'PUT',
            url: '/add_new_user',
            data: {
                username: values.username,
                phone: values.phone,
                dob: values.dob,
                password: values.password
            }
        }).then(response => {
            dispacth({
                type: types.ADD_NEW_USER,
                action: response.data
            })
        })
    } catch {
        dispacth({
            type: types.ADD_NEW_USER_ERROR,
            action: 'Unable to add new user'
        })
    }
};