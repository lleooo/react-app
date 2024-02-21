import {tokenAction} from "./token.type";
import {getCookie} from "../../utils/cookie/cookie.util";

export const loginStart = () => {
    return {type: tokenAction.FETCH_TOKEN_START};
};

export const loginSuccess = (data) => {
    const payload = {
        'login': true,
        'username': data.username,
        'email': data.email,
        'favorite': data.favorite,
        'access_token': getCookie('csrf_access_token'),
        'refresh_token': getCookie('csrf_refresh_token')
    };
    return {type: tokenAction.FETCH_TOKEN_SUCCESS, payload: payload};
};

export const loginFail = () => {
    const payload = {
        'login': false,
        'username': '',
        'email': '',
        'favorite': [],
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.FETCH_TOKEN_FAILED, payload: payload};
};

export const logoutSuccess = () => {
    const payload = {
        'login': false,
        'username': '',
        'email': '',
        'favorite': [],
        'access_token': null,
        'refresh_token': null
    };
    return {type: tokenAction.LOGOUTSUCCESS, payload: payload};
};

export const logoutFail = () => {
    return {type: tokenAction.LOGOUTFAILED};
};

export const loginAsync = (data) => async (dispatch) => {
    const {signInEmail, signInPassword} = data;

    dispatch(loginStart());

    const login = await fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({
            'email': signInEmail,
            "password": signInPassword
        }),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    });

    const res = await login.json();

    switch (res['msg']) {
        case "successful":
            dispatch(loginSuccess(res['data']));
            return true;
        case "Wrong email or password":
            dispatch(loginFail());
            return false;
        default:
            return false;
    }
};

export const logoutAsync = () => async (dispatch) => {
    const respone = await fetch('/api/logout', {method: "POST"});
    if (respone.status === 200) {
        dispatch(logoutSuccess());
    } else {
        dispatch(logoutFail());
    }
};

export const refreshTokenAsync = (currentUser) => async (dispatch) => {
    const respone = await fetch('/api/refresh', {
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
        },
    });

    if (respone.status === 200) {
        dispatch(loginSuccess(currentUser));
    } else if (respone.status === 401) {
        dispatch(loginFail());
    }
    return 'fail';
};