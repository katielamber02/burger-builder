import axios from 'axios';
import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
 } from '../action-types'

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type:AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type:AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};
export const auth = (email, password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAdDIK8mlo9OoI0lZbuc0ENeq81GrFn5vg';
        if (!isSignup) {
           url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAdDIK8mlo9OoI0lZbuc0ENeq81GrFn5vg';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // localStorage.setItem('token', response.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error=>{
                dispatch(authFail(error.response.data.error))
            })
           
    };
}