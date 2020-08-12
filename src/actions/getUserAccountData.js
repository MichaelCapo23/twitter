import axios from 'axios';
import types from './types';

export const getUserAccountData = (token) => async dispatch => {
    try {
        axios({
            method: 'GET',
            url: '/getUserAccountData',
            headers: {
                token: token,
            }
        }).then(response => {
            let typeVal = types.GET_USER_ACCOUNT_DATA_ERROR;
            if(response.data.status == 'OK') {
               typeVal = types.GET_USER_ACCOUNT_DATA;
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
            type: types.GET_USER_ACCOUNT_DATA_ERROR,
            action: 'Unable to login user'
        })
    }
}